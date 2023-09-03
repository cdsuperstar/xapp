<template>
  <q-btn
    flat
    round
    :label="
      isfollow ? $t('xapp1s1.button.alfollow') : $t('xapp1s1.button.follow')
    "
    stack
    :color="isfollow ? 'red' : 'black'"
    @click="follow()"
    :icon="isfollow ? 'favorite' : 'favorite_border'"
  >
  </q-btn>
</template>

<script>
export default {
  name: "followButton",
  data() {
    return {
      isfollow: false,
    };
  },
  props: {
    id: {},
  },
  created() {
    this.$api.get("xapp1s1/profile/getMyLikedUsers").then((res) => {
      res.data.data.forEach((e) => {
        if (e.user_id == this.id) {
          this.isfollow = true;
        }
      });
    });
  },
  methods: {
    follow() {
      if (this.id == this.$auth.user().id) {
        this.$q.dialog({
          message: "不能关注自己",
        });
        return;
      }
      this.$api.post("users/likeTheUser/" + this.id).then((res) => {
        // console.log(res);
        if (res.data.success) {
          this.isfollow = !this.isfollow;
        }
      });
    },
  },
};
</script>

<style scoped></style>
