<template>
  <q-page>
    <q-input
      v-model="searchParams.nameOrDescription"
      debounce="500"
      filled
      outlined
      :placeholder="this.$t('xapp1s1.activate.search')"
      @change="searchActivates"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-separator />

    <q-separator />

    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <q-intersection v-for="index in 10" :key="index" class="example-item">
          <q-card class="q-ma-sm" style="width: 15vh">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />

            <q-card-section>
              <div class="text-h6">Card #{{ index }}</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Explore",
  data() {
    return {
      searchParams: {
        nameOrDescription: null,
      },
      listActivates: [],
    };
  },
  methods: {
    searchActivates() {
      this.$api
        .post("/xapp1s1/activates/searchFitActivates", {
          searchParams: this.searchParams,
        })
        .then((res) => {
          if (res.data.success) {
            this.listActivates = res.data.data;
            console.log("Seached : ", this.listActivates);
          } else {
          }
        });
    },
  },
};
</script>

<style scoped></style>
