<template>
  <q-toolbar>
    <q-btn flat round dense icon="keyboard_arrow_left" to="xapp1s1shop" />

    <q-btn class="col-1" icon="add" flat to="xapp1s1createproduct" />
  </q-toolbar>
  <div class="q-pa-md">
      <q-pull-to-refresh @refresh="refresh">
      <div class="row justify-center q-gutter-sm">
        <div v-for="(item, index) in items" :key="index">
        <q-card class="q-ma-sm" style="width: 25vh">
          <q-badge color="secondary">
          {{ items.length - index }}
          </q-badge>
          <img src="https://cdn.quasar.dev/img/mountains.jpg" draggable="false">
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </div>
      </div>
    </q-pull-to-refresh>
  </div>

</template>

<script>
import { ref } from 'vue'

export default {
  name: "shopProduct",
  setup() {
    const items = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}])

    return {
      items,

      refresh(done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 1000)
      }
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
