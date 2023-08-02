<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="DModelTree">
      <q-card class="q-dialog-plugin">
        <q-toolbar class="bg-primary text-white">
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            color="white"
            :title="this.$t('buttons.close')"
          />
          <q-toolbar-title>
            <span class="text-subtitle1 text-weight-bold">
              {{ $t("modules.editmodeltree") }}
            </span>
          </q-toolbar-title>
          <q-btn
            flat
            color="white"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="EditModeltree()"
          />
        </q-toolbar>
        <q-separator color="accent" />
        <q-card-section
          style="min-height: 10vh; max-height: 80vh"
          class="scroll"
        >
          <nested-test v-if="true" v-model:lists="Modeldata" class="col-8" />
        </q-card-section>
        <q-separator color="accent" />
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="80px" color="secondary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t("modules.header") }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        v-if="mPermissions['modules.badd']"
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
      />
      <q-btn
        v-if="mPermissions['modules.bDelete']"
        color="deldbtn"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        v-if="mPermissions['modules.bmodify']"
        color="savebtn"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="saveItems()"
      />
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
      <q-btn
        v-if="mPermissions['modules.bSetTree']"
        color="treebtn"
        text-color="white"
        class="q-ma-xs"
        icon="account_tree"
        :label="this.$t('buttons.tree')"
        @click="Modeltree()"
      />
      <q-btn
        v-if="mPermissions['modules.bexport']"
        color="expbtn"
        text-color="white"
        class="q-ma-xs"
        icon="cloud_download"
        :label="this.$t('buttons.export')"
        @click="ExportDataAsCVS()"
      />
      <q-space v-if="$q.screen.gt.xs" />
      <q-file
        v-if="mPermissions['modules.bimport'] && $q.screen.gt.xs"
        v-model="importfile"
        style="max-width: 100px"
        accept=".xlsx, *.xls"
        dense
        clearable
        :label="this.$t('buttons.import')"
        @input="ImportCVStoData()"
      >
        <template v-slot:prepend>
          <q-icon name="attachment" />
        </template>
      </q-file>

      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 100px"
        class="q-ml-xs"
        :label="this.$t('modules.searchall')"
        @change="onQuickFilterChanged()"
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
    <div class="shadow-1">
      <ag-grid-vue
        style="width: 100%; height: 500px"
        class="ag-theme-balham Modules-agGrid"
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
import { read, writeFileXLSX } from "xlsx";
import NestedTest from "./nested-tree";
import { defineComponent } from "vue";
import { useZeroStore } from "stores/zero";

