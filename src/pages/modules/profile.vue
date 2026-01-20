<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="DunitTree">
      <q-card class="q-dialog-plugin">
        <q-toolbar class="bg-primary text-white">
          <q-btn v-close-popup flat round dense icon="close" :title="this.$t('buttons.close')" />
          <q-toolbar-title>
            <span class="text-subtitle1 text-weight-bold"> {{ $t('units.showunittree') }}</span>
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
        <q-card-section style="min-height: 10vh; max-height: 80vh" class="scroll">
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
      {{ $t('auth.users.profile.pheader') }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="positive"
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
      <q-separator v-if="!$q.screen.gt.xs" class="col-10 q-ma-xs" color="info" />
      <q-btn
        v-if="mPermissions['profile.bsetunit']"
        color="negative"
        text-color="white"
        class="q-ma-xs"
        icon="apartment"
        :label="$t('buttons.setuit')"
        @click="Showunittree()"
      />
      <q-btn
        v-print="printObj"
        color="warning"
        text-color="white"
        class="q-ma-xs"
        icon="print"
        :label="$t('buttons.print')"
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
      <q-separator v-if="!$q.screen.gt.xs" class="col-10 q-ma-xs" color="info" />
    </div>
    <div id="printMe" class="shadow-1">
      <ag-grid-vue
        id="myGrid"
        style="width: 100%; height: 500px"
        class="ag-theme-balham Profile-agGrid"
        ref="profile_grid"
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
import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import agDateCellRender from '../frameworkComponents/agDateCellRender.vue'
import { defineComponent } from 'vue'
import { useZeroStore } from 'stores/zero'

export default defineComponent({
  name: 'Profile',
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
      defaultColDef: null,
      genders: this.$tm('auth.users.profile.sexoptions'),
      unitMap: {},
      mPermissions: [],
      printObj: {
        id: 'printMe',
        popTitle: '这里是标题区域，添加页眉和页脚才能看见！',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
      modifiedCells: new Map(), // 存储修改过的单元格
      // 用于存储 cellStyle 函数的闭包引用
      cellStyleFunctions: new Map(),
    }
  },
  setup() {
    const store = useZeroStore()
    return {
      store,
    }
  },
  created() {
    // 得到机构数据
    this.$api
      .get('/z_unit/')
      .then((res) => {
        if (res.data.success) {
          this.columnDefs[9].cellEditorParams.values = res.data.data.map(({ title, id }) =>
            id.toString(),
          )
          this.unitMap = res.data.data.reduce((acc, v) => {
            acc[v.id] = v.title
            return acc
          }, {})
          this.getunitdata()
        }
      })
      .catch((error) => {
        this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
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
          module: 'profile',
          name: 'profile.bsetunit',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null,
          },
          title: this.$t('auth.users.profile.bsetunit'),
        },
        {
          module: 'profile',
          name: 'profile.iManageUnit',
          syscfg: {
            required: false,
            type: 'number',
            default: null,
          },
          title: this.$t('auth.users.profile.bsetunitroot'),
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
      this.frameworkComponents = {
        agDateCellRender: agDateCellRender,
      }

      // 创建列定义
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
          headerName: this.$t('auth.users.profile.avatar'),
          field: 'avatar',
          width: 130,
          minWidth: 130,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('avatar'),
        },
        {
          headerName: this.$t('auth.users.profile.no'),
          field: 'no',
          width: 130,
          minWidth: 130,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('no'),
        },
        {
          headerName: this.$t('auth.users.profile.nickname'),
          field: 'name',
          width: 130,
          minWidth: 130,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('name'),
        },
        {
          headerName: this.$t('auth.users.profile.sex'),
          field: 'sex',
          width: 80,
          minWidth: 80,
          maxWidth: 80,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: Object.keys(this.$tm('auth.users.profile.sexoptions')),
          },
          valueFormatter: this.getSelector,
          cellStyle: this.createCellStyleFunction('sex'),
        },
        {
          headerName: this.$t('auth.users.profile.birthday'),
          field: 'birth',
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          editable: true,
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
          cellStyle: this.createCellStyleFunction('birth'),
        },
        {
          headerName: this.$t('auth.users.profile.position'),
          field: 'position',
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('position'),
        },
        {
          headerName: this.$t('auth.users.profile.title'),
          field: 'title',
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('title'),
        },
        {
          headerName: this.$t('auth.users.profile.jobs'),
          field: 'jobs',
          width: 100,
          minWidth: 100,
          maxWidth: 120,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('jobs'),
        },
        {
          headerName: this.$t('auth.users.profile.department'),
          field: 'unitid',
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: {},
          },
          valueFormatter: this.getUnitmap,
          cellRenderer: this.getUnitmap,
          cellStyle: this.createCellStyleFunction('unitid'),
        },
        {
          headerName: this.$t('auth.users.profile.phone1'),
          field: 'phone',
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('phone'),
        },
        {
          headerName: this.$t('auth.users.profile.phone2'),
          field: 'tel',
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('tel'),
        },
        {
          headerName: this.$t('auth.users.profile.address'),
          field: 'address',
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('address'),
        },
        {
          headerName: this.$t('auth.users.profile.remark'),
          field: 'memo',
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
          cellStyle: this.createCellStyleFunction('memo'),
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

    getunitdata() {
      this.$api
        .get('/profile/')
        .then((res) => {
          if (res.data.success) {
            if (process.env.DEV_LOG) {
              this.$zglobal.consoleLog(this, 'profile data:', res.data.data)
            }
            this.rowData = res.data.data
          }
        })
        .catch((error) => {
          this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
        })
    },

    onGridReady(params) {
      this.gridApi = params.api
      this.columnApi = params.columnApi
      params.api.refreshCells({
        force: true,
      })
      params.api.sizeColumnsToFit()
      if (this.quickFilter) {
        params.api.setQuickFilter(this.quickFilter)
      }
    },

    onQuickFilterChanged() {
      if (!this.gridApi) return
      this.gridApi.setQuickFilter(this.quickFilter)
    },

    getSelector(params) {
      return this.genders[params.value]
    },

    getUnitmap(params) {
      return this.unitMap[params.value]
    },

    ExportDataAsCVS() {
      if (!this.gridApi) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('operation.rowserror'))
        return
      }
      var params = {
        fileName: 'profiles.xls',
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
          return this.$api.post('/profile/', val).then((res) => {
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

          return this.$api.put('/profile/' + val.id, val).then((res) => {
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

    Showunittree() {
      if (!this.gridApi) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('operation.rowserror'))
        return
      }

      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 0) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('operation.rowserror'))
        return
      }

      // 开始处理
      this.DunitTree = true
      this.loading = true
      // 先得到登录用户的管理单位节点
      var node = null
      if (this.mPermissions['profile.iManageUnit']) {
        node = this.mPermissions['profile.iManageUnit']
      } else {
        if (this.store.ZPermissions.units.length >= 1) node = this.store.ZPermissions.units[0].id
      }

      this.$api
        .get('/z_unit/getTheUnitTree/' + node)
        .then((res) => {
          if (res.data.success) {
            this.loading = false
            this.Unitdata = res.data.data

            // 得到选定用户的机构值
            if (selectedData[0].id) {
              this.$api
                .get('/users/getUserUnit/' + selectedData[0].id)
                .then((resmy) => {
                  if (resmy.data.success) {
                    this.unitticked = resmy.data.data.map(({ id }) => id)[0]
                  }
                })
                .catch((error) => {
                  this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
                })
            }
            this.$zglobal.showMessage('positive', 'center', this.$t('operation.getdatasuccess'))
          } else {
            this.loading = false
            this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
          }
        })
        .catch((error) => {
          this.loading = false
          if (error.status) {
            this.$zglobal.showMessage('red-5', 'center', this.$t('auth.register.invalid_data'))
          } else {
            this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
          }
        })
    },

    Editusertounit() {
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 0) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('operation.rowserror'))
        return
      }

      if (!this.unitticked) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('operation.rowserror'))
        return
      }

      var selectarr = selectedData.map(({ name, id }) => id)
      this.$api
        .post('/users/setUserUnit/', {
          users: selectarr,
          units: [this.unitticked],
        })
        .then((res) => {
          if (res.data.success) {
            this.$zglobal.showMessage(
              'positive',
              'center',
              this.$t('success') + ':' + res.data.data,
            )
            this.getunitdata()
            this.DunitTree = false
          } else {
            this.$zglobal.showMessage('red-7', 'center', this.$t('failed'))
          }
        })
        .catch((error) => {
          this.loading = false
          if (error.status) {
            this.$zglobal.showMessage('red-5', 'center', this.$t('auth.register.invalid_data'))
          } else {
            this.$zglobal.showMessage('red-7', 'center', this.$t('operation.updatefailed'))
          }
        })
    },
  },
})
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

@media print {
  .Profile-agGrid {
    /* 让 ag-grid 在打印时自动进入打印布局 */
    --ag-internal-dom-layout: print;
  }

  /* 打印时避免分页区域占版面（按需保留/删除） */
  .Profile-agGrid .ag-paging-panel {
    display: none !important;
  }
}
</style>
