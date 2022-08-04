<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="DunitTree">
      <q-card class="q-dialog-plugin">
        <q-toolbar class="bg-primary text-white">
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            :title="this.$t('buttons.close')"
          />
          <q-toolbar-title>
            <span class="text-subtitle1 text-weight-bold">
              {{ $t("units.showunittree") }}</span
            >
          </q-toolbar-title>
          <q-btn
            flat
            color="secondary"
            text-color="white"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="Editusertounit()"
          />
        </q-toolbar>
        <q-separator color="accent" />
        <q-card-section
          style="min-height: 10vh; max-height: 80vh"
          class="scroll"
        >
          <q-tree
            ref="myunittree"
            node-key="id"
            label-key="title"
            selected-color="warning"
            :nodes="Unitdata"
            :selected="unitticked"
            default-expand-all
          />
        </q-card-section>
        <q-separator color="accent" />
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="80px" color="secondary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t("auth.users.profile.pheader") }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="savebtn"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="$t('buttons.save')"
        @click="saveItems()"
      />
      <q-btn
        color="warning"
        text-color="white"
        class="q-ma-xs"
        icon="cloud_download"
        :label="$t('buttons.export')"
        @click="ExportDataAsCVS()"
      />
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
      <q-btn
        v-if="mPermissions['profile.bsetunit']"
        color="deldbtn"
        text-color="white"
        class="q-ma-xs"
        icon="apartment"
        :label="$t('buttons.setuit')"
        @click="Showunittree()"
      />
      <q-btn
        v-print="printObj"
        color="treebtn"
        text-color="white"
        class="q-ma-xs"
        icon="print"
        :label="$t('buttons.print')"
        @click="printItems()"
      />
      <q-space v-if="$q.screen.gt.xs" />
      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 120px"
        class="q-ml-md"
        :label="$t('modules.searchall')"
        @input="onQuickFilterChanged()"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
    </div>
    <div id="printMe" class="shadow-1">
      <ag-grid-vue
        id="myGrid"
        style="width: 100%; height: 500px"
        class="ag-theme-balham Profile-agGrid"
        row-selection="multiple"
        row-multi-select-with-click="true"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        :pagination="true"
        :pagination-page-size="50"
        :get-row-style="getRowStyle"
        :framework-components="frameworkComponents"
        :locale-text="this.$t('aggrid')"
        @cellValueChanged="oncellValueChanged"
        @grid-ready="onGridReady"
      >
      </ag-grid-vue>
    </div>
  </q-page>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import agDateCellRender from "../frameworkComponents/agDateCellRender";
import { useZeroStore } from "stores/zero";

