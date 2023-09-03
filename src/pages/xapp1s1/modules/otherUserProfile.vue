<template>
  <backButton></backButton>
  <UserProfile :user_id="id"></UserProfile>
  <followButton :id="id"></followButton>
</template>

<script>
import UserProfile from "src/components/xapp1s1/UserProfile-Compoments.vue";
import backButton from "src/components/xapp1s1/backButton.vue";
import followButton from "src/components/xapp1s1/followButton.vue";
export default {
  name: "OtherUserProfile",
  components: {
    UserProfile,
    backButton,
    followButton,
  },
  props: {},
  data() {
    return {
      id: this.$route.query.id,
    };
  },
  created() {},
};
</script>

<style scoped></style>
