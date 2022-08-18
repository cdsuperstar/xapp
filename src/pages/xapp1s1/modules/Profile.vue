<template>
  <show-profile :user_id="this.$auth.user()?.id"></show-profile>

  <div class="div" style="height: 20px"></div>

  <q-list bordered padding separator>
    <q-item clickable v-ripple to="/user/xapp1s1personal">
      <q-item-section avatar>
        <q-icon name="edit" />
      </q-item-section>
      <q-item-section>
        <q-item-label>修改个人信息</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/user/xapp1s1shop">
      <q-item-section avatar>
        <q-icon name="store" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("xapp1s1.profile.shop") }}</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import showProfile from "components/showProfile";
export default {
  name: "Profile",
  components: {
    showProfile,
  },
};
</script>

<style scoped></style>
