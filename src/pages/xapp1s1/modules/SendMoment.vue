<template>
  <q-page class="q-pa-md">
    <q-input
      :label="$t('xapp1s1.moment.note')"
      v-model="text"
      type="textarea"
      stack-label
      outlined
    />

    <update-media
      :server="this.$api.defaults.baseURL + '/zero/uploadMyTmpFiles'"
      media_file_path="/post_images"
      :multiple="true"
      :media_server="this.$api.defaults.baseURL + '/zero/getMyTmpFiles'"
      @saved-media="msave"
      @added-media="madd"
      @deleted-media="mdel"
      :headers="{
        Authorization: 'Bearer ' + this.$auth.token(),
      }"
    >
    </update-media>

    <q-btn
      color="secondary"
      glossy
      :label="$t('xapp1s1.moment.send')"
      @click="send"
    />
  </q-page>
</template>

<script>
import { UploadMedia, UpdateMedia } from "../../../components/vue-media-upload";
export default {
  name: "SendActive",
  components: {
    UpdateMedia,
  },
  data() {
    return {
      text: "",
      DaddFiles: false,
      Duserprfile: false,
      data: {
        files: [],
        id: "",
      },
      pics: {},
      added: {},
      saved: {},
    };
  },
  methods: {
    madd(val) {
      this.added = val;
    },
    mdel(val) {},
    msave(val) {
      this.saved = val;
    },
    send() {
      Object.assign(this.pics, this.added);
      Object.assign(this.pics, this.saved);
      let tmp = {
        note: this.text,
        pics: this.pics,
      };
      this.$api
        .post("xapp1s1/moments/postMyMoment", {
          note: this.text,
          pics: this.pics,
        })
        .then((res) => {
          if (res.data.success === true) {
            this.$zglobal.showMessage(
              "positive",
              "center",
              this.$t("xapp1s1.moment.success")
            );
            this.$router.push({ name: "xapp1s1home" });
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