export default defineComponent({
  name: "Modules",
  components: {
    AgGridVue,
    NestedTest,
  },
  data() {
    return {
      loading: true,
      DModelTree: null,
      Modeldata: null,
      quickFilter: null,
      importfile: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      frameworkComponents: null,
      defaultColDef: null,
      mPermissions: [],
      menuTypes: this.$tm("menu.types"),
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
    this.$api
      .get(
        "/z_module/getSelfLowModules/" +
          this.store?.ZPermissions?.currectrole?.id
      )
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.data)
          this.rowData = res.data.data;
        } else {
        }
      })
      .catch((e) => {});
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
          module: "modules",
          name: "modules.badd",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("modules.badd"),
        },
        {
          module: "modules",
          name: "modules.bDelete",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("modules.bDelete"),
        },
        {
          module: "modules",
          name: "modules.bmodify",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("modules.bmodify"),
        },
        {
          module: "modules",
          name: "modules.bexport",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("modules.bexport"),
        },
        {
          module: "modules",
          name: "modules.bimport",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("modules.bimport"),
        },
        {
          module: "modules",
          name: "modules.bSetTree",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("modules.bSetTree"),
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
      this.columnDefs = [
        {
          editable: false,
          headerName: "ID",
          field: "id",
          width: 70,
          minWidth: 70,
          maxWidth: 70,
          sortable: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true,
        },
        {
          headerName: this.$t("modules.name"),
          field: "name",
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("modules.title"),
          field: "title",
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("modules.icon"),
          field: "icon",
          width: 100,
          minWidth: 100,
          maxWidth: 180,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("modules.ismenu"),
          field: "ismenu",
          width: 100,
          minWidth: 100,
          maxWidth: 130,
          sortable: true,
          filter: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: { values: Object.keys(this.$tm("menu.types")) },
          valueFormatter: this.getSelector,
        },
        {
          headerName: this.$t("modules.url"),
          field: "url",
          width: 60,
          minWidth: 60,
          maxWidth: 120,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("modules.author"),
          field: "author",
          width: 60,
          minWidth: 60,
          maxWidth: 100,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("modules.memo"),
          field: "memo",
          width: 120,
          minWidth: 120,
          maxWidth: 260,
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
    onGridReady(params) {
      params.api.sizeColumnsToFit();
    },
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilter);
    },
    // 导入开始
    ImportCVStoData() {
      const file = this.importfile;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          let j = 0;
          data.map((item) => {
            const ret = {};
            let i = 0;
            // console.log(this)
            this.columnDefs.forEach(function (val) {
              ret[val.field] = item[i++];
            });
            if (j > 0) this.rowData.push(ret);
            j++;
          });
        };
        reader.readAsBinaryString(file);
      }
    },
    // 导入结束
    getSelector(params) {
      // var mapMenu = this.$tm("menu.types");
      return this.menuTypes[params.value];
    },
    delItems() {
      var selectedData = this.gridApi.getSelectedRows();
      if (selectedData.length > 0) {
        this.$q
          .dialog({
            title: this.$t("buttons.comfirmtitle"),
            message: this.$t("buttons.comfirmdialog"),
            html: true,
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            selectedData.forEach((val) => {
              this.gridApi.updateRowData({ remove: [val] });
              if (val.id === undefined) return false;
              this.$api
                .delete("/z_module/" + val.id)
                .then((res) => {
                  if (res.data.success) {
                    // console.log(res.data.data)
                    this.$zglobal.showMessage(
                      "positive",
                      "center",
                      this.$t("operation.delsuccess")
                    );
                  } else {
                    this.$zglobal.showMessage(
                      "red-7",
                      "center",
                      this.$t("operation.delfailed")
                    );
                  }
                })
                .catch((e) => {});
            });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
    },
    ExportDataAsCVS() {
      var params = {
        fileName: "modules.xls",
        suppressQuotes: true,
        columnSeparator: ",",
      };
      this.gridApi.exportDataAsCsv(params);
    },
    onchangerowcolor() {
      return { backgroundColor: this.changerowcolor };
    },
    oncellValueChanged(params) {
      // console.log(params.oldValue,updateRowData params.newValue)
      if (params.oldValue === null) params.oldValue = "";
      if (params.newValue !== params.oldValue) {
        this.changerowcolor = "#ffa195";
        this.gridApi.redrawRows({
          rowNodes: [this.gridApi.getDisplayedRowAtIndex(params.rowIndex)],
        });
      }
      this.changerowcolor = "";
    },
    addItems() {
      var newItems = [{}];
      this.gridApi.updateRowData({ add: newItems });
      // console.log(res)
    },
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows();
      selectedData.forEach((val) => {
        // console.log(val)
        if (val.id === undefined) {
          this.$api
            .post("/z_module/", val)
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
            .put("/z_module/" + val.id, val)
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
    Modeltree() {
      this.loading = true;
      this.DModelTree = true;
      this.$api
        .get("/z_module/getMyMenu/" + this.store.ZPermissions?.currectrole?.id)
        .then((res) => {
          if (res.data.success) {
            // console.log("modules.vue getMyMenu: ", res.data.data);
            this.Modeldata = res.data.data;
            this.loading = false;
          } else {
          }
        })
        .catch((e) => {
          this.$zglobal.showMessage(
            "red-5",
            "center",
            this.$t("auth.register.invalid_data")
          );
          this.loading = false;
          this.DModelTree = false;
        });
    },
    EditModeltree() {
      this.loading = true;
      this.$api
        .post("/z_module/setModuleTree/" + this.Modeldata[0].id, this.Modeldata)
        .then((res) => {
          if (res.data.success) {
            this.loading = false;
            this.store.getMyPermissions({
              role: this.store.ZPermissions?.currectrole?.name,
            });
            this.DModelTree = false;
            this.$zglobal.showMessage("positive", "center", this.$t("success"));
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
    },
  },
});
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Modules-agGrid .ag-header {
  background-color: var(--q-secondary);
  color: #ffffff;
  font-size: 13px;
}
.Modules-agGrid .ag-cell {
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
