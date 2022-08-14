<template>
  <div class="moment">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="moment.user_pub.xapp1s1profile_pub.avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <!--用户名-->
        <q-item-label>
          {{ moment.user_pub.xapp1s1profile_pub.nickname }}
        </q-item-label>
        <!--用户资料-->
        <q-item-label caption>
          {{ moment.user_pub.xapp1s1profile_pub.sex }},
          {{ moment.user_pub.xapp1s1profile_pub.weight }},
          {{ moment.user_pub.xapp1s1profile_pub.height }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <!--动态内容-->
    <div style="max-height: 200px" @click="openDetail">
      {{ moment.note }}
    </div>
    <!--动态图片-->
    <show-pic :moment="moment"></show-pic>
    <!--评论，点赞，时间-->
    <div class="q-pa-md">
      <q-bar style="background-color: white; color: gray">
        <div style="size: 10px">
          {{ moment.updated_at }}
        </div>

        <q-space />
        <thumb-moment :moment="moment"></thumb-moment>
        <comment-moment :moment="moment"></comment-moment>
      </q-bar>
    </div>
    <q-separator />
  </div>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="momentDetail"
      persistent
      :maximized="true"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <moment-page :moment="moment" :is-detail="true"></moment-page>
        <q-separator />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
//动态页面，需要功能，
// 查看{动态的头像，内容，图片}
// 点赞，评论,点击图片,点击动态背景
import showPic from "components/showPic";
import commentMoment from "components/commentMoment";
import thumbMoment from "components/thumbMoment";
export default {
  name: "momentPage",
  components: {
    showPic,
    commentMoment,
    thumbMoment,
  },
  props: {
    moment: {
      type: Object,
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      momentDetail: false,
    };
  },
  methods: {
    openDetail() {
      if (!this.$props.isDetail) {
        this.momentDetail = true;
        this.$props.isDetail = true;
        console.log(this.$props.isDetail);
      }
    },
  },
};
</script>

<style scoped></style>
