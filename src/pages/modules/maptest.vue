<template>
  <q-page padding>
    <!-- content -->
    <div id="container" style="width: 800px; height: 800px"></div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
  components: {},
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
