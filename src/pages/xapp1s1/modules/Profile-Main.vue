<template>
  <UserProfile :user_id="this.$auth.user()?.id"></UserProfile>

  <div class="div" style="height: 20px"></div>

  <q-list bordered padding separator>
    <q-item clickable v-ripple to="xapp1s1personal">
      <q-item-section avatar>
        <q-icon name="edit" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("xapp1s1.profile.changeProfile") }}</q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-icon name="navigate_next" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="xapp1s1shopinfo">
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
import UserProfile from "components/UserProfile-Compoments";
export default {
  name: "Profile",
  components: {
    UserProfile,
  },
};
</script>

<style scoped></style>
