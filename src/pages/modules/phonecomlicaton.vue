<template>
  <q-page padding class="q-pa-lg row items-start q-gutter-md">
    <q-card class="col-12 chart-list" flat bordered>
      <q-toolbar style="border-bottom: 1px dashed #ebebeb">
        <q-toolbar-title>
          <span class="text-subtitle1 text-weight-bold"> 移动设备状态</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <q-item style="padding: 4px 4px">
          <q-item-section avatar style="padding-right: 4px; min-width: 35px">
            <q-icon color="primary" name="double_arrow" />
          </q-item-section>
          <q-item-section>
            纬度：{{ latitude }} 经度：{{ longitude }}
          </q-item-section>
        </q-item>
        <q-separator spaced inset="item" style="
            margin-left: 30px;
            width: calc(100% - 30px);
            margin-top: 1px;
            margin-bottom: 1px;
          " />
        <q-item style="padding: 4px 4px">
          <q-item-section avatar style="padding-right: 4px; min-width: 35px">
            <q-icon color="primary" name="double_arrow" />
          </q-item-section>
          <q-item-section> 网络状态：{{ netstate }} </q-item-section>
          <q-item-section>
            <q-btn outline color="warning" icon="fiber_smart_record" label="开始"
            @click="checkConnection" /> 
          </q-item-section>
        </q-item>
        <q-separator spaced inset="item" style="
            margin-left: 30px;
            width: calc(100% - 30px);
            margin-top: 1px;
            margin-bottom: 1px;
          " />
        <q-item style="padding: 4px 4px">
          <q-item-section avatar style="padding-right: 4px; min-width: 35px">
            <q-icon color="primary" name="double_arrow" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              电池状态：{{ batteryStatus }} &nbsp;&nbsp;
              <div v-if="batteryStatus.plugged">-- 充电中...</div>
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced inset="item" style="
            margin-left: 30px;
            width: calc(100% - 30px);
            margin-top: 1px;
            margin-bottom: 1px;
          " />
        <q-item style="padding: 4px 4px">
          <q-item-section avatar style="padding-right: 4px; min-width: 35px">
            <q-icon color="primary" name="double_arrow" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              IMEI: {{ imei }} &nbsp;&nbsp;
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced inset="item" style="
            margin-left: 30px;
            width: calc(100% - 30px);
            margin-top: 1px;
            margin-bottom: 1px;
          " />
      </q-card-section>
    </q-card>
    <q-card class="col-12 chart-list" flat bordered>
      <q-toolbar style="border-bottom: 1px dashed #ebebeb">
        <q-toolbar-title dense>
          <span class="text-subtitle1 text-weight-bold"> 录音/播放功能</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="row items-start q-gutter-md">
        <div class="text-caption">录音功能</div>
        <q-btn-group outline>
          <q-btn outline color="warning" icon="fiber_smart_record" label="开始" :disable="!recordStatus"
            @click="getRecord(1)" />  
          <q-btn outline color="primary" icon="pause" label="暂停" :disable="!recordPauseStatus" @click="getRecord(2)" />
          <q-btn outline color="primary" icon="play_circle_outline" label="继续" :disable="recordPauseStatus"
            @click="getRecord(3)" />
          <q-btn outline color="primary" icon="stop" label="停止" :disable="recordStatus" @click="getRecord(4)" />
        </q-btn-group>
      </q-card-section>
      <q-card-section class="row items-start q-gutter-md">
        <div class="text-caption">播放功能</div>
        <q-btn-group outline>
          <q-btn outline color="warning" icon="play_arrow" label="开始" :disable="!playstatus" @click="playAudio(1)" />
          <q-btn outline color="primary" icon="pause" label="暂停" :disable="playstatus" @click="playAudio(2)" />
          <q-btn outline color="primary" icon="stop" label="停止" :disable="playstatus" @click="playAudio(3)" />
        </q-btn-group>
      </q-card-section>
      <q-card-section class="scroll" style="border-top: 1px dashed #ebebeb">
        <div v-if="soundstatus">{{ soundstatus }}</div>
      </q-card-section>
    </q-card>
    <q-card class="col-12 chart-list" flat bordered>
      <q-toolbar style="border-bottom: 1px dashed #ebebeb">
        <q-toolbar-title dense>
          <span class="text-subtitle1 text-weight-bold"> 基础功能</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="row items-start q-gutter-md scroll">
        <q-btn flat color="primary" icon="add_a_photo" label=" - 拍照 - " @click="captureImage" />

        <img :src="imageSrc">
        <q-btn flat color="primary" icon="videocam" label=" - 录像 - " @click="captureVideo" />
      </q-card-section>
      <q-card-section class="row items-start q-gutter-md">
        <q-btn flat color="primary" icon="crop_free" label=" - 二维码/条码扫描 - " @click="barcodescan" />
      </q-card-section>
      <q-card-section class="scroll" style="border-top: 1px dashed #ebebeb">
        <div v-if="divstatus">{{ divstatus }}</div>
        
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, onBeforeUnmount} from 'vue'

