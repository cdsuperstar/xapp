<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-pink text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn round style="border: 0" to="/xapp1s1/login">
            <q-avatar size="42px">
              <q-img src="../assets/default_avatar.jpg" />
            </q-avatar>
          </q-btn>
          <label class="title">
            {{ $t("xapp1s1.layout.appName") }}
          </label>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-white q-pa-md" style="padding: 0">
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="choose"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-route-tab name="home" icon="home" to="/user/xapp1s1home">{{
              $t("xapp1s1.layout.home")
            }}</q-route-tab>
            <q-route-tab
              name="explore"
              icon="search"
              to="/user/xapp1s1explore"
              >{{ $t("xapp1s1.layout.explore") }}</q-route-tab
            >
            <q-route-tab
              name="notify"
              icon="notifications"
              to="/user/xapp1s1noti"
              >{{ $t("xapp1s1.layout.notify") }}</q-route-tab
            >
            <q-route-tab name="message" icon="message" to="/user/xapp1s1msg">{{
              $t("xapp1s1.layout.message")
            }}</q-route-tab>
            <q-route-tab
              name="personal"
              icon="person_outline"
              to="/user/xapp1s1personal"
              >{{ $t("xapp1s1.layout.personal") }}</q-route-tab
            >
          </q-tabs>
        </q-card>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "Xapp1s1MainLayout",
  data() {
    return {
      choose: "home",
      langs: [
        {
          label: "中文",
          value: "zh-CN",
        },
        {
          label: "English",
          value: "en-US",
        },
      ],
      lang: this.$i18n.locale,
    };
  },
};
</script>

<style scoped></style>
