<template>
  <q-page class="q-pa-md">
    <!-- your group -->
    <div class="col">
      <br>
      <div class="row">
        <p style="font-size: 24px;font-weight: bold;">早上/中午/晚上 好 USER NAME 👋 </p>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <p style="font-weight: bold;">你接下来的活动</p>
        </div>
        <div class="col">
          <router-link to="/somewhere" style="display: flex;justify-content: flex-end; align-items: center; text-decoration: none;">查看所有活动</router-link>
        </div>
      </div>
      <div >
        <p style="display: flex;justify-content: center; align-items: center;">您没有注册任何活动,</p>
        <p style="display: flex;justify-content: center; align-items: center;">您已注册的活动将显示在此处。</p>
      </div>
      <div class="row">
        <div class="col">
          <p style="font-weight: bold;">你的群组</p>
        </div>
        <div class="col">
          <router-link to="/somewhere" style="display: flex;justify-content: flex-end; align-items: center; text-decoration: none;">查看所有群组</router-link>
        </div>
      </div>
      <div >
        <p style="display: flex;justify-content: center; align-items: center;">您没有参加任何群组</p>
        <router-link to="/somewhere" style="display: flex;justify-content: center; align-items: center; text-decoration: none;">探索群组</router-link>
      </div>
    </div>
    <br>
    <q-separator style="height: 6px;"/>
    <br>
    <div class="row">
      <div class="col">
          <p style="font-size: 24px;font-weight: bold;">接下来的活动</p>
      </div>
      </div>
      <div class="col">
        <p style="font-weight: bold;">推荐活动
          <q-toggle v-model="value" checked-icon="check" color="green" unchecked-icon="clear"/>
        </p>
      </div>
      <br>

      <div v-for="index in 3" :key="index">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">----------------------</div>
              <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
              <div class="text-caption text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat>
              7:30PM
            </q-btn>
            <q-btn flat color="primary">
              Reserve
            </q-btn>
          </q-card-actions>
        </q-card>
        <br>
      </div>



    <!-- <q-virtual-scroll
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
    </q-virtual-scroll> -->

    <q-separator />
    <!--  start new group  -->
    <!-- <q-item to="">
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
    </q-item> -->
    <q-separator />
    <!--  your calendar  -->

    <!-- <q-card>
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
    </q-card> -->
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "Homepage",
  data() {
    const thumb_up1="thumb_up";
    // const heavyList = [
    //   { groupName: "abc" },
    //   { groupName: "abc1" },
    //   { groupName: "abc2" },
    //   { groupName: "abc3" },
    //   { groupName: "abc4" },
    //   { groupName: "abc5" },
    //   { groupName: "abc6" },
    //   { groupName: "abc7" },
    //   { groupName: "abc8" },
    //   { groupName: "abc9" },
    //   { groupName: "abc0" },
    //   { groupName: "abc-" },
    //   { groupName: "abc0" },
    //   { groupName: "abc9" },
    //   { groupName: "abc8" },
    //   { groupName: "abc7" },
    //   { groupName: "abc6" },
    //   { groupName: "abc5" },
    //   { groupName: "abc4" },
    //   { groupName: "abc3" },
    //   { groupName: "abc2" },
    //   { groupName: "abc1" },
    // ];
    return {
      // heavyList,
      thumb_up1,
      value: ref(true),
      hometools: "all",
    };
  },
};
</script>

<style scoped></style>
