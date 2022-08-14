<template>
  <q-btn
    dense
    flat
    icon="message"
    @click="openComment(moment)"
    :label="moment.comments.length"
  />
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
export default {
  name: "commentMoment",
  data() {
    return {
      //发送评论
      comment: false,
      commentContent: "",
    };
  },
  props: {
    moment: {
      type: Object,
    },
  },
  methods: {
    //发评论
    openComment(moment) {
      this.comment = true;
      this.commentContent = "";
      this.$props.moment = moment;
    },
    sendComment() {
      this.$api
        .post("xapp1s1/moments/commentMoment/" + this.moment.id, {
          content: this.commentContent,
        })
        .then((res) => {
          if (res.data.success) {
            this.comment = false;
            this.$props.moment.comments = res.data.data;
          }
        });
    },
  },
};
</script>

<style scoped></style>