export default {
  name: "Phonecomlicaton",
  components: {},
  data() {
    return {
      positioneexpanded: true,
      //netstate: null,
      //batterystatus: null,
      //batterystatusisPlugged: null,
      //mediaRec: null,
      //mediaPlay: null,
      //playstatus: true,
      //recordstatus: true,
      //recordpausestatus: true,
      //divstatus: null,
      //soundstatus: null,
      // // 纬度
      // latitude: null,
      // // 经度
      // longitude: null,
    };
  },
  setup() {
    //变量
    const batteryStatus = ref('determining...') //电池状态
    const $q = useQuasar()
    const imageSrc = ref('') //图片路径
    const divstatus = ref(null) //设备信息
    // 纬度
    const latitude = ref(null)
    // 经度
    const longitude = ref(null)

    //录音
    const soundstatus = ref()
    const mediaRec = ref(null)
    const mediaPlay =ref(null)
    const recordPauseStatus = ref(null)
    const recordStatus = ref(true)
    const playstatus = ref(true)
    
    //网络
    const netstate = ref(null)

    //--------------------------Functions----------------------------
    //二维码扫描
    function barcodescanresult(result){
      divstatus.value = 
        "扫描结果\n" +
        "类型:[ " +
        result.format +
        "]\n" +
        "内容: " +
        result.text +
        "\n" +
        "是否取消: " +
        result.cancelled
    }

    function barcodescan(){
      cordova.plugins.barcodeScanner.scan(
        barcodescanresult,
        function(error) {
          alert("扫描失败: " + error);
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: "请把二维码置于摄像区域...", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          // formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
          // direction:"landscape",//  仅Android（portrait | landscape），默认未设置，因此会随设备旋转
          disableAnimations: true, // iOS
          disableSuccessBeep: true, // iOS and Android
        }
      );
      if($auth.user().usercfg) {
        const tmpa = JSON.parse($auth.user().usercfg);
        barcodetype = tmpa.barcode.format;
        barcodetext = tmpa.barcode.text;
      }
    }
    //联网
    function checkConnection() {
      const networkState = ref(navigator.connection.type)
      const status = ref({
        unknown: "未知网络连接",
        ethernet: "以太网连接",
        wifi: "WIFI 网络连接",
        "2g": "2G 网络连接",
        "3g": "3G 网络连接",
        "4g": "4G 网络连接",
        cell: "蜂窝数据连接",
        none: "无网络连接",
      })
      netstate.value = status.value[networkState.value]
    }
    checkConnection()

    //拍摄照片
    function captureImage() {
      //成功
      function picturesuccess(imageData) {
        // imageURI imageData
        divstatus.value = "返回的数据:" + imageData;
        alert('调用相册返回的数据:' + imageData)
        console.log("拍摄成功")
        // //使用FileTransfer上传到服务器
        // var options = new FileUploadOptions() // 文件参数选项
        // options.fileKey = 'file' // 向服务端传递的file参数的parameter name
        // options.fileName = imageData.substr(
        //   imageData.lastIndexOf('/'),
        //   imageData.lastIndexOf('?') - imageData.lastIndexOf('/')
        // ) // 文件名一般返回的是app在手机的对应包下的缓存目录+?时间戳
        // options.mimeType = 'image/jpeg' // 文件格式，默认为image/jpeg
        // var ft = new FileTransfer() // 文件上传类
        // ft.upload(
        //   imageData,
        //   encodeURI(
        //     'http://192.168.0.4:8080/baas/mychat/messageTransform/uploadPicForUri'
        //   ),
        //   // 服务器处理该请求的地址，此处为本人的wex5baas的action地址
        //   function(success) {}, // 成功回调
        //   function(error) {}, // 失败回调
        //   options
        // )
      }
      //失败
      function onLoadImageFail(error) {
        // console.log('调用相册失败的消息：' + error)
        alert("拍摄失败：" + error);
      }
      //执行
      navigator.camera.getPicture(picturesuccess, onLoadImageFail, {
        destinationType: navigator.camera.DestinationType.FILE_URI,
        // 返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI （在andorid中 FILE_URI和NATIVE_URI返回的结果是一样的）
        quality: 80, // 图片质量  0-100
        targetWidth: 800, // 照片宽度
        targetHeight: 600, // 照片高度
        saveToPhotoAlbum: true, // 保存到手机相册
        encodingType: navigator.camera.EncodingType.JPEG, // 保存的图片格式： JPEG = 0, PNG = 1
        allowEdit: false, // 选择之前允许修改截图
        cameraDirection: 0, // 前后摄像头类型：Back= 0,Front-facing = 1
        // sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        // // 从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        // mediaType: 0
        // // 可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      })
    }

    //拍摄视频
    function captureVideo(){
      //成功
      function capturesuccess(mediaFiles){
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        divstatus.value =
          "拍摄成功！\n" +
          "名称：" +
          mediaFiles[i].name +
          "\n" +
          "大小：" +
          mediaFiles[i].size +
          "\n" +
          "本地URL：" +
          mediaFiles[i].localURL +
          "\n" +
          "路径：" +
          path;
        }
      }
      //失败
      function onCaptureError(error) {
        alert("拍摄失败：" + error);
      }

      //执行
      // duration参数为最长录制时间
      navigator.device.capture.captureVideo(capturesuccess, onCaptureError, {
        duration: 20,
      })
    }
    
    //更新电池信息
    function updateBatteryStatus (status) {
      console.log("enter")
      batteryStatus.value = `Level: ${status.level}, plugged: ${status.isPlugged}`
    }

    //更新地理信息
    function getCurrentPosition() {
      console.log("getposistion start")
      //成功
      function getPositionSuccess(position) {
        console.log("suceess")
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
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

    //媒体播放

    //录音
    function getRecord(val){
      console.log(imei.value)
      function getRecordSuccess(){
        //navigator.notification.beep(1);
        soundstatus.value = "录音成功……"; 
      }
      function getRecordFaild(err){
        soundstatus.value = "录音失败：" + err.code + err.message;
      }
      var path;
      var fileName = "myrecording.mp3"
      soundstatus.value = "平台为:Android；设备名称：" + window.device.model;
      path = cordova.file.externalRootDirectory + "Android/data/org.xapp/files/" + fileName;
      console.log("record: "+cordova.file)

      if(mediaRec.value === null){
        mediaRec.value = new Media(
          path,
          getRecordSuccess,
          getRecordFaild
        );
      }

      console.log(val)

      switch (val) {
        case 1:
          if(mediaRec.value){
            mediaRec.value.startRecord();
            //navigator.notification.beep(1);
          }
          recordStatus.value = false;
          soundstatus.value  = soundstatus.value + "<br>开始录音……";
          break;
        case 2:
          if(mediaRec.value){
            mediaRec.value.pauseRecord()
          }
          recordPauseStatus.value = false;
          soundstatus.value = "暂停录音……";
          break;
        case 3:
          if (mediaRec.value) {
            mediaRec.value.resumeRecord();
          }
          recordPauseStatus.value = true;
          soundstatus.value = "恢复录音……";
          break;
        case 4:
          if (mediaRec.value) {
            mediaRec.value.stopRecord();
            mediaRec.value.release();
            //navigator.notification.beep(1);
            soundstatus.value = "停止录音……";
          }
          mediaRec.value = null;
          recordStatus.value = true;
          break;  
      }
    }

    //播放
    function playSuccess(){
      soundstatus.value = "播放成功！";
    }
    function playFaild(err){
      soundstatus.value = "播放失败：" + err.code + err.message;
    }
    function playAudio(val){
      var path;
      var fileName = "myrecording.mp3";
      path = cordova.file.externalRootDirectory + "Android/data/org.xapp/files/" + fileName;
      
      console.log("play: "+ path)
      if (mediaPlay.value === null){
        mediaPlay.value = new Media(
          path,
          playSuccess,
          playFaild
        )
      }

      switch(val){
        case 1:
          if (mediaPlay.value) {
            mediaPlay.value.play();
          }
          playstatus.value = false;
          soundstatus.value = "开始播放……";
          break;
        case 2:
          if (mediaPlay.value) {
            mediaPlay.value.pause();
          }
          playstatus.value = true;
          soundstatus.value = "暂停播放……";
          break;
        case 3:
          if (mediaPlay.value) {
            mediaPlay.value.stop();
            mediaPlay.value.release();
            soundstatus.value = "停止播放……";
          }
          mediaPlay.value = null;
          playstatus.value = true;
          break;
      }
    }

    getCurrentPosition();

    // 我们注册事件, 参考插件的文档页面
    window.addEventListener('batterystatus', updateBatteryStatus, false)

    onBeforeUnmount(() => {
      // 我们做一些清理工作;
      // 我们需要删除事件监听器
      window.removeEventListener('batterystatus', updateBatteryStatus, false)
    })

    const imei = ref(
      window.device === void 0
        ? 'Run this on a mobile/tablet device'
        : window.device
    )
    

    return {
      batteryStatus,
      imei,
      imageSrc,
      divstatus,
      latitude,
      longitude,
      playstatus,
      mediaPlay,
      recordPauseStatus,
      recordStatus,
      soundstatus,
      netstate,
      captureImage,
      captureVideo,
      getCurrentPosition,
      getRecord,
      playAudio,
      checkConnection,
      barcodescan
    }
  },
  // created() {
  //   this.getPosition();
  //   window.addEventListener("batterystatus", this.onBatteryStatus, false);
  //   window.addEventListener("deviceready", this.onDeviceReady, false);
  // },
  // beforeMount() { },
  // mounted() {
  //   this.checkConnection();
  // },
  methods: {
    onDeviceReady() {

    },
    // // 查看电池状态
    // onBatteryStatus(status) {
    //   this.batterystatus = status.level;
    //   this.batterystatusisPlugged = status.isPlugged;
    // },
    // 1 查询当前位置信息
    getPosition() {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess,
        this.getPositionError,
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
      );
    },
    // 1-1 查询当前位置信息成功
    getPositionSuccess(position) {
      this.latitude = String(position.coords.latitude);
      this.longitude = String(position.coords.longitude);
      if (this.$auth.check()) {
        let tmpUsercfg = JSON.parse(this.$auth.user().usercfg);
        if (tmpUsercfg === null) tmpUsercfg = {};
        tmpUsercfg.postion = {
          latitude: this.latitude,
          longitude: this.longitude,
        };
        if (tmpUsercfg.postion !== null) {
          this.$router.app.$http
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
    // 1-2 查询当前位置信息失败
    getPositionError(error) {
      if (error) {
        this.$zglobal.showMessage("red-7", "center", this.$t("failed"));
      }
    },
    // 查询当前网络连接
    // checkConnection() {
    //   var networkState = navigator.connection.type;
    //   const states = {
    //     unknown: "未知网络连接",
    //     ethernet: "以太网连接",
    //     wifi: "WIFI 网络连接",
    //     "2g": "2G 网络连接",
    //     "3g": "3G 网络连接",
    //     "4g": "4G 网络连接",
    //     cell: "蜂窝数据连接",
    //     none: "无网络连接",
    //   };
    //   this.netstate = states[networkState];
    // },
    // 二维码扫描
    // barcodescan() {
    //   cordova.plugins.barcodeScanner.scan(
    //     this.barcodescanresult,
    //     function (error) {
    //       alert("扫描失败: " + error);
    //     },
    //     {
    //       preferFrontCamera: false, // iOS and Android
    //       showFlipCameraButton: true, // iOS and Android
    //       showTorchButton: true, // iOS and Android
    //       torchOn: false, // Android, launch with the torch switched on (if available)
    //       saveHistory: true, // Android, save scan history (default false)
    //       prompt: "请把二维码置于摄像区域...", // Android
    //       resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    //       // formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
    //       // direction:"landscape",//  仅Android（portrait | landscape），默认未设置，因此会随设备旋转
    //       disableAnimations: true, // iOS
    //       disableSuccessBeep: true, // iOS and Android
    //     }
    //   );
    //   if (this.$auth.user().usercfg) {
    //     const tmpa = JSON.parse(this.$auth.user().usercfg);
    //     this.barcodetype = tmpa.barcode.format;
    //     this.barcodetext = tmpa.barcode.text;
    //   }
    // },
    // barcodescanresult(result) {
    //   this.divstatus =
    //     "扫描结果\n" +
    //     "类型:[ " +
    //     result.format +
    //     "]\n" +
    //     "内容: " +
    //     result.text +
    //     "\n" +
    //     "是否取消: " +
    //     result.cancelled;
    // },
    // 拍摄
    capturesuccess(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        this.divstatus =
          "拍摄成功！\n" +
          "名称：" +
          mediaFiles[i].name +
          "\n" +
          "大小：" +
          mediaFiles[i].size +
          "\n" +
          "本地URL：" +
          mediaFiles[i].localURL +
          "\n" +
          "路径：" +
          path;
      }
    },
    getcapture() {
      // duration参数为最长录制时间
      navigator.device.capture.captureVideo(this.capturesuccess, onError, {
        duration: 20,
      });
      function onError(error) {
        alert("拍摄失败：" + error);
      }
    },
    // 拍照
    picturesuccess(imageData) {
      // imageURI imageData
      this.divstatus = "返回的数据:" + imageData;
      // alert('调用相册返回的数据:' + imageData)
      // //使用FileTransfer上传到服务器
      // var options = new FileUploadOptions() // 文件参数选项
      // options.fileKey = 'file' // 向服务端传递的file参数的parameter name
      // options.fileName = imageData.substr(
      //   imageData.lastIndexOf('/'),
      //   imageData.lastIndexOf('?') - imageData.lastIndexOf('/')
      // ) // 文件名一般返回的是app在手机的对应包下的缓存目录+?时间戳
      // options.mimeType = 'image/jpeg' // 文件格式，默认为image/jpeg
      // var ft = new FileTransfer() // 文件上传类
      // ft.upload(
      //   imageData,
      //   encodeURI(
      //     'http://192.168.0.4:8080/baas/mychat/messageTransform/uploadPicForUri'
      //   ),
      //   // 服务器处理该请求的地址，此处为本人的wex5baas的action地址
      //   function(success) {}, // 成功回调
      //   function(error) {}, // 失败回调
      //   options
      // )
    },
    getpicture() {
      navigator.camera.getPicture(this.picturesuccess, onLoadImageFail, {
        destinationType: navigator.camera.DestinationType.FILE_URI,
        // 返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI （在andorid中 FILE_URI和NATIVE_URI返回的结果是一样的）
        quality: 80, // 图片质量  0-100
        targetWidth: 800, // 照片宽度
        targetHeight: 600, // 照片高度
        saveToPhotoAlbum: true, // 保存到手机相册
        encodingType: navigator.camera.EncodingType.JPEG, // 保存的图片格式： JPEG = 0, PNG = 1
        allowEdit: false, // 选择之前允许修改截图
        cameraDirection: 0, // 前后摄像头类型：Back= 0,Front-facing = 1
        // sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        // // 从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        // mediaType: 0
        // // 可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      });
      // 失败的回调
      function onLoadImageFail(error) {
        // console.log('调用相册失败的消息：' + error)
        alert("拍摄失败：" + error);
      }
    },
    // // 录音
    // getrecordsuccess() {
    //   navigator.notification.beep(1);
    //   // navigator.notification.alert(
    //   //   '录音成功！', // message
    //   //   alertDismissed, // callback
    //   //   '提示', // title
    //   //   '确认' // buttonName
    //   // )
    //   // function alertDismissed() {
    //   //   // do something
    //   //   this.soundstatus = '取消 确认 按钮！……'
    //   // }
    //   this.soundstatus = "录音成功……";
    // },
    // getrecord(val) {
    //   // 开始录音 禁止用eslint提示
    //   /* eslint-disable */
    //   var path;
    //   var filename = "myrecording.mp3";
    //   if (device.platform === "iOS") {
    //     this.soundstatus = "平台为:IOS；设备名称：" + device.model;
    //     path = cordova.file.tempDirectory + "AsmartApp/" + filename;
    //   } else if (device.platform === "Android") {
    //     this.soundstatus = "平台为:Android；设备名称：" + device.model;
    //     path = cordova.file.externalRootDirectory + "AsmartApp/" + filename;
    //   }
    //   if (this.mediaRec === null) {
    //     this.mediaRec = new Media(
    //       path,
    //       // success callback
    //       this.getrecordsuccess,
    //       // error callback
    //       function (err) {
    //         // console.log('recordAudio():Audio Error: ' + err.code)
    //         this.soundstatus = "录音失败：" + err.code + err.message;
    //       }
    //     );
    //   }
    //   // 录音
    //   switch (val) {
    //     case 1:
    //       if (this.mediaRec) {
    //         this.mediaRec.startRecord();
    //         navigator.notification.beep(1);
    //       }
    //       this.recordstatus = false;
    //       this.soundstatus = this.soundstatus + "<br>开始录音……";
    //       break;
    //     case 2:
    //       if (this.mediaRec) {
    //         this.mediaRec.pauseRecord();
    //       }
    //       this.recordpausestatus = false;
    //       this.soundstatus = "暂停录音……";
    //       break;
    //     case 3:
    //       if (this.mediaRec) {
    //         this.mediaRec.resumeRecord();
    //       }
    //       this.recordpausestatus = true;
    //       this.soundstatus = "恢复录音……";
    //       break;
    //     case 4:
    //       if (this.mediaRec) {
    //         this.mediaRec.stopRecord();
    //         this.mediaRec.release();
    //         navigator.notification.beep(1);
    //         this.soundstatus = "停止录音……";
    //       }
    //       this.mediaRec = null;
    //       this.recordstatus = true;
    //       break;
    //   }
    // },
    // playAudio(val) {
    //   var path;
    //   var filename = "myrecording.mp3";
    //   if (device.platform === "iOS") {
    //     path = cordova.file.tempDirectory + "AmartApp/" + filename;
    //   } else if (device.platform === "Android") {
    //     path = cordova.file.externalRootDirectory + "AmartApp/" + filename;
    //   }
    //   if (this.mediaPlay === null) {
    //     this.mediaPlay = new Media(
    //       path,
    //       // success callback
    //       function () {
    //         // navigator.notification.alert(
    //         //   '播放成功！', // message
    //         //   alertDismissed, // callback
    //         //   '提示', // title
    //         //   '确认' // buttonName
    //         // )
    //         // function alertDismissed() {
    //         //   // do something
    //         //   this.soundstatus = '取消 确认 按钮！……'
    //         // }
    //         this.soundstatus = "播放成功！";
    //       },
    //       // error callback
    //       function (err) {
    //         this.soundstatus = "播放失败：" + err.code + err.message;
    //       }
    //     );
    //   }

    //   // 播放
    //   switch (val) {
    //     case 1:
    //       if (this.mediaPlay) {
    //         this.mediaPlay.play();
    //       }
    //       this.playstatus = false;
    //       this.soundstatus = "开始播放……";
    //       break;
    //     case 2:
    //       if (this.mediaPlay) {
    //         this.mediaPlay.pause();
    //       }
    //       this.playstatus = true;
    //       this.soundstatus = "暂停播放……";
    //       break;
    //     case 3:
    //       if (this.mediaPlay) {
    //         this.mediaPlay.stop();
    //         this.mediaPlay.release();
    //         this.soundstatus = "停止播放……";
    //       }
    //       this.mediaPlay = null;
    //       this.playstatus = true;
    //       break;
    //   }
    // },
  },
};
</script>

<style scoped>
.chart-list {
  margin: 20px auto;
  width: 350px;
  height: 400px;
}
</style>
