<template>
  <q-page padding class="q-pa-ma">
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('roles.header') }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <!-- 使用内置色板，避免自定义主题未加载时按钮呈现"白字白底" -->
      <q-btn
        v-if="mPermissions['role.badd']"
        color="primary"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
      />
      <q-btn
        v-if="mPermissions['role.bDelete']"
        color="negative"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        v-if="mPermissions['role.bmodify']"
        color="positive"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="saveItems()"
      />
      <q-separator v-if="!$q.screen.gt.xs" class="col-10 q-ma-xs" color="info" />
      <q-btn
        v-if="mPermissions['role.bSetTree']"
        color="warning"
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
      <q-separator v-if="!$q.screen.gt.xs" class="col-10 q-ma-xs" color="info" />
    </div>
    <div class="row q-ma-md">
      <div class="col-md-5">
        <ag-grid-vue
          style="width: 100%; height: 500px"
          class="ag-theme-balham Role-agGrid"
          ref="roles_grid"
          :grid-options="gridOptions"
          :column-defs="columnDefs"
          :row-data="rowData"
          :default-col-def="defaultColDef"
          :pagination="true"
          :pagination-page-size="50"
          :get-row-style="getRowStyle"
          :locale-text="$tm('aggrid')"
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
                {{ $t('roles.editroleltree') }} [{{ rolename }}]</span
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
          <q-card-section style="min-height: 10vh; max-height: 80vh" class="scroll">
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
import { useZeroStore } from 'stores/zero'
import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Roles',
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
      defaultColDef: null,
      mPermissions: [],
      // 新增：存储修改过的单元格
      modifiedCells: new Map(),
      // 新增：存储 cellStyle 函数的闭包引用
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
      .get('/z_role/getSelfOrLowRoles/' + this.store.ZPermissions?.currectrole?.id)
      .then((res) => {
        if (res.data.success) {
          this.rowData = res.data.data
        }
      })
      .catch((e) => {
        this.$zglobal.showMessage('negative', 'center', this.$t('operation.loadFailed'))
      })
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
          module: 'role',
          name: 'role.badd',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('roles.badd'),
        },
        {
          module: 'role',
          name: 'role.bDelete',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('roles.bDelete'),
        },
        {
          module: 'role',
          name: 'role.bmodify',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('roles.bmodify'),
        },
        {
          module: 'role',
          name: 'role.bSetTree',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('roles.bSetTree'),
        },
      ]
      this.store
        .reqThePermission(preq)
        .then((res) => {
          this.mPermissions = res
        })
        .catch((e) => {
          this.$zglobal.showMessage('negative', 'center', this.$t('operation.permissionLoadFailed'))
        })
    },
    initGrid() {
      this.gridOptions = {
        theme: 'legacy',
        rowHeight: 32,
        headerHeight: 32,
        allowShowChangeAfterFilter: true,
        rowSelection: {
          mode: 'singleRow',
          checkboxes: true,
          enableSelectionWithoutKeys: true,
        },
        // 启用单元格重新渲染，确保样式更新
        suppressCellSelection: true,
        enableCellChangeFlash: true,
      }
      this.columnDefs = [
        {
          headerName: 'ID',
          field: 'id',
          width: 70,
          minWidth: 70,
          maxWidth: 70,
          sortable: true,
          editable: false,
        },
        {
          headerName: this.$t('roles.name'),
          field: 'name',
          width: 100,
          minWidth: 100,
          maxWidth: 130,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('name'),
        },
        {
          headerName: this.$t('roles.title'),
          field: 'title',
          width: 120,
          minWidth: 120,
          maxWidth: 260,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('title'),
        },
      ]
      this.defaultColDef = {
        editable: true,
        resizable: true,
      }
      this.getRowStyle = () => null // 不再使用行级样式，改为单元格级样式
    },

    // 新增：创建 cellStyle 函数
    createCellStyleFunction(field) {
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

      this.cellStyleFunctions.set(field, styleFunction)
      return styleFunction
    },

    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
      params.api.sizeColumnsToFit()
    },

    onQuickFilterChanged() {
      if (this.gridApi) {
        this.gridApi.setQuickFilter(this.quickFilter)
      }
    },

    delItems() {
      if (!this.gridApi) {
        this.$zglobal.showMessage('red-5', 'center', '表格尚未初始化，请稍候再试')
        return
      }

      const selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 0) {
        this.$zglobal.showMessage('info', 'center', this.$t('modules.noSelection'))
        return
      }

      this.$q
        .dialog({
          title: this.$t('buttons.comfirmtitle'),
          message: this.$t('buttons.comfirmdialog'),
          html: true,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          const promises = selectedData.map((val) => {
            if (!val.id) return Promise.resolve()

            // 清除该行的修改标记
            this.clearModifiedCellsForRow(val.id)

            return this.$api
              .delete('/z_role/' + val.id)
              .then((res) => {
                if (res.data.success) {
                  this.gridApi.applyTransaction({ remove: [val] })
                  this.$zglobal.showMessage('positive', 'center', this.$t('operation.delsuccess'))
                  return { success: true }
                } else {
                  this.$zglobal.showMessage('red-7', 'center', this.$t('operation.delfailed'))
                  return { success: false }
                }
              })
              .catch((e) => {
                this.$zglobal.showMessage('negative', 'center', this.$t('operation.deleteError'))
                return { success: false }
              })
          })

          Promise.all(promises)
            .then(() => {
              this.gridApi.deselectAll()
            })
            .catch((error) => {
              console.error('删除操作错误:', error)
            })
        })
        .onCancel(() => {
          // 用户取消操作
        })
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
          } else {
            // 对于没有id的新增行，显示不同提示
            this.$zglobal.showMessage('info', 'center', this.$t('operation.newRowModified'))
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
      if (!this.gridApi) {
        this.$zglobal.showMessage('red-5', 'center', '表格尚未初始化，请稍候再试')
        return
      }

      const newItems = [{}]
      this.gridApi.applyTransaction({ add: newItems })
      this.$zglobal.showMessage('info', 'center', this.$t('operation.rowAdded'))
    },

    saveItems() {
      if (!this.gridApi) {
        this.$zglobal.showMessage('red-5', 'center', '表格尚未初始化，请稍候再试')
        return
      }

      const selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 0) {
        this.$zglobal.showMessage('info', 'center', this.$t('modules.noSelection'))
        return
      }

      // 收集需要刷新的行节点和列
      const nodesToRefresh = []
      const allRowIdsToClear = []
      const columnIdsToRefresh = new Set()

      const promises = selectedData.map((val) => {
        if (!val.id) {
          // 新增行
          return this.$api
            .post('/z_role', val)
            .then((res) => {
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
            .catch((e) => {
              this.$zglobal.showMessage('negative', 'center', this.$t('operation.addError'))
              return { success: false }
            })
        } else {
          // 更新行
          allRowIdsToClear.push(val.id)

          // 查找该行修改过的所有列
          this.gridApi.forEachNode((node) => {
            if (node.data && node.data.id === val.id) {
              nodesToRefresh.push(node)

              // 检查该行所有可编辑列是否被修改过
              this.columnDefs.forEach((colDef) => {
                if (colDef.field && colDef.field !== 'id') {
                  const cellKey = `${val.id}_${colDef.field}`
                  if (this.modifiedCells.has(cellKey)) {
                    columnIdsToRefresh.add(colDef.field)
                  }
                }
              })
            }
          })

          return this.$api
            .put('/z_role/' + val.id, val)
            .then((res) => {
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
            .catch((e) => {
              this.$zglobal.showMessage('negative', 'center', this.$t('operation.updateError'))
              return { success: false }
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
            if (columnIdsToRefresh.size > 0) {
              const uniqueColumns = Array.from(columnIdsToRefresh)
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

            // 额外确保样式重新计算
            setTimeout(() => {
              this.gridApi.redrawRows({ rowNodes: nodesToRefresh })
            }, 100)
          } else {
            this.gridApi.refreshCells({ force: true })
          }

          // 清除选中状态
          this.gridApi.deselectAll()
        })
        .catch((error) => {
          console.error('保存操作错误:', error)
          this.$zglobal.showMessage('negative', 'center', this.$t('operation.saveError'))
        })
    },

    // 清除某行的修改标记（增强版）
    clearModifiedCellsForRow(rowId) {
      if (!rowId) return

      // 收集需要删除的键和对应的字段
      const keysToDelete = []
      const fieldsToRefresh = new Set()

      this.modifiedCells.forEach((value, key) => {
        if (key.startsWith(`${rowId}_`)) {
          keysToDelete.push(key)
          // 提取字段名
          const parts = key.split('_')
          if (parts.length > 1) {
            fieldsToRefresh.add(parts.slice(1).join('_'))
          }
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

      // 找到对应的行节点
      let targetNode = null
      this.gridApi.forEachNode((node) => {
        if (node.data && node.data.id === rowId) {
          targetNode = node
        }
      })

      if (targetNode) {
        // 刷新特定字段的单元格
        if (fieldsToRefresh.size > 0) {
          this.gridApi.refreshCells({
            rowNodes: [targetNode],
            columns: Array.from(fieldsToRefresh),
            force: true,
          })

          // 额外确保样式重新计算
          setTimeout(() => {
            this.gridApi.redrawRows({ rowNodes: [targetNode] })
          }, 50)
        }
      }
    },

    ShowUnittree() {
      if (!this.gridApi) {
        this.$zglobal.showMessage('red-5', 'center', '表格尚未初始化，请稍候再试')
        return
      }

      const selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length !== 1 || !selectedData[0].id) {
        this.$zglobal.showMessage('red-5', 'center', this.$t('operation.rowserror'))
        return
      }

      this.roleeditsign = true
      this.loading = true
      this.rolename = selectedData[0].name
      this.Roledata = this.store.ZPermissions.moduletree

      this.$nextTick(() => {
        if (this.$refs.myroletree) {
          this.$refs.myroletree.setExpanded(1, true)
        }
      })

      this.$api
        .get('/zero/getRoleModules/' + selectedData[0].id)
        .then((resmy) => {
          if (resmy.data.success) {
            this.roleticked = resmy.data.data
            this.$zglobal.showMessage('positive', 'center', this.$t('roles.getrowssuccess'))
          } else {
            this.$zglobal.showMessage('warning', 'center', this.$t('operation.loadModuleFailed'))
          }
        })
        .catch((e) => {
          this.$zglobal.showMessage('negative', 'center', this.$t('operation.loadModuleError'))
        })
        .finally(() => {
          this.loading = false
        })
    },

    EditUnittree() {
      if (!this.gridApi) {
        this.$zglobal.showMessage('red-5', 'center', '表格尚未初始化，请稍候再试')
        return
      }

      const selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length !== 1 || !selectedData[0].id) {
        this.$zglobal.showMessage('red-5', 'center', this.$t('operation.rowserror'))
        return
      }

      this.loading = true

      this.$api
        .post('/zero/setRoleModules/' + selectedData[0].id, {
          modules: this.roleticked,
        })
        .then((res) => {
          if (res.data.success) {
            this.roleeditsign = false
            this.$zglobal.showMessage(
              'positive',
              'center',
              this.$t('success') + ':' + res.data.data,
            )

            // 刷新当前用户的权限
            this.store.getMyPermissions({
              role: this.store.ZPermissions?.currectrole?.name,
            })
          } else {
            this.$zglobal.showMessage('negative', 'center', this.$t('operation.saveTreeFailed'))
          }
        })
        .catch((error) => {
          this.$zglobal.showMessage('negative', 'center', this.$t('operation.saveTreeError'))
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
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

/* 确保修改过的单元格样式优先级正确 */
.ag-cell.ag-cell-not-inline-editing {
  transition: background-color 0.3s ease;
}
</style>
