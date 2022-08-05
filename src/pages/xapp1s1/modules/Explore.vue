<template>
  <q-page>
    <q-input rounded outlined v-model="search" label="Rounded outlined" />
    <q-separator />
    <q-item to="">
      <q-field square outlined style="width: 100vh">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ $t("xapp1s1.home.createGroup") }}
          </div>
        </template>
        <template v-slot:append>
          <q-avatar>
            <q-icon name="arrow-forward" size="50px"></q-icon>
          </q-avatar>
        </template>
      </q-field>
    </q-item>
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
      search: "",
    };
  },
};
</script>

<style scoped></style>
