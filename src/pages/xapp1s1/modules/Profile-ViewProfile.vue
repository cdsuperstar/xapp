<template>
    <q-page class="q-pa-md">
        <q-btn color="primary" to="/user/xapp1s1personalchange" style="width: 150px"> 更改档案 </q-btn>
        <div class="row" style="display: flex;justify-content: center; align-items: center;">
            <q-avatar size="160px" style="border: 2px solid black; border-radius: 50%;">
                <q-img :src="myProfile.avatar"></q-img>
            </q-avatar>
        </div>
        <br>
        <div class="row" style="display: flex;justify-content: center; align-items: center;flex-direction: column;">
            <p style="font-size: 60px;">{{userName}}</p>
        </div>
        <div class="row" style="display: flex;justify-content: center; align-items: center;flex-direction: column;">
            <p style="font-size: 30px;"><q-icon name="favorite"></q-icon>{{userName}}</p>
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
        userName:'',
      };
    },
    created() {
      this.$api.get("xapp1s1/profile/getMyProfile").then((res) => {
        if (res.data.success === true) {
          this.myProfile = res.data.data;
          console.log(res.data.data)
          this.userName = res.data.data.name
        }
      });
    this.$api.get("auth/user").then((res) => {
      if (res.data.success === true) {
        this.userName = res.data.data.name
      }
    });
    },
  };
  </script>
  
  <style scoped></style>
  