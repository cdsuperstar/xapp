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
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
      <q-space v-if="$q.screen.gt.xs" />
      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 120px"
        class="q-ml-md"
        :label="$t('modules.searchall')"
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
import { useZeroStore } from "stores/zero";
import agDateCellRender from "pages/frameworkComponents/agDateCellRender";

export default {
  name: "xapp1s1profiles",
  components: {
    AgGridVue,
  },
  data() {
    return {
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
      genders: this.$tm("auth.users.profile.sexoptions"),
      mPermissions: [],
    };
  },
  setup() {},

  computed: {},
  created() {
    this.getGridData();
  },
  beforeMount() {
    this.initGrid();
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    getGridData() {
      this.$api
        .get("/xapp1s1/profile/")
        .then((res) => {
          if (res.data.success) {
            this.rowData = res.data.data;
          } else {
          }
        })
        .catch((e) => {});
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
          headerName: this.$t("xapp1s1.profile.realName"),
          field: "realname",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.idCard"),
          field: "idcard",
          width: 160,
          minWidth: 160,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.phone"),
          field: "phone",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.companyName"),
          field: "companyName",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.nickname"),
          field: "nickname",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.sex"),
          field: "sex",
          width: 80,
          minWidth: 80,
          maxWidth: 80,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: Object.keys(this.$tm("auth.users.profile.sexoptions")),
          },
          valueFormatter: this.getSelector,
        },
        {
          headerName: this.$t("xapp1s1.profile.height"),
          field: "height",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.incomeBegin"),
          field: "incomebegin",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.incomeEnd"),
          field: "incomebnd",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.workAddress"),
          field: "workaddress",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.eduBack"),
          field: "eduback",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.marriage"),
          field: "marriage",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.nativePlace"),
          field: "nativeplace",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.weight"),
          field: "weight",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.houseSitu"),
          field: "housesitu",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.carsitu"),
          field: "carsitu",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.smokeSitu"),
          field: "smokesitu",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.drinkSitu"),
          field: "drinksitu",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.childrenSitu"),
          field: "childrensitu",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("xapp1s1.profile.memo"),
          field: "memo",
          width: 80,
          minWidth: 80,
          maxWidth: 160,
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
    onGridReady(params) {
      params.api.sizeColumnsToFit();
    },
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilter);
    },
    getSelector(params) {
      return this.genders[params.value];
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
            .post("/xapp1s1/profile/", val)
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
            .put("/xapp1s1/profile/" + val.id, val)
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
