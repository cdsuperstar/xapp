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
              {{ $t('modules.editmodeltree') }}
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
        <q-card-section style="min-height: 10vh; max-height: 80vh" class="scroll">
          <nested-tree v-if="true" v-model:lists="Modeldata" class="col-8" />
        </q-card-section>
        <q-separator color="accent" />
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="80px" color="secondary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('modules.header') }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        v-if="mPermissions['modules.badd']"
        color="primary"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
      />
      <q-btn
        v-if="mPermissions['modules.bDelete']"
        color="negative"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        v-if="mPermissions['modules.bmodify']"
        color="positive"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="saveItems()"
      />
      <q-separator v-if="!$q.screen.gt.xs" class="col-10 q-ma-xs" color="info" />
      <q-btn
        v-if="mPermissions['modules.bSetTree']"
        color="warning"
        text-color="white"
        class="q-ma-xs"
        icon="account_tree"
        :label="this.$t('buttons.tree')"
        @click="Modeltree()"
      />
      <q-btn
        v-if="mPermissions['modules.bexport']"
        color="accent"
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
    </div>
    <div class="shadow-1">
      <ag-grid-vue
        style="width: 100%; height: 500px"
        class="ag-theme-balham Modules-agGrid"
        ref="modules_grid"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :rowData="rowData"
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
import { AgGridVue } from 'ag-grid-vue3'

import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS

import * as XLSX from 'xlsx'
import NestedTree from './nested-tree.vue'
import { defineComponent } from 'vue'
import { useZeroStore } from 'stores/zero'

