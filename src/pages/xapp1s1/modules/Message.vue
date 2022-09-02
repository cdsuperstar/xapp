<template>
  <q-page padding class="q-pa-ma">
    <!--    查询 ...   -->
    <q-input
      borderless
      v-model="searchContent"
      :label="this.$t('aggrid.searchOoo')"
      class="col-md-12 shadow-1"
      maxlength="24"
      :dense="true"
    >
      <template v-slot:before>
        <q-icon name="search" />
      </template>
    </q-input>
    <!--    相关关注列表  -->
    <q-list bordered v-for="p in likedUserList" :key="p.id">
      <q-separator />

      <q-item
        clickable
        v-if="
          p.user_pub.xapp1s1profile_pub?.nickname
            .toLowerCase()
            .includes(searchContent.toLowerCase())
        "
        @click="toMessageBox(p)"
        v-ripple
        :class="p.user_pub.oauth_access_token ? '' : 'offline'"
      >
        <q-item-section avatar>
          <q-avatar rounded>
            <img :src="p.user_pub.xapp1s1profile_pub.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            >{{ p.user_pub.xapp1s1profile_pub.nickname }}
          </q-item-label>
          <q-item-label caption lines="2">xxxxxxx.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption
            >{{
              p.user_pub.oauth_access_token
                ? getOnlineMinutes(p.user_pub.oauth_access_token.created_at)
                : "--"
            }}
          </q-item-label>
          <q-icon
            :name="p.user_pub.like ? 'favorite' : 'favorite_border'"
            color="red"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  name: "MessageList",
  components: {},
  data() {
    return {
      searchContent: "",
      likedUserList: [],
    };
  },
  methods: {
    toMessageBox(user) {
      if (!user.user_pub.oauth_access_token) {
        this.$zglobal.showMessage("negative", "center", "User not online.");
      } else if (!user.user_pub.like) {
        this.$zglobal.showMessage("negative", "center", "User not like you.");
      } else {
        this.$router.push({
          name: "xapp1s1msgbox",
          params: { user_id: user.user_pub.id },
        });
      }
    },
    getOnlineMinutes(d) {
      let tmpMinutes = date.getDateDiff(Date.now(), d, "minutes");
      let tmpRet = "";
      tmpRet += Math.floor(tmpMinutes / 60)
        ? Math.floor(tmpMinutes / 60) + this.$t("datetime.hour")
        : "";
      tmpRet += (tmpMinutes % 60) + this.$t("datetime.minute");
      return tmpRet;
    },
  },
  created() {
    this.$api
      .get("/xapp1s1/profile/getMyLikedUsers")
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          this.likedUserList = res.data.data;
        } else {
        }
      })
      .catch((e) => {});
  },
};
</script>

<style lang="scss">
.offline {
  filter: grayscale(100%);
}
</style>
