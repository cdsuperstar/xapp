<template>
  <show-shop v-if="hasShop" :shop_id="shop_id"></show-shop>
  <q-list v-else-if="!hasShop" bordered padding separator>
    <q-item clickable v-ripple to="/user/xapp1s1createshop">
      <q-item-section avatar>
        <q-icon name="edit" />
      </q-item-section>
      <q-item-section>
        <q-item-label>创建商铺</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import showShop from "components/showShop";
export default {
  name: "myShop",
  data() {
    return {
      shop_id: "",
      hasShop: false,
    };
  },
  components: {
    showShop,
  },
  created() {
    this.$api.get("xapp1s1/shops/getMyShop").then((res) => {
      if (res.data.success) {
        console.log(res.data.data);
        this.shop_id = res.data.data[0].id;
        this.hasShop = true;
      } else {
        this.hasShop = false;
      }
    });
  },
};
</script>

<style scoped></style>