export default {
  name: "Profile",
  components: {
    AgGridVue,
  },
  data() {
    return {
      DunitTree: false,
      Unitdata: [],
      unitticked: null,
      loading: false,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
      unitMap: {},
      mPermissions: [],
      printObj: {
        id: "printMe",
        popTitle: "这里是标题区域，添加页眉和页脚才能看见！",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
    };
  },
  setup() {
    const store = useZeroStore();
    return {
      store,
    };
  },

  computed: {},
  created() {
    // 得到机构数据
    this.$api.get("/z_unit/").then((res) => {
      if (res.data.success) {
        this.columnDefs[9].cellEditorParams.values = res.data.data.map(
          ({ title, id }) => id.toString()
        );
        this.unitMap = res.data.data.reduce((acc, v) => {
          acc[v.id] = v.title;
          return acc;
        }, {});
        this.getunitdata();
        // console.log(this.unitMap, '------------')
        // this.UserNames = JSON.stringify(tmpa).replace(/"/g, "'")
      }
    });
  },
  beforeMount() {
    this.initGrid();
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    this.initPermissions();
  },
  methods: {
    initPermissions() {
      const preq = [
        {
          module: "profile",
          name: "profile.bsetunit",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("auth.users.profile.bsetunit"),
        },
        {
          module: "profile",
          name: "profile.iManageUnit",
          syscfg: {
            required: false,
            type: "number",
            default: null,
          },
          title: this.$t("auth.users.profile.bsetunitroot"),
        },
      ];

      this.store
        .reqThePermission(preq)
        .then((res) => {
          this.mPermissions = res;
        })
        .catch((e) => {
          // console.log(e)
        });
    },
    initGrid() {
      this.gridOptions = {
        rowHeight: 32,
        headerHeight: 32,
        allowShowChangeAfterFilter: true,
      };
      this.frameworkComponents = {
        agDateCellRender: agDateCellRender,
      };
      this.columnDefs = [
        {
          headerName: "ID",
          field: "id",
          width: 70,
          minWidth: 70,
          maxWidth: 70,
          sortable: true,
          editable: false,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true,
        },
        {
          headerName: this.$t("auth.users.profile.avatar"),
          field: "avatar",
          width: 130,
          minWidth: 130,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.no"),
          field: "no",
          width: 130,
          minWidth: 130,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.nickname"),
          field: "name",
          width: 130,
          minWidth: 130,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.sex"),
          field: "sex",
          width: 80,
          minWidth: 80,
          maxWidth: 80,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: Object.keys(this.$t("auth.users.profile.sexoptions")),
          },
          valueFormatter: this.getSelector,
        },
        {
          headerName: this.$t("auth.users.profile.birthday"),
          field: "birth",
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          editable: true,
          sortable: true,
          cellRendererFramework: agDateCellRender,
          filter: "agDateColumnFilter",
          filterParams: {
            comparator: function (filterLocalDateAtMidnight, cellValue) {
              var dateAsString = cellValue;
              if (dateAsString == null) return -1;
              var dateParts = dateAsString.split("/");
              var cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
              );

              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }

              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }

              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            },
            browserDatePicker: true,
          },
        },
        {
          headerName: this.$t("auth.users.profile.position"),
          field: "position",
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.title"),
          field: "title",
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.jobs"),
          field: "jobs",
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.department"),
          field: "unitid",
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: {},
          },
          valueFormatter: this.getUnitmap,
          cellRenderer: this.getUnitmap,
        },
        {
          headerName: this.$t("auth.users.profile.phone1"),
          field: "phone",
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.phone2"),
          field: "tel",
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.address"),
          field: "address",
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("auth.users.profile.remark"),
          field: "memo",
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("dataAGgrid.created_at"),
          field: "created_at",
          width: 110,
          minWidth: 110,
          maxWidth: 150,
          editable: false,
          sortable: true,
          filter: true,
        },
      ];
      this.defaultColDef = {
        editable: true,
        resizable: true,
      };
      this.getRowStyle = this.onchangerowcolor;
    },
    getunitdata() {
      this.$api
        .get("/profile/")
        .then((res) => {
          if (res.data.success) {
            this.rowData = res.data.data;
          } else {
          }
        })
        .catch((e) => {});
    },
    onGridReady(params) {
      params.api.sizeColumnsToFit();
    },
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilter);
    },
    getSelector(params) {
      const mapMenu = this.$t("auth.users.profile.sexoptions");
      return mapMenu[params.value];
    },
    getUnitmap(params) {
      return this.unitMap[params.value];
    },
    // 打印aggrid标题必须选项
    printItems() {
      this.gridApi.setDomLayout("print");
      this.$nextTick(() => {
        setTimeout(() => {
          this.gridApi.setDomLayout(null);
        }, 5000);
      });
    },
    ExportDataAsCVS() {
      var params = {
        fileName: "roles.xls",
        suppressQuotes: true,
        columnSeparator: ",",
      };
      this.gridApi.exportDataAsCsv(params);
    },
    onchangerowcolor() {
      return { backgroundColor: this.changerowcolor };
    },
    oncellValueChanged(params) {
      if (params.oldValue === null) params.oldValue = "";
      if (params.newValue !== params.oldValue) {
        this.changerowcolor = "#ffa195";
        this.gridApi.redrawRows({
          rowNodes: [this.gridApi.getDisplayedRowAtIndex(params.rowIndex)],
        });
      }
      this.changerowcolor = "";
    },
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows();
      selectedData.forEach((val) => {
        if (val.id === undefined) {
          this.$api
            .post("/profile/", val)
            .then((res) => {
              if (res.data.success) {
                this.gridApi.updateRowData({
                  update: [Object.assign(val, res.data.data)],
                });
                this.$zglobal.showMessage(
                  "positive",
                  "center",
                  this.$t("operation.addsuccess")
                );
              } else {
                this.$zglobal.showMessage(
                  "red-7",
                  "center",
                  this.$t("operation.addfailed")
                );
              }
            })
            .catch((e) => {});
        } else {
          this.$api
            .put("/profile/" + val.id, val)
            .then((res) => {
              if (res.data.success) {
                this.gridApi.updateRowData({
                  update: [Object.assign(val, res.data.data)],
                });
                this.$zglobal.showMessage(
                  "positive",
                  "center",
                  this.$t("operation.updatesuccess")
                );
                // console.log(res.data.data)
              } else {
                this.$zglobal.showMessage(
                  "red-7",
                  "center",
                  this.$t("operation.updatefailed")
                );
              }
            })
            .catch((e) => {});
        }
      });
    },
    Showunittree() {
      var selectedData = this.gridApi.getSelectedRows();
      if (
        (selectedData.length === 1 && selectedData[0].id !== undefined) ||
        selectedData.length > 1
      ) {
        // 开始处理
        this.DunitTree = true;
        this.loading = true;
        // 先得到登录用户的管理单位节点
        var node = null;
        if (this.mPermissions["profile.iManageUnit"]) {
          node = this.mPermissions["profile.iManageUnit"];
        } else {
          if (this.store.ZPermissions.units.length >= 1)
            node = this.store.ZPermissions.units[0].id;
        }
        this.$api
          .get("/z_unit/getTheUnitTree/" + node)
          .then((res) => {
            if (res.data.success) {
              this.loading = false;
              this.Unitdata = res.data.data;

              // 得到选定用户的机构值
              if (selectedData[0].id) {
                this.$api
                  .get("/users/getUserUnit/" + selectedData[0].id)
                  .then((resmy) => {
                    if (resmy.data.success) {
                      this.unitticked = resmy.data.data.map(({ id }) => id)[0];
                    }
                  });
              }
              this.$zglobal.showMessage(
                "positive",
                "center",
                this.$t("operation.getdatasuccess")
              );
            } else {
              this.loading = false;
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.status) {
              this.$zglobal.showMessage(
                "red-5",
                "center",
                this.$t("auth.register.invalid_data")
              );
            }
          });
      } else {
        this.$zglobal.showMessage(
          "red-7",
          "center",
          this.$t("operation.rowserror")
        );
      }
    },
    Editusertounit() {
      var selectedData = this.gridApi.getSelectedRows();
      var selectarr = selectedData.map(({ name, id }) => id);
      this.$api
        .post("/users/setUserUnit/", {
          users: selectarr,
          units: [this.unitticked],
        })
        .then((res) => {
          if (res.data.success) {
            this.$zglobal.showMessage(
              "positive",
              "center",
              this.$t("success") + ":" + res.data.data
            );
            this.getunitdata();
          }
        })
        .catch((error) => {
          if (error.status) {
            this.loading = false;
            this.$zglobal.showMessage(
              "red-5",
              "center",
              this.$t("auth.register.invalid_data")
            );
          }
        });
    },
  },
};
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Profile-agGrid .ag-header {
  background-color: var(--q-secondary);
  color: #ffffff;
  font-size: 13px;
}
.Profile-agGrid .ag-cell {
  padding-left: 1px;
  font-size: 13px;
}
.ag-theme-balham .ag-ltr .ag-cell {
  padding-left: 1px;
  border-right: 1px solid rgba(233, 233, 233, 0.96);
}
.ag-theme-balham .ag-icon,
.ag-header-icon .ag-sort-ascending-icon {
  color: #ffffff;
}
.ag-theme-balham .ag-paging-page-summary-panel .ag-icon,
.ag-theme-balham .ag-paging-panel {
  color: #000000;
}
.ag-theme-balham .ag-icon-checkbox-unchecked {
  color: #cccccc;
}
.ag-theme-balham .ag-icon-checkbox-checked {
  color: var(--q-secondary);
}
</style>
