<template>
  <q-page padding>
    <!-- content -->
    <div id="container" style="width: 800px; height: 800px"></div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  setup() {
    onMounted(() => {
      //   loadMapScript(); // 加载百度地图资源
      // init();
    });
    // 初始化地图
    // const init = () => {
    //   let Bmap = window.BMapGL;
    //   var b = new Bmap.Map("allmap");
    //   b.centerAndZoom(new Bmap.Point(114.048529, 22.757597), 13);
    //   b.enableScrollWheelZoom(true);
    //   var a = ["114.066392,22.748699", "114.07991,22.640074"];
    //   // b.setMapStyleV2({ styleJson: echartsMapList })
    // };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let Bmap = window.BMapGL;
      var map = new BMap.Map("container");
      var point = new BMap.Point(104.1605381, 30.6866651);
      map.centerAndZoom(point, 16);
      map.enableScrollWheelZoom(true);
    },
  },
});
</script>
<style scoped>
#allmap {
  width: 100%;
  height: 100%;
}
</style>
