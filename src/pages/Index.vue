<template>
  <q-page class="q-pa-lg row items-start q-gutter-md">
    <q-card flat bordered class="chart-list">
      <q-toolbar style="border-bottom: 1px dashed #ebebeb">
        <q-toolbar-title>
          <span class="text-subtitle1 text-weight-bold">
            {{ $t("comapplication.header") }}</span
          >
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
      <q-card-section
        class="row items-start"
        style="
          min-height: 60px;
          max-height: 335px;
          padding: 8px;
          overflow-y: auto;
        "
      >
        <!-- 暂时禁用 draggable，避免 Vue 3 兼容性问题 -->
        <div v-if="modulelist.length === 0" class="text-grey-6 q-pa-md">
          {{ $t("comapplication.no_modules") || "暂无快捷应用模块" }}
        </div>
        <template v-else>
          <div
            v-for="element in modulelist"
            :key="element.id"
            class="col-3"
            style="margin: 5px"
          >
            <q-card
              flat
              style="cursor: pointer"
              @click="linktoURL(element.url)"
            >
              <q-card-section horizontal align="center">
                <q-list padding>
                  <q-item-section
                    class="rounded-borders bg-primary"
                    style="width: 3rem; height: 3rem"
                  >
                    <q-icon
                      :name="element.icon"
                      color="white"
                      style="font-size: 2rem; padding: 5px"
                    ></q-icon>
                  </q-item-section>
                  <q-item-section style="margin-left: 1px; font-size: xx-small">
                    {{ element.title }}
                  </q-item-section>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-card-section>
    </q-card>
    <!-- 图表组件暂时移除，避免未注册组件导致开发者模式无法正常进入首页 -->
  </q-page>
</template>

<script>
// import { mapState } from "vuex";
import { useZeroStore } from "stores/zero";
// import draggable from "vuedraggable"; // 暂时禁用，v4.1.0 与 Vue 3 存在兼容性问题
import { defineComponent } from "vue";
// import VeRadar from "v-charts/lib/radar.common.js";
// import VePie from "v-charts/lib/pie.common.js";
// import VeMap from "v-charts/lib/map.common.js";
// import VeHistogram from "v-charts/lib/histogram.common.js";
// import VeLine from "v-charts/lib/line.common.js";

// branch test
export default defineComponent({
  name: "PageIndex",
  components: {
    // VeHistogram,
    // VePie,
    // VeMap,
    // VeLine,
    // VeRadar,
    // draggable, // 暂时禁用，v4.1.0 与 Vue 3 存在兼容性问题
  },
  data() {
    return {
      usercfg: { quickapplication: [] },
      // 以下数据已注释，因为相关图表组件已被禁用
      // modlist: [],
      // droplist: [],
      // HistogramchartSettings: null,
      // HistogramchartData: null,
      // PiechartSettings: null,
      // PiechartData: null,
      // MapchartSettings: null,
      // MapchartData: null,
      // LinechartSettings: null,
      // LinechartData: null,
      // VeRadarcharData: null,
      // VeRadarchartSettings: null,
    };
  },
  setup() {
    const store = useZeroStore();

    return {
      store,
    };
  },
  computed: {
    modulelist: {
      get: function () {
        let tmpObjs = [];
        if (
          this.usercfg?.quickapplication !== undefined &&
          this.store.ZPermissions?.modules !== undefined
        ) {
          tmpObjs = this.usercfg.quickapplication.filter(
            (obj) =>
              this.store.ZPermissions.modules.filter((ob) => ob.id === obj.id)
                .length === 1
          );
        }
        return tmpObjs;
      },
      set: function (value) {
        // console.log(value)
      },
    },
  },
  // created() 生命周期钩子已移除，因为相关图表数据不再使用
  // 如果将来需要恢复图表功能，可以取消注释 created() 和相关数据
  mounted() {
    // 加载用户配置
    if (this.$auth.check() && this.$auth.user()) {
      try {
        if (this.$auth.user().usercfg) {
          const parsed = JSON.parse(this.$auth.user().usercfg);
          this.usercfg = parsed || { quickapplication: [] };
        }
      } catch (error) {
        console.error('解析用户配置失败:', error);
        this.usercfg = { quickapplication: [] };
      }
    }
  },
  beforeUnmount() {
    // 写入数据库
    if (this.$auth.check() && this.$auth.user()) {
      try {
        let tmpUsercfg = {};
        // 安全地解析 usercfg
        if (this.$auth.user().usercfg) {
          const parsed = JSON.parse(this.$auth.user().usercfg);
          tmpUsercfg = parsed || {};
        }
        // 更新快捷应用列表
        tmpUsercfg.quickapplication = this.modulelist || [];
        // 保存到服务器
        this.$api
          .post("/zero/setMyUsercfg/", {
            usercfg: JSON.stringify(tmpUsercfg),
          })
          .then((res) => {
            if (res.data && res.data.success && res.data.data) {
              this.$auth.user().usercfg = res.data.data.usercfg;
            }
          })
          .catch((err) => {
            console.error('保存用户配置失败:', err);
          });
      } catch (error) {
        console.error('解析用户配置失败:', error);
      }
    }
  },
  methods: {
    linktoURL(url) {
      // 使用 Vue Router 进行路由跳转，而不是直接操作 location.href
      if (url) {
        this.$router.push("/user/" + url).catch((err) => {
          // 忽略重复导航错误
          if (err.name !== 'NavigationDuplicated') {
            console.error('路由跳转失败:', err);
          }
        });
      }
    },
    // 以下方法已注释，因为 draggable 组件已被禁用
    // 如果将来需要恢复拖拽功能，可以取消注释这些方法
    // dataunique(e) {
    //   if (e.added) {
    //     const obj = this.modulelist.filter(
    //       (obj) => obj.id === e.added.element.id
    //     );
    //     if (obj.length > 1) {
    //       this.modulelist.splice(e.added.newIndex, 1);
    //     } else {
    //       this.usercfg.quickapplication.push(e.added.element);
    //     }
    //   }
    // },
    // delmodu(evt) {
    //   this.usercfg.quickapplication.splice(evt.oldIndex, 1);
    // },
  },
});
</script>
<style scoped>
.chart-list {
  margin: 20px auto;
  width: 350px;
  height: 400px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
