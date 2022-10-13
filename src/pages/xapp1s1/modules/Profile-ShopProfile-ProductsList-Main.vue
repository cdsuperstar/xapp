<template>
  <q-toolbar>
    <q-btn flat round dense icon="keyboard_arrow_left" to="xapp1s1shop" />

    <q-btn class="col-1" icon="add" flat to="xapp1s1createproduct" />
  </q-toolbar>
  <div class="q-pa-md">
    <q-pull-to-refresh @refresh="refresh">
      <div class="row q-gutter-sm">
        <div v-for="(item, index) in items" :key="index" style="width: 45%; height: 100%;">
          <q-card class="q-ma-sm" style="width: 100%; ">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" style="width: 100%; height: 100%;">
            <q-card-section class="row justify-evenly">
              <div class="text-h8 col-12">{{ item.name }}</div>
              <div class="row col-12">
                <div class="col-6" style="color:red;">¥{{ item.tagprice }}</div>
                <del class="col-6" style="color:gray;">{{ item.price }}</del>
              </div>
            </q-card-section>    
          </q-card>
        </div>
      </div>
    </q-pull-to-refresh>
  </div>

</template>

<script>
import { ref} from 'vue'

export default {
  // name: "shopProduct",
  data() {
    return {
      shop_id: "",
      hasShop: false,
      products: "",
      items: "",
    };
  },
  created() {
    this.$api.get("xapp1s1/shops/getMyShop").then((res) => {
      if (res.data.success) {
        this.shop_id = res.data.data[0].id;
        this.hasShop = true;
        this.$api.get("xapp1s1/shops/getMyShopProducts/" + this.shop_id).then((res) => {
          if (res.data.success === true) {
            console.log(res.data.data[0].products);
            this.items = JSON.parse(JSON.stringify(res.data.data[0].products));
          }
        })
      } else {
        this.hasShop = false;
      }
    })
  },
  // setup () {
  //   // const {proxy} = getCurrentInstance(); 
  //   const proxy = getCurrentInstance();
  //   console.log(proxy);
  //   console.log(proxy.uid);
  //   console.log(proxy.devtoolsRawSetupState);
  //   const i = proxy.data.products;
  //   console.log(i);





  //   const items = ref([ {}, {}, {}, {}, {}, {}, {}, {}, {} ])

  //   return {
  //     items,

  //     refresh (done) {
  //       setTimeout(() => {
  //         items.value.push({}, {}, {}, {}, {}, {}, {})
  //         done()
  //       }, 1000)
  //     }
  //   }
  // }
  methods: {
    refresh (done) {
      setTimeout(() => {
        this.$api.get("xapp1s1/shops/getMyShopProducts/" + this.shop_id).then((res) => {
          if (res.data.success === true) {
            console.log(res.data.data[0].products);
            this.items = JSON.parse(JSON.stringify(res.data.data[0].products));
          }
        })
        done()
      }, 1000)
    }
  }
};

</script>

<style scoped>
.example-item {
  height: 290px;
  width: 290px;
}
</style>
