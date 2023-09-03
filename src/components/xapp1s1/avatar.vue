<template>
  <q-btn round @click="otherUserProfile()">
    <q-avatar>
      <q-img :src="avatar" />
    </q-avatar>
  </q-btn>
</template>

<script>
export default {
  name: "avatar",
  data() {
    return {};
  },
  props: {
    avatar: {},
    id: {},
  },
  methods: {
    otherUserProfile() {
      this.$router.push({
        name: "otherUserProfile",
        query: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped></style>
