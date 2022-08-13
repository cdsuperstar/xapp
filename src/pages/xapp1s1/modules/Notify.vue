<template>
  <!--  1 1*1 不裁剪
      2-4 2*2
      5-9 3*3
-->
  <q-page class="q-pa-md" style="padding: 0">
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
          <q-tab name="recommend" label="推荐" @click="load('R')" />
          <q-tab name="followed" label="关注" @click="load('F')" />
          <q-tab name="shop" label="商铺" @click="load('S')" />
        </q-tabs>
      </q-card>
      <q-separator />
      <q-btn class="col-1" icon="add" flat to="xapp1s1sendactive" />
    </div>

    <q-tab-panels v-model="notifyTools" swipeable animated>
      <q-tab-panel name="recommend">
        <div class="active" :key="active" v-for="active in activeRgi">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-img :src="active.user_pub.xapp1s1profile_pub.avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <!--              用户名-->
              <q-item-label>
                {{ active.user_pub.xapp1s1profile_pub.nickname }}
              </q-item-label>
              <!--              用户资料-->
              <q-item-label caption>
                {{ active.user_pub.xapp1s1profile_pub.sex }},
                {{ active.user_pub.xapp1s1profile_pub.weight }},
                {{ active.user_pub.xapp1s1profile_pub.height }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item style="max-height: 200px; height: 200px">
            {{ active.note }}
          </q-item>
          <q-item>
            <q-item-section v-for="pic in active.pics" :key="pic">
              <q-img :src="pic" />
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-tab-panel>

      <q-tab-panel name="followed" class="q-pa-md">
        <div class="active" :key="active" v-for="active in activeF">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-img :src="active.user_pub.xapp1s1profile_pub.avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <!--用户名-->
              <q-item-label>
                {{ active.user_pub.xapp1s1profile_pub.nickname }}
              </q-item-label>
              <!--用户资料-->
              <q-item-label caption>
                {{ active.user_pub.xapp1s1profile_pub.sex }},
                {{ active.user_pub.xapp1s1profile_pub.weight }},
                {{ active.user_pub.xapp1s1profile_pub.height }}
              </q-item-label>
            </q-item-section>
            <!--动态内容-->
          </q-item>
          <q-item style="max-height: 200px">
            {{ active.note }}
          </q-item>
          <!--动态图片-->
          <div class="pic">
            <div v-if="active.pics.length > 4" class="q-pa-md">
              <div class="q-col-gutter-xs row items-start">
                <div
                  class="col-4"
                  v-for="(pic, index) in active.pics"
                  :key="pic"
                >
                  <q-img
                    :ratio="1"
                    :src="pic"
                    @click="showPic(active, index + 1)"
                  />
                </div>
              </div>
            </div>

            <div
              v-else-if="active.pics.length < 4 && active.pics.length > 1"
              class="q-pa-md"
            >
              <div class="q-col-gutter-xs row items-start">
                <div
                  class="col-6"
                  v-for="(pic, index) in active.pics"
                  :key="pic"
                >
                  <q-img
                    :ratio="1"
                    :src="pic"
                    @click="showPic(active, index + 1)"
                  />
                </div>
              </div>
            </div>

            <div v-else-if="active.pics.length === 1" class="q-pa-md">
              <div class="q-col-gutter-xs row items-start">
                <div
                  class="col-6"
                  v-for="(pic, index) in active.pics"
                  :key="pic"
                >
                  <q-img :src="pic" @click="showPic(active, index + 1)" />
                </div>
              </div>
            </div>
          </div>
          <!--评论，点赞，时间-->
          <div class="q-pa-md">
            <q-bar style="background-color: white; color: gray">
              <div style="size: 10px">
                {{ active.updated_at }}
              </div>

              <q-space />
              <!--              点赞-->
              <div class="dianzan">
                <q-btn
                  v-if="
                    active.thumbs.filter((val) => {
                      return val.user_id == this.$auth.user()?.id;
                    }).length === 0
                  "
                  dense
                  flat
                  icon="thumb_up_off_alt"
                  :label="active.thumbs?.length"
                  @click="getThumb(active)"
                />
                <q-btn
                  v-if="
                    active.thumbs.filter((val) => {
                      return val.user_id == this.$auth.user()?.id;
                    }).length !== 0
                  "
                  dense
                  flat
                  color="red"
                  icon="thumb_up_alt"
                  :label="active.thumbs?.length"
                  @click="getThumb(active)"
                />
              </div>

              <q-btn
                dense
                flat
                icon="message"
                @click="openComment(active)"
                :label="active.comments.length"
              />
            </q-bar>
          </div>
          <q-separator />
        </div>
      </q-tab-panel>

      <q-tab-panel name="shop">
        <div class="active" :key="active" v-for="active in activeS">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-img :src="active.user_pub.xapp1s1profile_pub.avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <!--              用户名-->
              <q-item-label>
                {{ active.user_pub.xapp1s1profile_pub.nickname }}
              </q-item-label>
              <!--              用户资料-->
              <q-item-label caption>
                {{ active.user_pub.xapp1s1profile_pub.sex }},
                {{ active.user_pub.xapp1s1profile_pub.weight }},
                {{ active.user_pub.xapp1s1profile_pub.height }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item style="max-height: 200px; height: 200px">
            {{ active.note }}
          </q-item>
          <q-item>
            <q-item-section v-for="pic in active.pics" :key="pic">
              <q-img :src="pic" />
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <q-separator />
  </q-page>
  <!--  展示图片-->
  <q-dialog v-model="pop" auto-close transition-hide="slide-down">
    <q-carousel swipeable v-model="slide" control-color="primary">
      <q-carousel-slide
        v-for="(pic, index) in popImg"
        :key="pic"
        :name="index + 1"
      >
        <q-img :src="pic"></q-img>
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
  <!--  评论-->
  <q-dialog v-model="comment" position="bottom">
    <q-card>
      <q-input v-model="commentContent">
        <template v-slot:append
          ><q-btn label="发布" color="primary" @click="sendComment" />
        </template>
      </q-input>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Notify",
  setup() {
    return {
      slide: ref(1),
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
            console.log(2, this.activeF);
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
            console.log(res.data.data);
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

<style scoped></style>
