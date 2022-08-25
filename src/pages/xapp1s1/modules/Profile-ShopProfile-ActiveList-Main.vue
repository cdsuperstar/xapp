<template>
  <q-toolbar>
    <q-btn flat round dense icon="keyboard_arrow_left" to="xapp1s1shop" />
    <q-btn class="col-1" icon="add" flat to="xapp1s1createactive" />
  </q-toolbar>

  <q-card
    v-for="active in shop[0].activates"
    :key="active.index"
    class="my-card"
    flat
    bordered
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="shop[0].avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ active.name }}</q-item-label>
        <q-item-label caption>
          {{ $t("xapp1s1.activate.time") }}:{{
            active.timebegin.substring(0, active.timebegin.length - 3)
          }}~{{ active.timeend.substring(0, active.timeend.length - 3) }}
        </q-item-label>
        <q-item-label caption>
          {{ $t("xapp1s1.activate.address") }}:{{ active.address }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-8">{{ active.description }}</q-card-section>
      <q-separator vertical />

      <q-card-section class="col-4">
        <q-item-label
          >{{ $t("xapp1s1.activate.tagprice") }}:{{
            active.tagprice
          }}</q-item-label
        >
        <q-item-label
          >{{ $t("xapp1s1.activate.price") }}:{{ active.price }}</q-item-label
        >
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Profile-ShopProfile-ActiveList",
  data() {
    return {
      shop: "",
    };
  },
  created() {
    this.$api.get("/xapp1s1/shops/getMyactivates").then((res) => {
      if (res.data.success === true) {
        console.log(res.data.data);
        this.shop = res.data.data;
      }
    });
  },
};
</script>
.my-card width: 100% max-width: 100%
<style scoped></style>
