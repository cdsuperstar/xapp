<template>
  <q-toolbar>
    <q-btn flat round dense icon="keyboard_arrow_left" @click="goBack" />
  </q-toolbar>
  <shop-profile v-if="hasShop" :shop_id="shop_id"></shop-profile>
  <q-list v-else-if="!hasShop" bordered padding separator>
    <q-item clickable v-ripple to="xapp1s1createshop">
      <q-item-section avatar>
        <q-icon name="edit" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("xapp1s1.profile.createShop") }}</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import ShopProfile from "components/xapp1s1/ShopProfile-Compoments";
export default {
  name: "myShop",
  data() {
    return {
      shop_id: "",
      hasShop: false,
    };
  },
  components: {
    ShopProfile,
  },
  created() {
    this.$api.get("xapp1s1/shops/getMyShop").then((res) => {
      if (res.data.success) {
        this.shop_id = res.data.data[0].id;
        this.hasShop = true;
      } else {
        this.hasShop = false;
      }
    });
  },
  methods: {
    goBack() {
      history.back();
    },
  },
};
</script>

<style scoped></style>
