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
        <q-item-label caption>店铺名</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.name }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>地址</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.addr }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>许可</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.approval }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>联系电话1</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.phone }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>联系电话2</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.tel }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>营业状态</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ shopProfile.status }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>营业时间</q-item-label>
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
        <q-item-label>修改商铺信息</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/user/xapp1s1profile">
      <q-item-section avatar>
        <q-icon name="edit" />
      </q-item-section>
      <q-item-section>
        <q-item-label>返回个人信息</q-item-label>
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
  name: "showShop",
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
    this.$api
      .get("xapp1s1/shops/getTheShop/" + this.$props.shop_id)
      .then((res) => {
        if (res.data.success) {
          this.shopProfile = res.data.data[0];
          this.pic.push(JSON.parse(this.shopProfile.imgenvironments));
          this.pic.push(JSON.parse(this.shopProfile.imgmenus));
          this.pic.push(JSON.parse(this.shopProfile.imgothers));
          this.pic.push(JSON.parse(this.shopProfile.imgproducts));
          this.pic.push(JSON.parse(this.shopProfile.imgqualifications));
          console.log(this.shopProfile);
        }
        //imgenvironments,imgmenus,imgothers,imgproducts,imgqualifications
      });
  },
};
</script>

<style scoped></style>
