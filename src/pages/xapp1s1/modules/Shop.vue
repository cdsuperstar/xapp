<template>
  <q-page>
    <q-form class="q-gutter-md">
      <q-input
        v-model="myShop.name"
        :label="$t('xapp1s1.shop.name')"
      />
      <q-input v-model="myShop.starttime" mask="time" :rules="['time']" :hint="$t('xapp1s1.shop.starttime')">
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
      <q-input v-model="myShop.endtime" mask="time" :rules="['time']" :hint="$t('xapp1s1.shop.endtime')">
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
      <q-input
        v-model="myShop.status"
        :label="$t('xapp1s1.shop.status')"
      />
      <q-input
        v-model="myShop.phone"
        :label="$t('xapp1s1.shop.phone')"
      />
      <q-input
        v-model="myShop.tel"
        :label="$t('xapp1s1.shop.tel')"
      />
      <q-input
        v-model="myShop.addr"
        :label="$t('xapp1s1.shop.addr')"
      />
      <q-btn
        color="deep-orange"
        glossy
        :label="$t('xapp1s1.shop.ok')"
        @click="update"
      />
    </q-form>
    <q-inner-loading :showing="loading">
      <q-spinner-box size="50px" color="secondary" />
    </q-inner-loading>
  </q-page>
</template>

<script>

export default {
  name: "Shop",
  data() {
    return {
      loading: false,
      startTime: '09:00',
      endTime: '22:00',
      myShop: {},
    };
  },
  created() {
    this.$api.get("xapp1s1/shops/getMyShop").then((res) => {
      console.log(res);
      if (res.data.success === true) {
        this.myShop = res.data.data;
      }else{
        this.myShop = {
          name:null,
          starttime: '09:00',
          endtime: '22:00',
          status:null,
          phone:null,
          tel:null,
          addr:null,
          longitude:null,
          latitude:null,
        }
        console.log(typeof(this.myShop));
      }
      //this.myShop = res.data.data;
      //console.log(res);
    });
  },
  methods: {
    update() {
      this.loading = true;
      this.$api.post("xapp1s1/shops/updateMyShop", this.myShop).then((res) => {
        console.log(res.data);
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

<style scoped></style>
