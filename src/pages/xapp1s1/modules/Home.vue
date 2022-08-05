<template>
  <q-page class="flex flex-center">
    <q-card square flat>
      <!-- your group -->
      <q-card-section>
        {{ $t("xapp1s1.home.yourGroup") }}
        <q-virtual-scroll
          virtual-scroll-horizontal
          :items="heavyList"
          v-slot="{ item, index }"
        >
          <div class="card bg-grey" style="margin-right: 10px" :key="index">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              width="90px"
              height="150px"
            >
              <div class="absolute-bottom">
                <div class="text-h6">{{ item.groupName }}</div>
                <div class="text-subtitle2">by John Doe</div>
              </div>
            </q-img>
          </div>
        </q-virtual-scroll>
      </q-card-section>
      <q-separator />
      <!--  start new group  -->
      <q-card-section> </q-card-section>
      <q-separator />
      <!--  your calendar  -->
      <q-card-section> </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Homepage",
  data() {
    const heavyList = [
      { groupName: "abc" },
      { groupName: "abc1" },
      { groupName: "abc2" },
      { groupName: "abc3" },
      { groupName: "abc4" },
      { groupName: "abc5" },
      { groupName: "abc6" },
      { groupName: "abc7" },
      { groupName: "abc8" },
      { groupName: "abc9" },
      { groupName: "abc0" },
      { groupName: "abc-" },
      { groupName: "abc0" },
      { groupName: "abc9" },
      { groupName: "abc8" },
      { groupName: "abc7" },
      { groupName: "abc6" },
      { groupName: "abc5" },
      { groupName: "abc4" },
      { groupName: "abc3" },
      { groupName: "abc2" },
      { groupName: "abc1" },
    ];
    return {
      heavyList,
    };
  },
};
</script>

<style scoped></style>
