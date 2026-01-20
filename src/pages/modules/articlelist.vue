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
                :title="this.$t('buttons.close')"
              />
            </div>
            <q-list separator>
              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-label caption> Status: {{ file.__status }} </q-item-label>

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
          <q-btn v-close-popup flat round dense icon="close" :title="this.$t('buttons.close')" />
          <q-toolbar-title>
            <span class="text-subtitle1 text-weight-bold"> {{ $t('article.addarticle') }}</span>
          </q-toolbar-title>
          <q-btn flat icon="save" :label="this.$t('buttons.confirm')" @click="aDDNewArticle()" />
        </q-toolbar>
        <q-separator />
        <q-card-section style="max-height: 80vh" class="scroll">
          <q-input
            v-model.trim="data.title"
            type="text"
            style="max-width: 500px"
            autofocus
            :label="this.$t('article.title')"
            :error="v$.data.title.$error"
            :error-message="this.$t('article.titlenull')"
            @blur="v$.data.title.$touch"
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
                :error="v$.data.created_date.$error"
                :error-message="this.$t('article.createddatenull')"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
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
      {{ $t('article.header') }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        v-if="mPermissions['articlelist.badd']"
        color="primary"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
      />
      <q-btn
        v-if="mPermissions['articlelist.bDelete']"
        color="negative"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        v-if="mPermissions['articlelist.bmodify']"
        color="positive"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="saveItems()"
      />
      <q-separator v-if="!$q.screen.gt.xs" class="col-10 q-ma-xs" color="info" />
      <q-btn
        v-if="mPermissions['articlelist.bexport']"
        color="accent"
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
      <q-separator v-if="!$q.screen.gt.xs" class="col-10 q-ma-xs" color="info" />
    </div>
    <div class="shadow-1">
      <ag-grid-vue
        style="width: 100%; height: 600px"
        class="ag-theme-balham Article-agGrid"
        ref="article_grid"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        :pagination="true"
        :pagination-page-size="50"
        :getRowStyle="getRowStyle"
        :framework-components="frameworkComponents"
        :locale-text="$tm('aggrid')"
        @cellValueChanged="oncellValueChanged"
        @grid-ready="onGridReady"
      >
      </ag-grid-vue>
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import agDateCellRender from '../frameworkComponents/agDateCellRender.vue'
import { defineComponent } from 'vue'
import { useZeroStore } from 'stores/zero'

export default defineComponent({
  name: 'theArticle',
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
      defaultColDef: null,
      mPermissions: [],
      data: {
        title: '',
        user_id: '',
        created_date: '',
        files: [],
        content: '',
      },
      modifiedCells: new Map(), // 存储修改过的单元格
      // 用于存储 cellStyle 函数的闭包引用
      cellStyleFunctions: new Map(),
    }
  },
  setup() {
    const store = useZeroStore()
    return {
      v$: useVuelidate(),
      store,
    }
  },
  created() {
    this.getArticleData()
    // 获得useroptions
    this.getUserOptions()
  },
  beforeMount() {
    this.initGrid()
  },
  mounted() {
    this.initPermissions()
  },
  methods: {
    initPermissions() {
      const preq = [
        {
          module: 'articlelist',
          name: 'articlelist.badd',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('article.badd'),
        },
        {
          module: 'articlelist',
          name: 'articlelist.bDelete',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('article.bDelete'),
        },
        {
          module: 'articlelist',
          name: 'articlelist.bmodify',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('article.bmodify'),
        },
        {
          module: 'articlelist',
          name: 'articlelist.bexport',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('article.bexport'),
        },
      ]

      this.store
        .reqThePermission(preq)
        .then((res) => {
          this.mPermissions = res
        })
        .catch((e) => {
          // console.log(e)
        })
    },

    getArticleData() {
      this.$api
        .get('/article/')
        .then((res) => {
          if (res.data.success) {
            if (process.env.DEV_LOG) {
              this.$zglobal.consoleLog(this, 'article data:', res.data.data)
            }
            this.rowData = res.data.data
          }
        })
        .catch((error) => {
          this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
        })
    },

    getUserOptions() {
      this.$api
        .get('/users/')
        .then((res) => {
          if (res.data.success) {
            this.columnDefs[2].cellEditorParams.values = res.data.data.map(({ name, id }) =>
              id.toString(),
            )
            this.userMap = res.data.data.reduce((acc, v) => {
              acc[v.id] = v.name
              return acc
            }, {})
            this.useroptions = res.data.data.map((item) => {
              return {
                value: item.id,
                label: item.name,
              }
            })
          }
        })
        .catch((error) => {
          this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
        })
    },

    initGrid() {
      this.gridOptions = {
        theme: 'legacy',
        rowHeight: 32,
        headerHeight: 32,
        allowShowChangeAfterFilter: true,
        rowSelection: {
          mode: 'multiRow',
          checkboxes: true,
          headerCheckbox: true,
          selectAll: 'filtered',
          enableSelectionWithoutKeys: true,
        },
      }
      this.frameworkComponents = {
        agDateCellRender: agDateCellRender,
      }

      // 创建列定义
      this.columnDefs = [
        {
          editable: false,
          headerName: 'ID',
          field: 'id',
          width: 70,
          minWidth: 70,
          maxWidth: 70,
          sortable: true,
        },
        {
          headerName: this.$t('article.title'),
          field: 'title',
          width: 120,
          minWidth: 120,
          maxWidth: 200,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('title'),
        },
        {
          headerName: this.$t('article.user'),
          field: 'user_id',
          width: 100,
          minWidth: 100,
          maxWidth: 150,
          sortable: true,
          filter: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: {},
          },
          valueFormatter: this.getUsermap,
          cellStyle: this.createCellStyleFunction('user_id'),
        },
        {
          headerName: this.$t('article.createddate'),
          field: 'created_date',
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          sortable: true,
          cellRenderer: agDateCellRender,
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: function (filterLocalDateAtMidnight, cellValue) {
              var dateAsString = cellValue
              if (dateAsString == null) return -1
              var dateParts = dateAsString.split('/')
              var cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0]),
              )

              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0
              }

              if (cellDate < filterLocalDateAtMidnight) {
                return -1
              }

              if (cellDate > filterLocalDateAtMidnight) {
                return 1
              }
            },
            browserDatePicker: true,
          },
          cellStyle: this.createCellStyleFunction('created_date'),
        },
        {
          headerName: this.$t('article.content'),
          field: 'content',
          sortable: true,
          width: 200,
          minWidth: 200,
          maxWidth: 350,
          filter: true,
          cellStyle: this.createCellStyleFunction('content'),
        },
        {
          headerName: this.$t('dataAGgrid.created_at'),
          field: 'created_at',
          width: 110,
          minWidth: 110,
          maxWidth: 150,
          editable: false,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('created_at'),
        },
        {
          headerName: this.$t('dataAGgrid.updated_at'),
          field: 'updated_at',
          width: 110,
          minWidth: 110,
          maxWidth: 150,
          editable: false,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('updated_at'),
        },
      ]

      this.defaultColDef = {
        editable: true,
        resizable: true,
      }
      this.getRowStyle = this.onchangerowcolor
    },

    // 新增：创建 cellStyle 函数，确保正确的 this 绑定
    createCellStyleFunction(field) {
      // 如果已经创建过，直接返回
      if (this.cellStyleFunctions.has(field)) {
        return this.cellStyleFunctions.get(field)
      }

      const styleFunction = (params) => {
        if (!params.data) return null

        const rowId = params.data.id
        if (!rowId) return null

        const cellKey = `${rowId}_${field}`
        if (this.modifiedCells.has(cellKey)) {
          return { backgroundColor: 'orange' }
        }
        return null
      }

      // 存储函数引用
      this.cellStyleFunctions.set(field, styleFunction)
      return styleFunction
    },

    onGridReady(params) {
      this.gridApi = params.api
      this.columnApi = params.columnApi
      params.api.refreshCells({
        force: true,
      })
      params.api.sizeColumnsToFit()
    },

    onQuickFilterChanged() {
      if (!this.gridApi) return
      this.gridApi.setQuickFilter(this.quickFilter)
    },

    checkFileSize(files) {
      return files.filter((file) => file.size < 20480000)
    },

    // 用户列表
    getUsermap(params) {
      return this.userMap[params.value]
    },

    delItems() {
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length > 0) {
        this.$q
          .dialog({
            title: this.$t('buttons.comfirmtitle'),
            message: this.$t('buttons.comfirmdialog'),
            html: true,
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            selectedData.forEach((val) => {
              this.gridApi.applyTransaction({ remove: [val] })
              if (val.id === undefined) return false
              this.$api
                .delete('/article/' + val.id)
                .then((res) => {
                  if (res.data.success) {
                    // 删除该行的修改标记
                    this.clearModifiedCellsForRow(val.id)
                    this.$zglobal.showMessage('positive', 'center', this.$t('operation.delsuccess'))
                  } else {
                    this.$zglobal.showMessage('red-7', 'center', this.$t('operation.delfailed'))
                  }
                })
                .catch((error) => {
                  this.$zglobal.showMessage('red-7', 'center', this.$t('operation.delfailed'))
                })
            })
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
      }
    },

    ExportDataAsCVS() {
      if (!this.gridApi) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('operation.rowserror'))
        return
      }
      var params = {
        fileName: 'article.xls',
        suppressQuotes: true,
        columnSeparator: ',',
      }
      this.gridApi.exportDataAsCsv(params)
      this.$zglobal.showMessage('positive', 'center', this.$t('success'))
    },

    onchangerowcolor() {
      // 不再返回固定背景色，让单元格样式单独控制
      return null
    },

    oncellValueChanged(params) {
      if (params.oldValue === null) params.oldValue = ''

      if (params.newValue !== params.oldValue) {
        try {
          const rowId = params.data.id
          const columnId = params.column.getColId()

          if (rowId) {
            // 生成单元格的唯一标识符
            const cellKey = `${rowId}_${columnId}`

            // 标记该单元格已被修改
            this.modifiedCells.set(cellKey, true)

            // 强制更新 Vue 响应式系统
            this.modifiedCells = new Map(this.modifiedCells)

            // 刷新当前单元格
            this.gridApi.refreshCells({
              rowNodes: [params.node],
              columns: [columnId],
              force: true,
            })

            // 显示修改成功提示
            this.$zglobal.showMessage('green-7', 'center', this.$t('operation.modifySuccess'))
          }
        } catch (error) {
          console.error('单元格值变更错误:', error)
          this.$zglobal.showMessage('red-7', 'center', this.$t('operation.modifyFailed'))
          // 回滚到旧值
          params.node.setDataValue(params.column.getColId(), params.oldValue)
        }
      }
    },

    // Dialog start
    addItems() {
      // 重置表单数据
      this.data = {
        title: '',
        user_id: '',
        created_date: this.getCurrentDate(),
        files: [],
        content: '',
      }
      this.v$.$reset()
      this.DaddArticle = true
    },

    getCurrentDate() {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    aDDNewArticle() {
      // 验证表单
      this.v$.$touch()
      if (this.v$.$invalid) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('auth.register.invalid_data'))
        return
      }

      this.$api
        .post('/article/', this.data)
        .then((res) => {
          if (res.data.success) {
            this.gridApi.applyTransaction({
              add: [res.data.data],
            })
            this.$zglobal.showMessage('positive', 'center', this.$t('operation.addsuccess'))
            this.DaddArticle = false
          } else {
            this.$zglobal.showMessage('red-7', 'center', this.$t('auth.errors.adderror'))
          }
        })
        .catch((error) => {
          this.$zglobal.showMessage('red-7', 'center', this.$t('operation.addfailed'))
        })
    },

    saveItems() {
      const selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 0) {
        this.$zglobal.showMessage('info', 'center', this.$t('modules.noSelection'))
        return
      }

      // 收集需要刷新的行节点和列ID
      const nodesToRefresh = []
      const allRowIdsToClear = []
      const columnIdsToRefresh = []

      const promises = selectedData.map((val) => {
        if (val.id === undefined) {
          // 新增行
          return this.$api.post('/article/', val).then((res) => {
            if (res.data.success) {
              const updatedRow = Object.assign(val, res.data.data)
              this.gridApi.applyTransaction({ update: [updatedRow] })
              if (updatedRow.id) {
                allRowIdsToClear.push(updatedRow.id)
                this.gridApi.forEachNode((node) => {
                  if (node.data && node.data.id === updatedRow.id) {
                    nodesToRefresh.push(node)
                  }
                })
              }
              this.$zglobal.showMessage('positive', 'center', this.$t('operation.addsuccess'))
              return { success: true }
            } else {
              this.$zglobal.showMessage('red-7', 'center', this.$t('operation.addfailed'))
              return { success: false }
            }
          })
        } else {
          // 更新行：收集需要刷新的列
          allRowIdsToClear.push(val.id)
          this.gridApi.forEachNode((node) => {
            if (node.data && node.data.id === val.id) {
              nodesToRefresh.push(node)
              // 获取该行所有修改过的列
              this.columnDefs.forEach((colDef) => {
                const field = colDef.field
                if (field) {
                  const cellKey = `${val.id}_${field}`
                  if (this.modifiedCells.has(cellKey)) {
                    columnIdsToRefresh.push(field)
                  }
                }
              })
            }
          })

          return this.$api.put('/article/' + val.id, val).then((res) => {
            if (res.data.success) {
              const updatedRow = Object.assign(val, res.data.data)
              this.gridApi.applyTransaction({ update: [updatedRow] })
              this.$zglobal.showMessage('positive', 'center', this.$t('operation.updatesuccess'))
              return { success: true }
            } else {
              this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
              return { success: false }
            }
          })
        }
      })

      // 批量处理所有请求
      Promise.all(promises)
        .then((results) => {
          // 统一清除所有标记
          allRowIdsToClear.forEach((rowId) => {
            this.clearModifiedCellsForRow(rowId)
          })

          // 统一刷新所有节点
          if (nodesToRefresh.length > 0) {
            // 如果有特定的列需要刷新，使用这些列
            if (columnIdsToRefresh.length > 0) {
              const uniqueColumns = [...new Set(columnIdsToRefresh)]
              this.gridApi.refreshCells({
                rowNodes: nodesToRefresh,
                columns: uniqueColumns,
                force: true,
              })
            } else {
              // 否则刷新所有列
              this.gridApi.refreshCells({
                rowNodes: nodesToRefresh,
                force: true,
              })
            }
          } else {
            this.gridApi.refreshCells({ force: true })
          }

          // 清除选中状态
          this.gridApi.deselectAll()
        })
        .catch((error) => {
          console.error('Save error:', error)
          this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
        })
    },

    // 清除某行的修改标记
    clearModifiedCellsForRow(rowId) {
      if (!rowId) return

      // 收集需要删除的键
      const keysToDelete = []
      this.modifiedCells.forEach((value, key) => {
        if (key.startsWith(`${rowId}_`)) {
          keysToDelete.push(key)
        }
      })

      // 删除所有标记
      keysToDelete.forEach((key) => {
        this.modifiedCells.delete(key)
      })

      // 如果没有找到标记，直接返回
      if (keysToDelete.length === 0) return

      // 强制更新 Vue 响应式系统
      this.modifiedCells = new Map(this.modifiedCells)

      // 找到对应的行节点并刷新
      let targetNode = null
      this.gridApi.forEachNode((node) => {
        if (node.data && node.data.id === rowId) {
          targetNode = node
        }
      })

      if (targetNode) {
        // 提取所有修改过的字段
        const modifiedFields = keysToDelete
          .map((key) => {
            const parts = key.split('_')
            return parts.length > 1 ? parts.slice(1).join('_') : ''
          })
          .filter((field) => field)

        // 刷新特定字段的单元格
        if (modifiedFields.length > 0) {
          this.gridApi.refreshCells({
            rowNodes: [targetNode],
            columns: modifiedFields,
            force: true,
          })
        }

        // 确保单元格样式被重新计算
        setTimeout(() => {
          this.gridApi.redrawRows({ rowNodes: [targetNode] })
        }, 10)
      }
    },

    // 文件上传
    uploadFile() {
      this.DaddFiles = true
      this.data.files = []
    },

    upfilished(info) {
      console.log(info)
      this.data.files.push(info.files[0].name)
      // this.DaddFiles = false
      this.$zglobal.showMessage('positive', 'center', this.$t('success'))
    },
  },
  validations() {
    return {
      data: {
        title: {
          required,
        },
        created_date: {
          required,
        },
      },
    }
  },
})
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Article-agGrid .ag-header {
  background-color: var(--q-secondary);
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
  color: var(--q-secondary);
}
</style>
