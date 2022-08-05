<template>
  <q-page class="q-pa-md">
    <!-- your group -->
    {{ $t("xapp1s1.home.yourGroup") }}
    <q-virtual-scroll
      virtual-scroll-horizontal
      :items="heavyList"
      v-slot="{ item, index }"
    >
      <div
        class="bg-grey"
        style="margin-right: 5px; margin-left: 5px"
        :key="index"
      >
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          width="10vh"
          height="15vh"
        >
          <div class="absolute-bottom">
            <div class="text-h6">{{ item.groupName }}</div>
            <div class="text-subtitle2">by John Doe</div>
          </div>
        </q-img>
      </div>
    </q-virtual-scroll>
    <q-separator />
    <!--  start new group  -->
    <q-item to="">
      <q-field square outlined style="width: 100vh">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ $t("xapp1s1.home.createGroup") }}
          </div>
        </template>
        <template v-slot:append>
          <q-avatar>
            <q-icon name="arrow-forward" size="50px"></q-icon>
          </q-avatar>
        </template>
      </q-field>
    </q-item>
    <q-separator />
    <!--  your calendar  -->

    <q-card>
      <q-tabs
        v-model="hometools"
        dense
        class="bg-grey-3"
        align="justify"
        narrow-indicator
      >
        <q-tab name="all" label="ALL" />
        <q-tab name="going" label="GOING" />
        <q-tab name="saved" label="SAVED" />
        <q-tab name="past" label="PAST" />
      </q-tabs>

      <q-tab-panels v-model="hometools" animated>
        <q-tab-panel name="all">
          <div class="text-h6">asd</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="going">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="saved">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="past">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>

      <q-separator />
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
      hometools: "all",
    };
  },
};
</script>

<style scoped></style>
