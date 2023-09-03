<template>
  <q-btn
    flat
    round
    :label="$t('xapp1s1.button.back')"
    @click="back"
    :ripple="false"
  >
  </q-btn>
</template>

<script>
export default {
  name: "backButton",
  data() {
    return {};
  },
  props: {},
  methods: {
    back() {
      history.back(-1);
    },
  },
};
</script>

<style scoped></style>
