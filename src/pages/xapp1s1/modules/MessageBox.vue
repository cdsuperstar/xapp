<template>
  <q-page padding class="q-pa-ma">
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="keyboard_arrow_left"
        @click="this.$router.back()"
      />
    </q-toolbar>
    <div class="q-pa-md row justify-center col-md-12">
      <div
        style="width: 100%"
        v-for="msg in store.ZUserMsg[toUser.user_id]"
        :key="msg.created_at"
      >
        <div v-if="msg.sender == theUser.id">
          <q-chat-message
            :avatar="this.theUser.xapp1s1profile_pub.avatar"
            :text="[msg.message]"
            bg-color="positive"
            sent
          />
        </div>
        <div v-if="msg.sender == toUser.user_id">
          <q-chat-message
            :name="toUser.user_pub.xapp1s1profile_pub.nickname"
            :avatar="toUser.user_pub.xapp1s1profile_pub.avatar"
            :text="[msg.message]"
            bg-color="info"
          />
        </div>
      </div>
    </div>
    <q-input
      square
      outlined
      dense
      v-model="message"
      @keypress.enter="sendMessage"
      class="col-md-12 items-end"
    >
      <template v-slot:after>
        <q-btn round dense flat icon="send" @click="sendMessage" />
      </template>
    </q-input>
  </q-page>
</template>

<script>
import { useZeroStore } from "stores/zero";
import { date } from "quasar";

export default {
  name: "MessageBox",
  props: ["user_id"],
  setup() {
    const store = useZeroStore();

    return {
      store,
    };
  },
  data() {
    return {
      toUser: {},
      theUser: {},
      message: "",
    };
  },
  created() {
    this.toUser = JSON.parse(this.$route.params.touser);
    this.theUser = this.$auth.user();
    if (this.store.ZUserMsg[this.toUser.user_id] == undefined) {
      this.store.ZUserMsg[this.toUser.user_id] = [];
    }
  },
  methods: {
    sendMessage() {
      this.$api
        .post("zero/sendMsgToUser/" + this.toUser.user_id, {
          message: this.message,
        })
        .then((res) => {});

      this.store.ZUserMsg[this.toUser.user_id].push({
        sender: this.theUser.id,
        reciver: this.toUser.user_id,
        message: this.message,
        created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
      });
      console.log(this.store.ZUserMsg);
      this.message = "";
    },
  },
};
</script>

<style lang="scss">
.offline {
  filter: grayscale(100%);
}
</style>
