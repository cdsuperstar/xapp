<template>
  <!--  swipeable-->
  <!--  缩略图-->
  <div class="pic">
    <div v-if="pics?.length > 4" class="q-pa-md">
      <div class="q-col-gutter-xs row items-start">
        <div class="col-4" v-for="(pic, index) in pics" :key="index">
          <q-img :ratio="1" :src="pic" @click="showPic(index + 1)" />
        </div>
      </div>
    </div>

    <div v-else-if="pics?.length <= 4 && pics?.length > 1" class="q-pa-md">
      <div class="q-col-gutter-xs row items-start">
        <div class="col-6" v-for="(pic, index) in pics" :key="index">
          <q-img :ratio="1" :src="pic" @click="showPic(index + 1)" />
        </div>
      </div>
    </div>

    <div v-else-if="pics?.length === 1" class="q-pa-md">
      <div class="q-col-gutter-xs row items-start">
        <div class="col-6" v-for="(pic, index) in pics" :key="index">
          <q-img :src="pic" @click="showPic(index + 1)" />
        </div>
      </div>
    </div>
  </div>

  <!--  展示图片-->
  <q-dialog v-model="pop" auto-close full-width transition-hide="fade">
    <q-carousel
      animated
      transition-next="slide-left"
      transition-prev="slide-right"
      swipeable
      v-model="slide"
      control-color="primary"
    >
      <q-carousel-slide
        v-for="(pic, index) in popImg"
        :key="index"
        :name="index + 1"
        :img-src="pic"
      >
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  name: "showPic",
  props: {
    pics: {},
  },
  data() {
    return {
      //展示图片
      popImg: "",
      pop: false,
      slide: 1,
    };
  },
  methods: {
    showPic(index) {
      this.pop = true;
      this.popImg = this.$props.pics;
      this.slide = ref(index);
    },
  },
  created() {},
};
</script>

<style scoped></style>
