<template>
  <!--  swipeable-->
  <!--  缩略图-->
  <div class="pic">
    <div v-if="moment.pics.length > 4" class="q-pa-md">
      <div class="q-col-gutter-xs row items-start">
        <div class="col-4" v-for="(pic, index) in moment.pics" :key="pic">
          <q-img :ratio="1" :src="pic" @click="showPic(moment, index + 1)" />
        </div>
      </div>
    </div>

    <div
      v-else-if="moment.pics.length < 4 && moment.pics.length > 1"
      class="q-pa-md"
    >
      <div class="q-col-gutter-xs row items-start">
        <div class="col-6" v-for="(pic, index) in moment.pics" :key="pic">
          <q-img :ratio="1" :src="pic" @click="showPic(moment, index + 1)" />
        </div>
      </div>
    </div>

    <div v-else-if="moment.pics.length === 1" class="q-pa-md">
      <div class="q-col-gutter-xs row items-start">
        <div class="col-6" v-for="(pic, index) in moment.pics" :key="pic">
          <q-img :src="pic" @click="showPic(moment, index + 1)" />
        </div>
      </div>
    </div>
  </div>

  <!--  展示图片-->
  <q-dialog v-model="pop" auto-close full-width transition-hide="slide-down">
    <q-carousel swipeable v-model="slide" control-color="primary">
      <q-carousel-slide
        v-for="(pic, index) in popImg"
        :key="pic"
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
    moment: {
      type: Object,
    },
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
    showPic(active, index) {
      this.pop = true;
      this.popImg = active.pics;
      this.slide = ref(index);
    },
  },
};
</script>

<style scoped></style>
