<template>
  <backButton></backButton>
  <UserProfile :user_id="id"></UserProfile>
</template>

<script>
import UserProfile from "src/components/xapp1s1/UserProfile-Compoments.vue";
import backButton from "src/components/xapp1s1/backButton.vue";
export default {
  name: "OtherUserProfile",
  components: {
    UserProfile,
    backButton,
  },
  props: {
    user_id: {},
  },
  data() {
    return {
      id: this.$route.query.id,
    };
  },
  created() {},
};
</script>

<style scoped></style>
