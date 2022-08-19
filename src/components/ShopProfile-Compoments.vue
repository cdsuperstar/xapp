<template>
  <q-list bordered separator>
    <q-item>
      <q-item-section />
      <q-item-section avatar side>
        <q-avatar size="100px">
          <q-img :src="shopProfile.avatar"></q-img>
        </q-avatar>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>{{ $t("xapp1s1.shop.name") }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.name }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>{{ $t("xapp1s1.shop.addr") }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.addr }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>{{ $t("xapp1s1.shop.approval") }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.approval }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>{{ $t("xapp1s1.shop.phone") }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.phone }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>{{ $t("xapp1s1.shop.tel") }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.tel }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>{{ $t("xapp1s1.shop.status") }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.status }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>{{ $t("xapp1s1.shop.time") }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label
          >{{ shopProfile.starttime }} ~ {{ shopProfile.endtime }}</q-item-label
        >
      </q-item-section>
    </q-item>
  </q-list>
  <q-expansion-item
    expand-separator
    icon="perm_media"
    :label="$t(`xapp1s1.showShop.${picText[index]}`)"
    v-for="(p, index) in pic"
    :key="index"
  >
    <q-card>
      <q-card-section>
        <show-pic :pics="p"></show-pic>
      </q-card-section>
    </q-card>
  </q-expansion-item>

  <q-list bordered padding separator>
    <q-item clickable v-ripple to="/user/xapp1s1createshop">
      <q-item-section avatar>
        <q-icon name="edit" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("xapp1s1.shop.changeShop") }}</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/user/xapp1s1shopproducts">
      <q-item-section avatar>
        <q-icon name="checklist" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("xapp1s1.shop.productList") }}</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="xapp1s1sendactive">
      <q-item-section avatar>
        <q-icon name="groups" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("xapp1s1.shop.activeList") }}</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import showPic from "components/showPic";
export default {
  name: "ShopProfile",
  components: {
    showPic,
  },
  data() {
    return {
      shopProfile: "",
      pic: [],
      picText: [],
    };
  },
  props: {
    shop_id: {},
  },
  created() {
    this.picText = [
      "imgenvironments",
      "imgmenus",
      "imgothers",
      "imgproducts",
      "imgqualifications",
    ];
    if (this.shop_id) {
      this.$api
        .get("xapp1s1/shops/getTheShop/" + this.$props.shop_id)
        .then((res) => {
          if (res.data.success) {
            this.shopProfile = res.data.data[0];
            this.pic.push(this.shopProfile.imgenvironments);
            this.pic.push(this.shopProfile.imgmenus);
            this.pic.push(this.shopProfile.imgothers);
            this.pic.push(this.shopProfile.imgproducts);
            this.pic.push(this.shopProfile.imgqualifications);
            console.log(this.shopProfile);
          }
          //imgenvironments,imgmenus,imgothers,imgproducts,imgqualifications
        });
    }
  },
};
</script>

<style scoped></style>
