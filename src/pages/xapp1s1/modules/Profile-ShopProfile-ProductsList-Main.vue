<template>
  <q-toolbar>
    <q-btn flat round dense icon="keyboard_arrow_left" to="xapp1s1shop" />

    <q-btn class="col-1" icon="add" flat to="xapp1s1createproduct" />
  </q-toolbar>
  <div class="q-pa-md">
    <q-pull-to-refresh @refresh="refresh">
      <div class="row justify-center q-gutter-sm">
        <div v-for="(item, index) in items" :key="index">
          <q-card class="q-ma-sm" style="width: 15vh; height: 25vh;">
            <q-badge color="secondary">
              {{ items.length - index }}
            </q-badge>
            <q-card-section>
              <div class="text-h8">{{ $t('xapp1s1.product.name') }}: {{ item.name }}</div>
              <div class="text-subtitle2">{{ $t('xapp1s1.product.tagprice') }}: {{ item.tagprice }}</div>
              <div class="text-subtitle2">{{ $t('xapp1s1.product.price') }}: {{ item.price }}</div>
              <div class="text-subtitle2">{{ $t('xapp1s1.product.timebegin') }}: {{ item.timebegin }}</div>    
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
