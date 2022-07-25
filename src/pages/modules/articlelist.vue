<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="DaddFiles" seamless>
      <q-item-section style="max-width: 300px; max-height: 50vh" class="scroll">
        <q-uploader
          style="max-width: 300px"
          :url="this.$axios.defaults.baseURL + '/zero/uploadMyTmpFiles'"
          method="POST"
          multiple
          auto-expand
          color="primary"
          :filter="checkFileSize"
          :label="this.$t('article.attachment')"
          :headers="[
            {
              name: 'enctype',
              value: 'multipart/form-data',
            },
            { name: 'Authorization', value: 'Bearer ' + this.$auth.token() },
          ]"
          @uploaded="upfilished"
        >
          <template v-slot:list="scope">
            <div class="text-right">
              <q-btn
                v-close-popup
                flat
                round
                color="negative"
                size="sm"
                icon="close"
                title="关闭此窗口"
              />
            </div>
            <q-list separator>
              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-label caption>
                    Status: {{ file.__status }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                  <img :src="file.__img.src" />
                </q-item-section>

                <q-item-section top side>
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="scope.removeFile(file)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-uploader>
      </q-item-section>
    </q-dialog>
    <q-dialog v-model="DaddArticle">
      <q-card style="width: 1000px; max-width: 80vw">
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
              {{ $t("article.addarticle") }}</span
            >
          </q-toolbar-title>
          <q-btn
            flat
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="aDDNewArticle()"
          />
        </q-toolbar>
        <q-separator />
        <q-card-section style="max-height: 80vh" class="scroll">
          <q-input
            v-model.trim="data.title"
            type="text"
            style="max-width: 500px"
            autofocus
            :label="this.$t('article.title')"
            :error="$v.data.title.$error"
            :error-message="this.$t('article.titlenull')"
            @blur="$v.data.title.$touch"
          />
          <div class="col-3 row">
            <div class="col-5">
              <q-select
                v-model.trim="data.user_id"
                style="max-width: 150px"
                :options="useroptions"
                :label="this.$t('article.user')"
                emit-value
                map-options
              />
            </div>
            <div class="col-5 q-ml-lg">
              <q-input
                v-model.trim="data.created_date"
                style="max-width: 150px"
                :label="this.$t('article.createddate')"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model.trim="data.created_date"
                        color="orange"
                        mask="YYYY-MM-DD"
                        text-color="black"
                        first-day-of-week="1"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-md-8 q-mt-md">
            <q-editor
              v-model="data.content"
              :definitions="{
                upload: {
                  label: '附件',
                  icon: 'cloud_upload',
                  tip: '上传附件',
                  handler: uploadFile,
                },
              }"
              :label="this.$t('article.content')"
              :toolbar="[
                ['left', 'center', 'right', 'justify'],
                ['bold', 'italic', 'strike', 'underline'],
                ['print', 'fullscreen'],
                ['upload', 'viewsource'],
              ]"
            />
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t("article.header") }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        v-if="mPermissions['articlelist.badd']"
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
      />
      <q-btn
        v-if="mPermissions['articlelist.bDelete']"
        color="deldbtn"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        v-if="mPermissions['articlelist.bmodify']"
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
        v-if="mPermissions['articlelist.bexport']"
        color="expbtn"
        text-color="white"
        class="q-ma-xs"
        icon="cloud_download"
        :label="this.$t('buttons.export')"
        @click="ExportDataAsCVS()"
      />
      <q-space />

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
        style="width: 100%; height: 600px"
        class="ag-theme-balham Article-agGrid"
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
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
// import { mapActions } from "vuex";
import agDateCellRender from "../frameworkComponents/agDateCellRender";

export default {
  name: "theArticle",
  components: {
    AgGridVue,
  },
  data() {
    return {
      DaddArticle: false,
      DaddFiles: false,
      quickFilter: null,
      useroptions: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      userMap: {},
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
      mPermissions: [],
      data: {
        title: "",
        user_id: "",
        created_date: "",
        files: [],
        content: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  computed: {},
  created() {
    this.$router.app.$http
      .get("/article/")
      .then((res) => {
        if (res.data.success) {
          this.rowData = res.data.data;
        } else {
        }
      })
      .catch((e) => {});
    // 获得useroptions
    this.$router.app.$http.get("/users/").then((res) => {
      if (res.data.success) {
        // console.log(res.data.data)
        this.columnDefs[2].cellEditorParams.values = res.data.data.map(
          ({ name, id }) => id.toString()
        );
        this.userMap = res.data.data.reduce((acc, v) => {
          acc[v.id] = v.name;
          return acc;
        }, {});
        this.useroptions = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
      } else {
      }
    });
    // end
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
          module: "articlelist",
          name: "articlelist.badd",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("article.badd"),
        },
        {
          module: "articlelist",
          name: "articlelist.bDelete",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("article.bDelete"),
        },
        {
          module: "articlelist",
          name: "articlelist.bmodify",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("article.bmodify"),
        },
        {
          module: "articlelist",
          name: "articlelist.bexport",
          syscfg: {
            required: false,
            type: "Boolean",
            default: null,
          },
          title: this.$t("article.bexport"),
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
      this.frameworkComponents = {
        agDateCellRender: agDateCellRender,
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
          headerName: this.$t("article.title"),
          field: "title",
          width: 120,
          minWidth: 120,
          maxWidth: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: this.$t("article.user"),
          field: "user_id",
          width: 100,
          minWidth: 100,
          maxWidth: 150,
          sortable: true,
          filter: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: {},
          },
          valueFormatter: this.getUsermap,
        },
        {
          headerName: this.$t("article.createddate"),
          field: "created_date",
          width: 100,
          minWidth: 100,
          maxWidth: 120,
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
          headerName: this.$t("article.content"),
          field: "content",
          sortable: true,
          width: 200,
          minWidth: 200,
          maxWidth: 350,
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
        {
          headerName: this.$t("dataAGgrid.updated_at"),
          field: "updated_at",
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
    checkFileSize(files) {
      return files.filter((file) => file.size < 20480000);
    },
    // 用户列表
    getUsermap(params) {
      return this.userMap[params.value];
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
                .delete("/article/" + val.id)
                .then((res) => {
                  if (res.data.data.success) {
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
        fileName: "article.xls",
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
    // Dialog start
    addItems() {
      this.DaddArticle = true;
    },
    aDDNewArticle() {
      // 文件上传
      // console.log(this.data)
      // var formData = new FormData()
      // for (const key in this.data) {
      //   formData.append(key, this.data[key])
      // }
      // formData.append('files[]', this.$refs.fileuper.files)
      // // 文件结束

      this.$router.app.$http.post("/article/", this.data).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.gridApi.updateRowData({
            add: [res.data.data],
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
            this.$t("auth.errors.adderror")
          );
        }
      });
      this.DaddArticle = false;
    },
    // Dialog end
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows();
      selectedData.forEach((val) => {
        // console.log(val)
        if (val.id === undefined) {
          this.$router.app.$http
            .post("/article/", val)
            .then((res) => {
              if (res.data.data.success) {
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
            .put("/article/" + val.id, val)
            .then((res) => {
              if (res.data.data.success) {
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
    // 文件上传
    uploadFile() {
      this.DaddFiles = true;
      this.data.files = [];
    },
    upfilished(info) {
      console.log(info);
      this.data.files.push(info.files[0].name);
      // this.DaddFiles = false
    },
  },
  validations: {
    data: {
      title: {
        required,
      },
      createddate: {
        required,
      },
    },
  },
};
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Article-agGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
  font-size: 13px;
}
.Article-agGrid .ag-cell {
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
