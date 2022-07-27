<template>
  <q-page padding class="q-pa-ma">
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t("roles.header") }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        v-if="mPermissions['role.badd']"
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
      />
      <q-btn
        v-if="mPermissions['role.bDelete']"
        color="deldbtn"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        v-if="mPermissions['role.bmodify']"
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
        v-if="mPermissions['role.bSetTree']"
        color="treebtn"
        text-color="white"
        class="q-ma-xs"
        icon="account_tree"
        :label="this.$t('buttons.setmodule')"
        @click="ShowUnittree()"
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
    <div class="row q-ma-md">
      <div class="col-md-5">
        <ag-grid-vue
          style="width: 100%; height: 500px"
          class="ag-theme-balham Role-agGrid"
          row-selection="single"
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
      <div v-if="roleeditsign" class="col-md-5" style="margin-left: 15px">
        <q-card flat>
          <q-toolbar style="min-height: 20px">
            <q-toolbar-title dense>
              <span class="text-subtitle1 text-weight-bold">
                {{ $t("roles.editroleltree") }} [{{ rolename }}]</span
              >
            </q-toolbar-title>
            <q-btn
              flat
              color="primary"
              icon="save_alt"
              :label="this.$t('buttons.confirm')"
              @click="EditUnittree()"
            />
          </q-toolbar>
          <q-separator />
          <q-card-section
            style="min-height: 10vh; max-height: 80vh"
            class="scroll"
          >
            <q-tree
              class="col-12 col-sm-6"
              ref="myroletree"
              node-key="id"
              label-key="title"
              tick-strategy="strict"
              control-color="warning"
              :nodes="Roledata"
              v-model:ticked="roleticked"
            />
          </q-card-section>
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="80px" color="secondary" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import { mapActions, mapState } from "vuex";
import { useZeroStore } from "stores/zero";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { api } from "boot/axios";

export default {
  name: "Roles",
  components: {
    AgGridVue,
  },
  data() {
    return {
      loading: false,
      roleeditsign: false,
      rolename: null,
      Roledata: [],
      roleticked: null,
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
  setup() {
    const store = useZeroStore();
    return {
      store,
    };
  },
  computed: {},
  beforeCreate() {},
  created() {
    api
      .get(
        "/z_role/getSelfOrLowRoles/" + this.store.ZPermissions.currectrole.id
      )
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
    this.initPermissions();
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    initPermissions() {
      const preq = [
        {
          module: "role",
          name: "role.badd",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("roles.badd"),
        },
        {
          module: "role",
          name: "role.bDelete",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("roles.bDelete"),
        },
        {
          module: "role",
          name: "role.bmodify",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("roles.bmodify"),
        },
        {
          module: "role",
          name: "role.bSetTree",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("roles.bSetTree"),
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
          headerName: "ID",
          field: "id",
          width: 70,
          minWidth: 70,
          maxWidth: 70,
          sortable: true,
          editable: false,
          checkboxSelection: true,
        },
        {
          headerName: this.$t("roles.name"),
          field: "name",
          width: 100,
          minWidth: 100,
          maxWidth: 130,
          editable: true,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("roles.title"),
          field: "title",
          width: 120,
          minWidth: 120,
          maxWidth: 260,
          editable: true,
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
              api
                .delete("/z_role/" + val.id)
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
          api
            .post("/z_role", val)
            .then((res) => {
              // console.log(res.data.data)
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
          api
            .put("/z_role/" + val.id, val)
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
    ShowUnittree() {
      this.roleeditsign = true;
      this.loading = true;
      var selectedData = this.gridApi.getSelectedRows();
      if (selectedData.length === 1 && selectedData[0].id !== undefined) {
        this.loading = true;
        this.rolename = selectedData[0].name;
        this.Roledata = this.store.ZPermissions.moduletree;
        this.$nextTick(() => {
          this.$refs.myroletree.setExpanded(1, true);
        });
        api.get("/zero/getRoleModules/" + selectedData[0].id).then((resmy) => {
          if (resmy.data.success) {
            this.roleticked = resmy.data.data;
            this.loading = false;
            this.$zglobal.showMessage(
              "positive",
              "center",
              this.$t("roles.getrowssuccess")
            );
          } else {
          }
        });
      } else {
        this.$zglobal.showMessage(
          "red-5",
          "center",
          this.$t("operation.rowserror")
        );
      }
      this.loading = false;
    },
    EditUnittree() {
      this.loading = true;
      var selectedData = this.gridApi.getSelectedRows();
      if (selectedData.length === 1 && selectedData[0].id !== undefined) {
        api
          .post("/zero/setRoleModules/" + selectedData[0].id, {
            modules: this.roleticked,
          })
          .then((res) => {
            if (res.data.success) {
              this.roleeditsign = false;
              this.$zglobal.showMessage(
                "positive",
                "center",
                this.$t("success") + ":" + res.data.data
              );
            }
          })
          .catch((error) => {
            if (error.status) {
              this.$zglobal.showMessage(
                "red-5",
                "center",
                this.$t("auth.register.invalid_data")
              );
            }
          });
        this.loading = false;
      } else {
        this.$zglobal.showMessage(
          "red-5",
          "center",
          this.$t("operation.rowserror")
        );
      }
    },
  },
};
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Role-agGrid .ag-header {
  background-color: var(--q-secondary);
  color: #ffffff;
  font-size: 13px;
}
.Role-agGrid .ag-cell {
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