export default defineComponent({
  name: 'Modules',
  components: {
    AgGridVue,
    NestedTree,
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
      changerowcolor: '',
      frameworkComponents: null,
      defaultColDef: null,
      mPermissions: [],
      menuTypes: this.$tm('menu.types'),
      modifiedCells: new Map(), // 存储修改过的单元格
      // 新增：用于存储 cellStyle 函数的闭包引用
      cellStyleFunctions: new Map(),
    }
  },
  setup() {
    const store = useZeroStore()

    return {
      store,
    }
  },
  computed: {},
  created() {
    this.$api
      .get('/z_module/getSelfLowModules/' + this.store?.ZPermissions?.currectrole?.id)
      .then((res) => {
        if (res.data.success) {
          if (process.env.DEV_LOG) {
            this.$zglobal.consoleLog(this, 'getSelfLowModules:', res.data.data)
          }
          this.rowData = res.data.data
        } else {
          /* empty */
        }
      })
      .catch((e) => {})
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
          module: 'modules',
          name: 'modules.badd',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('modules.badd'),
        },
        {
          module: 'modules',
          name: 'modules.bDelete',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('modules.bDelete'),
        },
        {
          module: 'modules',
          name: 'modules.bmodify',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('modules.bmodify'),
        },
        {
          module: 'modules',
          name: 'modules.bexport',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('modules.bexport'),
        },
        {
          module: 'modules',
          name: 'modules.bimport',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('modules.bimport'),
        },
        {
          module: 'modules',
          name: 'modules.bSetTree',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('modules.bSetTree'),
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
          headerName: this.$t('modules.name'),
          field: 'name',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('name'),
        },
        {
          headerName: this.$t('modules.title'),
          field: 'title',
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('title'),
        },
        {
          headerName: this.$t('modules.icon'),
          field: 'icon',
          width: 100,
          minWidth: 100,
          maxWidth: 180,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('icon'),
        },
        {
          headerName: this.$t('modules.ismenu'),
          field: 'ismenu',
          width: 100,
          minWidth: 100,
          maxWidth: 130,
          sortable: true,
          filter: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: Object.keys(this.$tm('menu.types')) },
          valueFormatter: this.getSelector,
          cellStyle: this.createCellStyleFunction('ismenu'),
        },
        {
          headerName: this.$t('modules.url'),
          field: 'url',
          width: 60,
          minWidth: 60,
          maxWidth: 120,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('url'),
        },
        {
          headerName: this.$t('modules.author'),
          field: 'author',
          width: 60,
          minWidth: 60,
          maxWidth: 100,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('author'),
        },
        {
          headerName: this.$t('modules.memo'),
          field: 'memo',
          width: 120,
          minWidth: 120,
          maxWidth: 260,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('memo'),
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
      params.api.refreshCells({
        force: true,
      })
      params.api.sizeColumnsToFit()
    },

    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilter)
    },

    // 导入开始
    ImportCVStoData() {
      const file = this.importfile
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
          let j = 0
          data.map((item) => {
            const ret = {}
            let i = 0
            this.columnDefs.forEach(function (val) {
              ret[val.field] = item[i++]
            })
            if (j > 0) this.rowData.push(ret)
            j++
          })
        }
        reader.readAsBinaryString(file)
      }
    },
    // 导入结束

    getSelector(params) {
      return this.menuTypes[params.value]
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
                .delete('/z_module/' + val.id)
                .then((res) => {
                  if (res.data.success) {
                    // 删除该行的修改标记
                    this.clearModifiedCellsForRow(val.id)
                    this.$zglobal.showMessage('positive', 'center', this.$t('operation.delsuccess'))
                  } else {
                    this.$zglobal.showMessage('red-7', 'center', this.$t('operation.delfailed'))
                  }
                })
                .catch((e) => {})
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
      var params = {
        fileName: 'modules.xls',
        suppressQuotes: true,
        columnSeparator: ',',
      }
      this.gridApi.exportDataAsCsv(params)
    },

    onchangerowcolor(params) {
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

    addItems() {
      var newItems = [{}]
      this.gridApi.applyTransaction({ add: newItems })
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
          return this.$api.post('/z_module/', val).then((res) => {
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

          return this.$api.put('/z_module/' + val.id, val).then((res) => {
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
        })
    },

    // 清除某行的修改标记（增强版）
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

    Modeltree() {
      this.loading = true
      this.DModelTree = true
      this.$api
        .get('/z_module/getMyMenu/' + this.store.ZPermissions?.currectrole?.id)
        .then((res) => {
          if (res.data.success) {
            this.$zglobal.consoleLog(this, res.data.data)
            this.Modeldata = res.data.data
            this.loading = false
          } else {
            /* empty */
          }
        })
        .catch((e) => {
          this.$zglobal.showMessage('red-5', 'center', this.$t('auth.register.invalid_data'))
          this.loading = false
          this.DModelTree = false
        })
    },

    EditModeltree() {
      this.loading = true
      this.$api
        .post('/z_module/setModuleTree/' + this.Modeldata[0].id, this.Modeldata)
        .then((res) => {
          if (res.data.success) {
            this.loading = false
            this.store.getMyPermissions({
              role: this.store.ZPermissions?.currectrole?.name,
            })
            this.DModelTree = false
            this.$zglobal.showMessage('positive', 'center', this.$t('success'))
          }
        })
        .catch((error) => {
          this.loading = false
          if (error.status) {
            this.$zglobal.showMessage('red-5', 'center', this.$t('auth.register.invalid_data'))
          }
        })
    },

    // 调试方法（可选）
    debugModifiedCells() {
      console.log('当前修改的单元格:', Array.from(this.modifiedCells.keys()))
      console.log('修改的单元格数量:', this.modifiedCells.size)

      // 检查每个单元格的状态
      this.gridApi.forEachNode((node) => {
        if (node.data && node.data.id) {
          this.columnDefs.forEach((colDef) => {
            const field = colDef.field
            if (field) {
              const cellKey = `${node.data.id}_${field}`
              if (this.modifiedCells.has(cellKey)) {
                console.log(`单元格 ${cellKey} 被标记为已修改`)
              }
            }
          })
        }
      })
    },
  },
})
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
