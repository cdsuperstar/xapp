<template>
  <q-page>
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="keyboard_arrow_left"
        to="/user/xapp1s1personal"
      />
      <q-toolbar-title>
        <label class="title">
          {{ $t("xapp1s1.shop.header") }}
        </label>
      </q-toolbar-title>
    </q-toolbar>
    <q-form class="q-gutter-md">
      <q-input
        class="col-6 q-pa-md"
        v-model="myShop.name"
        :label="$t('xapp1s1.shop.name')"
        :rules="[(val) => val?.length <= 30 || '请不要超过30个字符']"
        outlined
        rounded
      />

      <q-card
        flat
        bordered
        class="col-12"
        v-for="cl in fileCollentions"
        :key="cl"
      >
        <q-card-section>
          <div class="text-h6">{{ $t(`xapp1s1.shop.${cl}`) }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <update-media
            :server="
              this.$api.defaults.baseURL +
              `/xapp1s1/shops/uploadMyShopFiles/${cl}`
            "
            :media_server="
              this.$api.defaults.baseURL + `/xapp1s1/shops/getMyShopFiles/${cl}`
            "
            @deleted-media="mediaDel"
            :collention="cl"
            :multiple="true"
            :headers="{
              Authorization: 'Bearer ' + this.$auth.token(),
            }"
          >
          </update-media>
        </q-card-section>
      </q-card>

      <div class="row q-pa-md">
        <q-input
          v-model="myShop.starttime"
          mask="time"
          :rules="['time']"
          :hint="$t('xapp1s1.shop.starttime')"
          class="col-6"
          outlined
          rounded
          style="padding-right: 8px"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="myShop.starttime">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-model="myShop.endtime"
          mask="time"
          :rules="['time']"
          :hint="$t('xapp1s1.shop.endtime')"
          class="col-6"
          outlined
          rounded
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="myShop.endtime">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <q-select
        v-model="myShop.status"
        :options="options"
        :label="$t('xapp1s1.shop.status')"
        class="col-6 q-pa-md"
        outlined
        rounded
      />

      <q-input
        v-model="myShop.phone"
        :label="$t('xapp1s1.shop.phone')"
        class="col-6 q-pa-md"
        outlined
        rounded
      />

      <q-input
        v-model="myShop.tel"
        :label="$t('xapp1s1.shop.tel')"
        class="col-6 q-pa-md"
        outlined
        rounded
      />

      <q-input
        v-model="myShop.addr"
        :label="$t('xapp1s1.shop.addr')"
        class="col-6 q-pa-md"
        outlined
        rounded
      />

      <div class="row q-pa-md buttons">
        <q-btn
          push
          color="savebtn"
          :label="$t('xapp1s1.shop.ok')"
          @click="update"
        />
      </div>
    </q-form>

    <q-inner-loading :showing="loading">
      <q-spinner-box size="50px" color="secondary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { UpdateMedia } from "../../../components/vue-media-upload";

export default {
  components: {
    UpdateMedia,
  },
  name: "Shop",
  data() {
    return {
      fileCollentions: [
        "shopAvatar",
        "products",
        "environments",
        "menus",
        "qualifications",
        "others",
      ],
      loading: false,
      startTime: "09:00",
      endTime: "22:00",
      myShop: {},
      options: [this.$t("xapp1s1.shop.working"), this.$t("xapp1s1.shop.rest")],
    };
  },
  created() {
    this.loading = true;
    this.$api.get("xapp1s1/shops/getMyShop").then((res) => {
      if (res.data.success === true) {
        this.myShop = res.data.data;
        this.loading = false;
      } else {
        this.myShop = {
          name: null,
          starttime: "09:00",
          endtime: "22:00",
          status: null,
          phone: null,
          tel: null,
          addr: null,
          longitude: null,
          latitude: null,
        };
        this.loading = false;
      }
      //this.myShop = res.data.data;
      //console.log(res);
    });
  },
  methods: {
    mediaDel(val) {
      if (val?.length > 0) {
        this.$api
          .post("/xapp1s1/shops/delMyShopFiles/" + val[0].collention, {
            filenames: val,
          })
          .then((res) => {
            if (res.data.success === true) {
              this.$zglobal.showMessage(
                "positive",
                "center",
                this.$t("operation.delsuccess")
              );
            }
          });
      }
    },
    update() {
      this.loading = true;
      this.$api.post("xapp1s1/shops/updateMyShop", this.myShop).then((res) => {
        if (res.data.success === true) {
          this.loading = false;
          this.$zglobal.showMessage(
            "positive",
            "center",
            this.$t("auth.users.profile.success")
          );
        } else {
          this.loading = false;
          this.$zglobal.showMessage(
            "red-5",
            "center",
            this.$t("auth.register.invalid_data") + ":" + res.data.code
          );
        }
      });
    },
  },
};
</script>

<style scoped>
.buttons {
  justify-content: space-around;
}
</style>
