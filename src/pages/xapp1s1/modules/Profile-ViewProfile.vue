<template>
  <q-page class="q-pa-md">
    <div class="row" style="display: flex;justify-content: center; align-items: center;">
      <q-avatar size="160px" style="border: 2px solid black; border-radius: 50%;">
        <q-img :src="myProfile.avatar"></q-img>
      </q-avatar>
    </div>
    <br>
    <div class="row" style="display: flex;justify-content: center; align-items: center;flex-direction: column;">
      <div style="font-size: 60px;">{{ userName }}</div>
    </div>
    <div class="row" style="display: flex;justify-content: center; align-items: center;flex-direction: column;">
      <div style="font-size: 30px; color: gray;"><q-icon name="location_on"></q-icon>{{ location }}</div>
    </div>
    <br>
    <div style="display: flex;justify-content: center; align-items: center;">
      <div class="col" style="display: flex;justify-content: center; align-items: center;">
        <q-btn color="primary" to="/user/xapp1s1personalchange" style="width: 150px;"> 更改档案 </q-btn>
      </div>
      <div class="col" style="display: flex;justify-content: center; align-items: center;">
        <q-btn @click="logout" style="width: 150px;background-color: rgb(210, 210, 210);"> 退出登录 </q-btn>
      </div>
    </div>

    <br>
    <q-separator style="height: 1px;" />
    <br>
    <div style="display: flex;justify-content: center; align-items: center;">
      <div class="col" style="display: flex;justify-content: center; align-items: center;">
        <q-btn to="xapp1s1sendactive" color="primary" style="width: 150px;">
          {{ $t("xapp1s1.shop.activeList") }}
        </q-btn>
      </div>
      <div class="col" style="display: flex;justify-content: center; align-items: center;">
        <q-btn color="primary" to="xapp1s1shop" style="width: 150px;"> 我的商铺 </q-btn>
      </div>
    </div>
    <br>
    <q-separator style="height: 1px;" />
    <br>
    <div v-for="index in 3" :key="index">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">----------------------</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
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

  </q-page>
</template>
  
<script>
import { province } from "components/province";

export default {
  name: "Personal",
  data() {
    return {
      myProfile: {},
      userName: '',
      location: '',
    };
  },
  created() {
    this.$api.get("xapp1s1/profile/getMyProfile").then((res) => {
      if (res.data.success === true) {
        this.myProfile = res.data.data
      }
    });
    this.$api.get("auth/user").then((res) => {
      if (res.data.success === true) {
        this.userName = res.data.data.name
        this.location = res.data.data.xapp1s1profile_pub.city
      }
    });
  },
  methods:
  {
    logout() {
      // if echo exist, close echo on logout
      this.$auth.logout().then(() => {
        if (window.Echo) {
          window.Echo.leave("App.Models.User." + this.userID);
          window.Echo.disconnect();
        }
      });
    },
  }
};
</script>
  
<style scoped></style>
  