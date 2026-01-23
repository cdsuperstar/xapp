import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useZeroStore = defineStore('zero', {
  state: () => ({
    ZModules: [],
    ZPermissions: [],
    ZUIcfg: {},
    // 用户消息
    ZUserMsg: [],
    // 访问历史
    ZOptHist: [],
  }),
  persist: true,
  getters: {},
  actions: {
    // 得到树形结构
    getZModules() {
      return new Promise((resolve, reject) => {
        this.api
          .get('/z_module/getMyMenu')
          .then((res) => {
            if (res.data.success) {
              this.ZModules = res.data.data
              resolve(res)
            } else {
              reject(res.data.errors)
            }
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    // 取得当前用户权限
    reqThePermission(payload) {
      let aReqs = []
      if (Array.isArray(payload)) {
        aReqs = payload
      } else {
        aReqs.push(payload)
      }
      const aCfgs = []
      // 判断库里是否有权限
      aReqs.forEach(function (iReq) {
        const perm = this.ZPermissions.perms.filter(function (el) {
          return el.name === iReq.name
        })

        if (perm[0] === undefined) {
          iReq.syscfg = JSON.stringify(iReq.syscfg)
          api
            .post('/zero/reqThePermission', iReq)
            .then((res) => {
              if (res.data.success) {
                this.ZPermissions.perms.push(res.data.data)
              } else {
                /* empty */
              }
            })
            .catch((e) => {})
        }
      }, this)

      aReqs.forEach(function (iReq) {
        const module = this.ZPermissions.modules.filter(function (el) {
          return el.name === iReq.module
        })

        const cfg = this.ZPermissions.data.filter(function (el) {
          return el.name === iReq.name
        })

        if (cfg[0] !== undefined) {
          const tCfg = cfg[0].pivot === undefined ? null : JSON.parse(cfg[0].pivot.usrcfg)
          aCfgs[cfg[0].name] = tCfg
        }
        if (module[0].name) {
          aCfgs[module[0].name] = module[0] === undefined ? null : module[0]
        }
      }, this)

      return new Promise((resolve, reject) => {
        resolve(aCfgs)
      })
    },
    getMyPermissions(payload) {
      return new Promise((resolve, reject) => {
        api
          .post('/zero/getMyPermissions', payload)
          .then((res) => {
            if (res.data.success) {
              this.ZPermissions = res.data
              resolve(res.data)
            } else {
              reject(false)
            }
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    setZOptHist(payload) {
      return new Promise((resolve, reject) => {
        if (
          !this.ZOptHist.includes(payload) &&
          payload !== 'not-found' &&
          payload !== 'dashboard'
        ) {
          const index = this.ZOptHist.findIndex((text) => text.name === payload)
          if (index !== -1) {
            this.ZOptHist.splice(index, 1)
          }
          let histmodel = []
          if (this.ZPermissions.modules !== undefined) {
            histmodel = this.ZPermissions.modules?.filter((obj) => payload === obj.name)
          }
          if (histmodel[0] !== undefined) this.ZOptHist.unshift(histmodel[0])
        }
      })
    },
  },
})
