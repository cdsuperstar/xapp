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
    <show-pic :pics="moment.pics"></show-pic>
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
      <q-card class="text-black">
        <q-bar>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <moment-page :moment="moment" :is-detail="true"></moment-page>
        <q-tabs align="left" v-model="chooseThumbsComments">
          <q-tab name="comments" icon="message" />
          <q-tab name="thumbs" icon="thumb_up_alt" />
        </q-tabs>
        <q-tab-panels v-model="chooseThumbsComments" animated>
          <q-tab-panel name="comments">
            <q-list bordered dense separator>
              <q-item
                clickable
                v-ripple
                v-for="comment in moment.comments"
                :key="comment.id"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <q-img :src="comment.user_pub.xapp1s1profile_pub.avatar" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label header>
                    {{ comment.user_pub.xapp1s1profile_pub.nickname }}:{{
                      comment.content
                    }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ comment.created_at.replace("T", " ").substring(0, 16) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="thumbs">
            <q-list bordered dense separator>
              <q-item
                clickable
                v-ripple
                v-for="thumb in moment.thumbs"
                :key="thumb.id"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <q-img :src="thumb.user_pub.xapp1s1profile_pub.avatar" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label header
                    >{{ thumb.user_pub.xapp1s1profile_pub.nickname }} 点赞了
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
//动态页面，需要功能，
// 查看{动态的头像，内容，图片}
// 点赞，评论,点击图片,点击动态背景
import showPic from "components/xapp1s1/showPic";
import commentMoment from "components/xapp1s1/commentMoment";
import thumbMoment from "components/xapp1s1/thumbMoment";
export default {
  name: "momentPage",
  components: {
    showPic,
    commentMoment,
    thumbMoment,
  },
  props: {
    moment: {},
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chooseThumbsComments: "comments",
      momentDetail: false,
    };
  },
  methods: {
    openDetail() {
      if (!this.$props.isDetail) {
        this.momentDetail = true;
        this.$props.isDetail = true;
      }
    },
  },
};
</script>

<style scoped></style>
