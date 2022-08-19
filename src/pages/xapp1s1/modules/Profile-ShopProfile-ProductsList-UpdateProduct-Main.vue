<template>
  <q-toolbar>
    <q-btn
      flat
      round
      dense
      icon="keyboard_arrow_left"
      to="xapp1s1shopproducts"
    />
  </q-toolbar>
  <q-page class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input
        outlined
        v-model="name"
        :label="$t('xapp1s1.product.name')"
        stack-label
      />
      <q-input
        outlined
        v-model="note"
        :label="$t('xapp1s1.product.note')"
        stack-label
      />
      <q-input
        outlined
        v-model="tagprice"
        :label="$t('xapp1s1.product.tagprice')"
        stack-label
      />
      <q-input
        outlined
        v-model="price"
        :label="$t('xapp1s1.product.price')"
        stack-label
      />
      <q-date v-model="datebegin" />
      <q-date v-model="dateend" />
      <div class="row q-pa-md">
        <q-input
          v-model="timebegin"
          mask="time"
          :rules="['time']"
          :hint="$t('xapp1s1.product.timebegin')"
          class="col-6"
          outlined
          rounded
          style="padding-right: 8px"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="timebegin">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-model="timeend"
          mask="time"
          :rules="['time']"
          :hint="$t('xapp1s1.product.timeend')"
          class="col-6"
          outlined
          rounded
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="timeend">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn
          push
          color="savebtn"
          :label="$t('xapp1s1.product.pub')"
          @click="createProduct"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  name: "createProducts",
  data() {
    return {
      name: "",
      tagprice: "",
      price: "",
      datebegin: date.formatDate(Date.now(), "YYYY/MM/DD"),
      dateend: date.formatDate(Date.now(), "YYYY/MM/DD"),
      timebegin: "",
      timeend: "",
      note: "",
      shop_id: "",
    };
  },
  created() {
    this.$api.get("xapp1s1/shops/getMyShop").then((res) => {
      if (res.data.success) {
        this.shop_id = res.data.data[0].id;
      }
    });
  },
  methods: {
    createProduct() {
      const productBox = {
        product: {
          name: this.name,
          tagprice: this.tagprice,
          price: this.price,
          timebegin: this.datebegin + " " + this.timebegin,
          timeend: this.dateend + " " + this.timeend,
          note: this.note,
        },
      };
      this.$api
        .post("xapp1s1/shops/saveMyShopProduct/" + this.shop_id, productBox)
        .then((res) => {
          if (res.data.success) {
            this.$zglobal.showMessage(
              "positive",
              "center",
              this.$t("auth.users.profile.success")
            );
            this.$router.go(-1);
          }
        });
    },
  },
};
</script>

<style scoped></style>
