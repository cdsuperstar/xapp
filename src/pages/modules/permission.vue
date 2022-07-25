<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="DJsonEditor" full-width full-height>
      <q-card class="q-dialog-plugin">
        <q-toolbar>
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            color="negative"
            :title="this.$t('buttons.close')"
          />
          <q-toolbar-title>
            <span class="text-subtitle1 text-weight-bold">
              {{ $t("jsoneditor.header") }}</span
            >
          </q-toolbar-title>
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="EditJSON()"
          />
        </q-toolbar>
        <q-separator color="accent" />
        <q-card-section
          style="min-height: 10vh; max-height: 80vh"
          class="scroll"
        >
          <JsonEditor
            v-model="jsonData"
            style="border: 1px dashed #b5b5b5; padding-left: 1px"
            :options="{
              confirmText: 'confirm',
              cancelText: 'cancel',
            }"
            :obj-data="jsonData"
          >
          </JsonEditor>
        </q-card-section>
        <q-separator color="accent" />
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="80px" color="secondary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t("permission.header") }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        v-if="mPermissions['permission.badd']"
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
      />
      <q-btn
        v-if="mPermissions['permission.bDelete']"
        color="deldbtn"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        v-if="mPermissions['permission.bmodify']"
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
        v-if="mPermissions['permission.bJsonedit']"
        color="treebtn"
        text-color="white"
        class="q-ma-xs"
        icon="account_tree"
        :label="this.$t('buttons.json')"
        @click="DJsonedit()"
      />
      <q-btn
        v-if="mPermissions['permission.bexport']"
        color="expbtn"
        text-color="white"
        class="q-ma-xs"
        icon="cloud_download"
        :label="this.$t('buttons.export')"
        @click="ExportDataAsCVS()"
      />
      <q-space />
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 120px"
        class="q-ml-md"
        :label="this.$t('modules.searchall')"
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
    <div class="shadow-1">
      <ag-grid-vue
        style="width: 100%; height: 500px"
        class="ag-theme-balham Permission-agGrid"
        row-selection="multiple"
        row-multi-select-with-click="true"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        :pagination="true"
        :pagination-page-size="50"
        :get-row-style="getRowStyle"
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
// import { mapActions } from "vuex";

export default {
  name: "Permission",
  components: {
    AgGridVue,
  },
  data() {
    return {
      loading: true,
      DJsonEditor: null,
      jsonData: null,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
      mPermissions: [],
    };
  },
  created() {
    this.$router.app.$http
      .get("/z_permission/")
      .then((res) => {
        if (res.data.success) {
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
    ...mapActions("zero", ["getMyPermissions", "reqThePermission"]),
    initPermissions() {
      const preq = [
        {
          module: "permission",
          name: "permission.badd",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("permission.badd"),
        },
        {
          module: "permission",
          name: "permission.bDelete",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("permission.bDelete"),
        },
        {
          module: "permission",
          name: "permission.bmodify",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("permission.bmodify"),
        },
        {
          module: "permission",
          name: "permission.bexport",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("permission.bexport"),
        },
        {
          module: "permission",
          name: "permission.bJsonedit",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("permission.bJsonedit"),
        },
      ];

      this.reqThePermission(preq)
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
          headerName: this.$t("permission.title"),
          field: "title",
          width: 200,
          minWidth: 200,
          maxWidth: 300,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("permission.name"),
          field: "name",
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("permission.syscfg"),
          field: "syscfg",
          width: 120,
          minWidth: 120,
          maxWidth: 260,
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
              this.$router.app.$http
                .delete("/z_permission/" + val.id)
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
        fileName: "permission.xls",
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
    addItems() {
      var newItems = [{}];
      this.gridApi.updateRowData({ add: newItems });
    },
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows();
      selectedData.forEach((val) => {
        if (val.id === undefined) {
          this.$router.app.$http
            .post("/z_permission/", val)
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
          this.$router.app.$http
            .put("/z_permission/" + val.id, val)
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
    DJsonedit() {
      this.loading = true;
      this.DJsonEditor = true;
      var selectedData = this.gridApi.getSelectedRows();
      if (selectedData.length === 1 && selectedData[0].id !== undefined) {
        this.loading = true;
        this.jsonData = JSON.parse(selectedData[0].syscfg);
      } else {
        this.$zglobal.showMessage(
          "red-5",
          "center",
          this.$t("operation.rowserror")
        );
      }
      this.loading = false;
    },
    EditJSON() {},
    // JSON format print
  },
};
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Permission-agGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
  font-size: 13px;
}
.Permission-agGrid .ag-cell {
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
  color: var(--q-color-secondary);
}
</style>
