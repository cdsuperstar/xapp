<template>
  <q-page padding class="q-pa-ma">
    {{ $route.params.user_id }}

    <div class="q-pa-md row justify-center col-md-12">
      <div style="width: 100%">
        <q-chat-message
          :name="$auth.user().id"
          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
          :text="['hey, how are you?']"
          sent
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
          :text="['doing fine, how r you?']"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "MessageBox",
  props: ["user_id"],
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="scss">
.offline {
  filter: grayscale(100%);
}
</style>
