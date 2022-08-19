<template>
  <q-list v-if="haveProfile" bordered separator>
    <q-item>
      <q-item-section />
      <q-item-section avatar side>
        <q-avatar size="100px">
          <q-img :src="myProfile.avatar"></q-img>
        </q-avatar>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>生日</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ myProfile.birthday }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>职业</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ myProfile.career }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>星座</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ myProfile.constellation }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>身高</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ myProfile.height }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>体重</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ myProfile.weight }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>收入情况</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label
          >{{ myProfile.incomebegin }} ~ {{ myProfile.incomeend }}</q-item-label
        >
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>婚姻情况</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ myProfile.marriage }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>昵称</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ myProfile.nickname }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>性别</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ sex[myProfile.sex] }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  <q-separator />
</template>

<script>
export default {
  name: "UserProfile",
  props: {
    user_id: {},
  },
  data() {
    return {
      myProfile: "",
      sex: { 1: "男", 2: "女" },
      haveProfile: true,
    };
  },
  created() {
    this.$api
      .get("xapp1s1/profile/getTheUserProfile/" + this.$props.user_id)
      .then((res) => {
        if (res.data.success) {
          this.myProfile = res.data.data;
        } else {
          this.haveProfile = false;
        }
      });
  },
};
</script>

<style scoped></style>
