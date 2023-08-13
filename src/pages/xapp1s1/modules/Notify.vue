<template>
  <!--  1 1*1 不裁剪
      2-4 2*2
      5-9 3*3
-->
  <q-page class="q-pa-md " style="padding: 0">
    <div class="row">
      <q-card class="col-11">
        <q-tabs
          active-color="pink"
          v-model="notifyTools"
          dense
          align="justify"
          narrow-indicator
          indicator-color="white"
          active-bg-color="white"
        >
          <q-tab name="recommend" label="推荐events " @click="load('R')" />
          <q-tab name="followed" label="关注的events" @click="load('F')" />
          <q-tab name="shop" label="周围的商铺" @click="load('S')" />
        </q-tabs>
      </q-card>
      <q-separator />
      <q-btn class="col-1" icon="add" flat to="xapp1s1sendmoment" />
    </div>

    <q-tab-panels v-model="notifyTools" swipeable animated>
      <q-tab-panel name="recommend">
        <moment-page
          v-for="moment in activeR"
          :key="moment"
          :moment="moment"
        ></moment-page>
        <q-btn  unelevated fab-mini dense  icon="my_location" style="margin: 0%;padding: 0px;">查看更多</q-btn>
      </q-tab-panel>

      <q-tab-panel name="followed" class="q-pa-md">
        <moment-page
          v-for="moment in activeF"
          :key="moment.id"
          :moment="moment"
        ></moment-page>
        <label>我是有底线的！</label>
      </q-tab-panel>

      <q-tab-panel name="shop">
        <moment-page
          v-for="moment in activeS"
          :key="moment"
          :moment="moment"
        ></moment-page>
            <div class="q-pa-md row items-start " v-for="index in 8" :key="index">
                <q-card class="my-card" flat bordered>
                <q-img
                    src="https://cdn.quasar.dev/img/parallax2.jpg"
                />

                <q-card-section>
                    <div class="text-overline text-orange-9">Overline</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                    <div class="text-caption text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                </q-card-section>

                <q-card-actions>
                    <q-btn flat color="dark" label="Share" />
                    <q-btn flat color="primary" label="Book" />

                    <q-space />

                    <q-btn
                    color="grey"
                    round
                    flat
                    dense
                    :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                    @click="expanded = !expanded"
                    />
                </q-card-actions>

                <q-slide-transition>
                    <div v-show="expanded">
                    <q-separator />
                    <q-card-section class="text-subitle2">
                        {{ lorem }}
                    </q-card-section>
                    </div>
                </q-slide-transition>
                </q-card>
            </div>
      </q-tab-panel>
    </q-tab-panels>
    <q-separator />
  </q-page>
</template>

<script>
import { ref } from "vue";
import momentPage from "components/momentPage";
export default {
  name: "Notify",
  components: {
    momentPage,
  },
  setup() {
    return {
      slide: ref(1),
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };
  },
  mounted() {
    this.$api.get("xapp1s1/moments/getRecommMoments ").then((res) => {
      this.got("R");
    });
  },
  data() {
    return {
      //展示图片
      popImg: "",
      pop: false,
      //发送评论
      comment: false,
      commentContent: "",
      moment: "",
      //展示动态
      activeR: null,
      activeF: null,
      activeS: null,
      //面板卡选项
      notifyTools: "recommend",
    };
  },
  methods: {
    //图片展示
    showPic(active, index) {
      this.pop = true;
      this.popImg = active.pics;
      this.slide = ref(index);
    },
    //获得动态
    got(po) {
      if (po == "R") {
        this.$api.get("xapp1s1/moments/getRecommMoments ").then((res) => {
          if (res.data.success) {
            this.activeR = res.data.data;
            //查看结构
            // console.log(1, this.activeR);
          }
        });
      } else if (po == "F") {
        this.$api.get("xapp1s1/moments/getFocusedMoments ").then((res) => {
          if (res.data.success) {
            this.activeF = res.data.data;
            // console.log(2, this.activeF);
          }
        });
      } else {
        this.$api.get("xapp1s1/moments/getShopMoments ").then((res) => {
          if (res.data.success) {
            this.activeS = res.data.data;
          }
        });
      }
    },
    load(po) {
      if (po == "S" && this.activeS == null) {
        this.got(po);
      } else if (po == "R" && this.activeR == null) {
        this.got(po);
      } else if (po == "F" && this.activeF == null) {
        this.got(po);
      }
    },
    //点赞
    getThumb(moment) {
      //this.$auth.user()?.id
      this.$api
        .post("xapp1s1/moments/thumbUpMoment/" + moment.id)
        .then((res) => {
          if (res.data.success) {
            moment.thumbs = res.data.data;
          }
        });
    },
    //发评论
    openComment(moment) {
      this.comment = true;
      this.commentContent = "";
      this.moment = moment;
    },
    sendComment() {
      this.$api
        .post("xapp1s1/moments/commentMoment/" + this.moment.id, {
          content: this.commentContent,
        })
        .then((res) => {
          if (res.data.success) {
            this.comment = false;
            this.moment.comments = res.data.data;
          }
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
