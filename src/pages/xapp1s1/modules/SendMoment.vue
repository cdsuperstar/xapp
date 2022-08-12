<template>
  <q-page class="q-pa-md">
    <q-input
      :label="$t('xapp1s1.moment.note')"
      v-model="text"
      type="textarea"
      stack-label
      outlined
    />
    <q-select
      outlined
      :options="type"
      v-model="chooseType"
      :label="$t('xapp1s1.moment.type')"
      behavior="menu"
      stack-label
    />
    <q-btn
      color="secondary"
      glossy
      :label="$t('xapp1s1.moment.send')"
      @click="send"
    />
  </q-page>
</template>

<script>
//import { UploadMedia, UpdateMedia } from "vue-media-upload";
export default {
  name: "SendActive",

  data() {
    return {
      type: ["个人", "商家"],
      chooseType: "",
      text: "",
      DaddFiles: false,
      Duserprfile: false,
      data: {
        files: [],
        id: "",
      },
    };
  },
  methods: {
    send() {
      let tmp = {
        note: this.text,
        type: this.chooseType,
      };
      console.log(tmp);
      this.$api
        .post("xapp1s1/moments/postMyMoment", {
          note: this.text,
          type: this.chooseType,
        })
        .then((res) => {
          if (res.data.success === true) {
            this.$zglobal.showMessage(
              "positive",
              "center",
              this.$t("xapp1s1.moment.success")
            );
          } else {
            this.$zglobal.showMessage(
              "red-5",
              "center",
              this.$t("xapp1s1.moment.fail") + ":" + res.data.code
            );
          }
        });
    },
  },
};
</script>

<style scoped></style>
