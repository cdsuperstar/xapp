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
        <draggable
          style="width: 2rem; height: 2rem"
          filter="ignore-elements"
          :list="droplist"
          :group="{
            name: 'dragmod',
          }"
        >
          <template #item="{ element }">
            <div :name="element.name"></div>
          </template>
          <template #footer>
            <q-card flat>
              <q-card-section horizontal align="center">
                <q-list padding>
                  <q-item-section
                    class="rounded-borders"
                    style="
                      width: 2rem;
                      height: 2rem;
                      border: 1px dashed #ebebeb;
                    "
                  >
                    <q-icon
                      name="delete_sweep"
                      color="blue-grey-4"
                      style="font-size: 2rem; padding: 5px"
                    ></q-icon>
                  </q-item-section>
                </q-list>
              </q-card-section>
            </q-card>
          </template>
        </draggable>
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
        <draggable
          class="row"
          style="width: 300px; min-height: 83px; margin-top: 5px"
          :list="modulelist"
          item-key="id"
          delay="1000"
          ghost-class="ghost"
          touchStartThreshold="5"
          :sort="true"
          :group="{
            name: 'dragmod',
          }"
          @change="dataunique"
          @remove="delmodu"
        >
          <template #item="{ element }">
            <q-card
              flat
              class="col-3"
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
          </template>
        </draggable>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="chart-list">
      <q-card-section>
        <ve-map :data="MapchartData" :settings="MapchartSettings"></ve-map>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="chart-list">
      <q-card-section>
        <ve-pie :data="PiechartData" :settings="PiechartSettings"></ve-pie>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="chart-list">
      <q-card-section>
        <ve-radar
          :data="VeRadarcharData"
          :settings="VeRadarchartSettings"
        ></ve-radar>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="chart-list">
      <q-card-section>
        <ve-line :data="LinechartData" :settings="LinechartSettings"></ve-line>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="chart-list">
      <q-card-section>
        <ve-histogram
          :data="HistogramchartData"
          :settings="HistogramchartSettings"
        ></ve-histogram>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
// import { mapState } from "vuex";
import { useZeroStore } from "stores/zero";
import draggable from "vuedraggable";
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
    draggable,
  },
  data() {
    return {
      usercfg: { quickapplication: [] },
      modlist: [],
      droplist: [],
      HistogramchartSettings: null,
      HistogramchartData: null,
      PiechartSettings: null,
      PiechartData: null,
      MapchartSettings: null,
      MapchartData: null,
      LinechartSettings: null,
      LinechartData: null,
      VeRadarcharData: null,
      VeRadarchartSettings: null,
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
  created() {
    this.HistogramchartSettings = {
      axisSite: { right: ["下单率"] },
      yAxisType: ["KMB", "percent"],
      yAxisName: ["数值", "比率"],
    };
    this.HistogramchartData = {
      columns: ["日期", "访问用户", "下单用户", "下单率"],
      rows: [
        { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
        { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
        { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
        { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
        { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
      ],
    };
    this.PiechartSettings = {
      dimension: "日期",
      metrics: "访问用户",
    };
    this.PiechartData = {
      columns: ["日期", "访问用户"],
      rows: [
        { 日期: "1/1", 访问用户: 1393 },
        { 日期: "1/2", 访问用户: 3530 },
        { 日期: "1/3", 访问用户: 2923 },
        { 日期: "1/4", 访问用户: 1723 },
        { 日期: "1/5", 访问用户: 3792 },
        { 日期: "1/6", 访问用户: 4593 },
      ],
    };
    this.MapchartSettings = {
      position: "province/sichuan",
      mapURLProfix: "assets/mapjson/",
      dimension: "位置",
      metrics: ["人口", "面积"],
      dataType: {
        面积: "KMB",
      },
    };
    this.MapchartData = {
      columns: ["位置", "税收", "人口", "面积"],
      rows: [
        { 位置: "成都市", 税收: 123, 人口: 123, 面积: 92134 },
        { 位置: "南充市", 税收: 1223, 人口: 2123, 面积: 29234 },
        { 位置: "广元市", 税收: 2123, 人口: 1243, 面积: 94234 },
        { 位置: "重庆", 税收: 2123, 人口: 1243, 面积: 94234 },
        { 位置: "上海", 税收: 2123, 人口: 1243, 面积: 94234 },
        { 位置: "浙江", 税收: 4123, 人口: 5123, 面积: 29234 },
      ],
    };
    this.LinechartSettings = {
      axisSite: { right: ["下单率"] },
      yAxisType: ["KMB", "percent"],
      yAxisName: ["数值", "比率"],
    };
    this.LinechartData = {
      columns: ["日期", "访问用户", "下单用户", "下单率"],
      rows: [
        { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
        { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
        { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
        { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
        { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
      ],
    };
    this.VeRadarchartSettings = {
      labelMap: {
        日期: "date",
        访问用户: "PV",
        下单用户: "Order",
        下单率: "orderRate",
      },
    };
    this.VeRadarcharData = {
      columns: ["日期", "访问用户", "下单用户", "下单率"],
      rows: [
        { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
        { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
        { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
        { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
        { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
      ],
    };
  },
  mounted() {
    // 返回菜单
    if (this.$auth.user().usercfg) {
      this.usercfg = JSON.parse(this.$auth.user().usercfg);
    }
  },
  beforeUnmount() {
    // 写入数据库
    if (this.$auth.check()) {
      let tmpUsercfg = JSON.parse(this.$auth.user().usercfg);
      if (tmpUsercfg === null) tmpUsercfg = {};
      tmpUsercfg.quickapplication = this.modulelist;
      if (tmpUsercfg.quickapplication !== null) {
        this.$api
          .post("/zero/setMyUsercfg/", {
            usercfg: JSON.stringify(tmpUsercfg),
          })
          .then((res) => {
            if (res.data.success) {
              this.$auth.user().usercfg = res.data.data.usercfg;
            }
          });
      }
    }
  },
  methods: {
    linktoURL(url) {
      location.href = "#/user/" + url;
    },
    dataunique(e) {
      if (e.added) {
        const obj = this.modulelist.filter(
          (obj) => obj.id === e.added.element.id
        );
        if (obj.length > 1) {
          this.modulelist.splice(e.added.newIndex, 1);
        } else {
          this.usercfg.quickapplication.push(e.added.element);
        }
      }
    },
    delmodu(evt) {
      this.usercfg.quickapplication.splice(evt.oldIndex, 1);
    },
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
