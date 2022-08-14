<template>
  <div class="dianzan">
    <q-btn
      v-if="
        moment.thumbs.filter((val) => {
          return val.user_id == this.$auth.user()?.id;
        }).length === 0
      "
      dense
      flat
      icon="thumb_up_off_alt"
      :label="moment.thumbs?.length"
      @click="getThumb(moment)"
    />
    <q-btn
      v-if="
        moment.thumbs.filter((val) => {
          return val.user_id == this.$auth.user()?.id;
        }).length !== 0
      "
      dense
      flat
      color="red"
      icon="thumb_up_alt"
      :label="moment.thumbs?.length"
      @click="getThumb(moment)"
    />
  </div>
</template>

<script>
export default {
  name: "thumbMoment",
  props: {
    moment: {
      type: Object,
    },
  },
  methods: {
    //点赞
    getThumb(moment) {
      //this.$auth.user()?.id
      this.$api
        .post("xapp1s1/moments/thumbUpMoment/" + moment.id)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data);
            moment.thumbs = res.data.data;
          }
        });
    },
  },
};
</script>

<style scoped></style>
