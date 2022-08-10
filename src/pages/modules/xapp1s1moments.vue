<template>
  <q-page padding>
    <q-page padding class="q-pa-ma">
      <div class="text-h5 q-ma-md text-secondary">
        {{ $t("xapp1s1.moment.header") }}
      </div>
      <q-separator color="accent" />
      <div class="row q-ma-md" style="margin: 16px 1px">
        <q-btn
          color="addbtn"
          text-color="white"
          class="q-ma-xs"
          icon="post_add"
          :label="this.$t('buttons.add')"
          @click="addItems()"
        />
        <q-btn
          color="deldbtn"
          text-color="white"
          class="q-ma-xs"
          icon="delete_sweep"
          :label="this.$t('buttons.delete')"
          @click="delItems()"
        />
        <q-btn
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
          class="ag-theme-balham Units-agGrid"
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
  </q-page>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default {
  name: "xapp1s1products",
  components: {
    AgGridVue,
  },
  setup() {},
  data() {
    return {
      loading: true,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
    };
  },
  created() {
    this.$api
      .get("/xapp1s1/moments/")
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
  },
  methods: {
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
          headerName: this.$t("xapp1s1.moment.note"),
          field: "note",
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
          width: 130,
          minWidth: 130,
          maxWidth: 180,
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
              this.$api
                .delete("/xapp1s1/moments/" + val.id)
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
          this.$api
            .post("/xapp1s1/moments/", val)
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
            .put("/xapp1s1/moments/" + val.id, val)
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
