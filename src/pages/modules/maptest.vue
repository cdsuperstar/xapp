<template>
  <q-page padding>
    <!-- content -->
    <div id="container" style="width: 800px; height: 800px"></div>
  </q-page>
</template>

<script>
import { defineComponent, onBeforeUpdate, onMounted, ref } from "vue";
export default defineComponent({
  setup() {
    const longitude = ref(104.1605381);
    const latitude = ref(30.6866651);
    const geolocationData = ref(null);
    const currentLocation = ref(null);
    //添加信息窗口
    var opts = {
	      width : 200,     // 信息窗口宽度
	      height: 100,     // 信息窗口高度
	      title : "当前位置" , // 信息窗口标题
	      message:"这里是你的位置"
	    }
    var infoWindow = new BMap.InfoWindow("地址：" + currentLocation.value, opts);  // 创建信息窗口对象 

    //更新地理信息
    function getCurrentPosition() {
      console.log("getposistion start")
      //成功
      function getPositionSuccess(position) {
        console.log("suceess")
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
        geolocationData.value = {latitude: latitude.value, longitude: longitude.value}
        console.log('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
      }
      //失败
      function getPositionError(error){
        console.log("ErrorMessage" + error.message)
        console.log("ErrorCode" + error.code)
      }

      navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError);
      console.log("getposistion end")
    }

    function update(){
      infoWindow = new BMap.InfoWindow("地址：" + currentLocation.value, opts);
      console.log("update info")
    }

    function init(){
      let Bmap = window.BMapGL;
      var map = new BMap.Map("container");
      var point = new BMap.Point(longitude.value, latitude.value);
      map.centerAndZoom(point, 15);

  
      var geoc = new BMap.Geocoder();

      //添加标记在point的位置
      var marker = new BMap.Marker(point)
      map.addOverlay(marker); 

      
      geoc.getLocation(point, function(result){
        opts.message = result.address
        console.log(result)
        
        currentLocation.value = result.address + result.content.surround_poi.reduce((prev, current) =>
          prev.distance < current.distance ? prev : current
        ).name
        update()
      })
      

      
      console.log(opts)

      marker.addEventListener("click", function(){  
        console.log(infoWindow.message)        
		    map.openInfoWindow(infoWindow, point); //开启信息窗口
	    }); 
      map.enableScrollWheelZoom(true);
    }

    getCurrentPosition();

    onMounted(() => {
      init()
    });

  },
  components: {},
  // mounted() {
  //   this.init();
  // },
  // methods: {
  //   init() {
  //     let Bmap = window.BMapGL;
  //     var map = new BMap.Map("container");
  //     var point = new BMap.Point(104.1605381, 30.6866651);
  //     map.centerAndZoom(point, 16);
  //     map.enableScrollWheelZoom(true);
  //   },
  // },
});
</script>
<style scoped>
#allmap {
  width: 100%;
  height: 100%;
}
</style>