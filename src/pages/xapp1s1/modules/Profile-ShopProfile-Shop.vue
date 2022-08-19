<template>
  <q-page>
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="keyboard_arrow_left"
        to="/user/xapp1s1profile"
      />
      <q-toolbar-title>
        <label class="title">
          {{ $t("xapp1s1.shop.header") }}
        </label>
      </q-toolbar-title>
    </q-toolbar>
    <show-shop :user_id="this.$auth.user()?.id"></show-shop>


    <q-inner-loading :showing="loading">
      <q-spinner-box size="50px" color="secondary" />
    </q-inner-loading>

  </q-page>
</template>

<script>
import showShop from "components/ShopProfile-Compoments";
export default {
  name: "Shop",
  components: {
    showShop,
  },
};
</script>

<style scoped>
.buttons {
  justify-content: space-around;
}
</style>
