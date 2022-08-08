<template>
  <q-page>
    <q-dialog v-model="avatarUpdate">
      <q-uploader
        url="http://localhost:8080/statics/"
        style="max-width: 300px"
      />
    </q-dialog>

    <q-avatar size="100px" style="margin: 10px" @click="avatarUpdate = true">
      <q-img :src="myProfile.avatar"></q-img>
    </q-avatar>

    <q-form class="q-gutter-md">
      <q-input
        outlined
        v-model="myProfile.realname"
        :label="$t('xapp1s1.profile.realName')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.idcard"
        :label="$t('xapp1s1.profile.idCard')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.phone"
        :label="$t('xapp1s1.profile.phone')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.companyname"
        :label="$t('xapp1s1.profile.companyName')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.nickname"
        :label="$t('xapp1s1.profile.nickname')"
        stack-label
      />
      <q-select
        :options="sex"
        outlined
        v-model="myProfile.sex"
        :label="$t('xapp1s1.profile.sex')"
        behavior="menu"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.height"
        :label="$t('xapp1s1.profile.height')"
        stack-label
      />
      <div class="q-pa-md">
        <q-badge color="secondary">
          Model: {{ income.min }} to {{ income.max }}
        </q-badge>

        <q-range v-model="income" :max="50000" :min="0" />
      </div>
      <q-input
        outlined
        v-model="income.min"
        :label="$t('xapp1s1.profile.incomeBegin')"
        stack-label
      />
      <q-input
        outlined
        v-model="income.max"
        :label="$t('xapp1s1.profile.incomeEnd')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.workaddress"
        :label="$t('xapp1s1.profile.workAddress')"
        stack-label
      />
      <q-select
        outlined
        :options="eduback"
        v-model="myProfile.eduback"
        :label="$t('xapp1s1.profile.eduBack')"
        behavior="menu"
        stack-label
      />
      <q-select
        outlined
        :options="marriage"
        v-model="myProfile.marriage"
        :label="$t('xapp1s1.profile.marriage')"
        behavior="menu"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.nativeplace"
        :label="$t('xapp1s1.profile.nativePlace')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.weight"
        :label="$t('xapp1s1.profile.weight')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.housesitu"
        :label="$t('xapp1s1.profile.houseSitu')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.carsitu"
        :label="$t('xapp1s1.profile.carSitu')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.smokesitu"
        :label="$t('xapp1s1.profile.smokeSitu')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.drinksitu"
        :label="$t('xapp1s1.profile.drinkSitu')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.childrensitu"
        :label="$t('xapp1s1.profile.childrenSitu')"
        stack-label
      />
      <q-input
        outlined
        v-model="myProfile.memo"
        :label="$t('xapp1s1.profile.memo')"
        stack-label
      />
      <q-btn
        color="deep-orange"
        glossy
        :label="$t('xapp1s1.profile.ok')"
        @click="update"
      />
    </q-form>

    

    <q-list bordered padding>
      
      <q-item-label header>User Controls</q-item-label>
      <q-item clickable v-ripple>
        <q-item :lable="$t('xapp1s1.shop.header')" to="/user/xapp1s1shop"></q-item>
          <q-item-label caption>
            
        </q-item-label> 
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Content filtering</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict apps that can be
            downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/user/xapp1s1shop">
        <q-item-section>
          <q-item-label>Password</q-item-label>
          <q-item-label caption>
            Require password for purchase or use password to restrict purchase
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-inner-loading :showing="loading">
      <q-spinner-box size="50px" color="secondary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      src: "../../../",
      loading: false,
      avatarUpdate: false,
      sex: ["男", "女"],
      myProfile: {},
      income: {
        min: 0,
        max: 50000,
      },
      eduback: ["小学及以下", "初中", "高中", "大专", "本科及以上"],
      marriage: ["未婚", "已婚", "离异", "丧偶"],
    };
  },
  created() {
    this.$api.get("xapp1s1/profile/getMyProfile").then((res) => {
      this.myProfile = res.data.data;
      this.income.min = this.myProfile.incomebegin;
      this.income.max = this.myProfile.incomeend;
      console.log(res);
    });
  },
  methods: {
    update() {
      this.loading = true;
      this.myProfile.incomebegin = this.income.min;
      this.myProfile.incomeend = this.income.max;
      this.$api
        .post("xapp1s1/profile/updateMyProfile", this.myProfile)
        .then((res) => {
          if (res.data.success === true) {
            this.loading = false;
            this.$zglobal.showMessage(
              "positive",
              "center",
              this.$t("auth.users.profile.success")
            );
          } else {
            this.loading = false;
            this.$zglobal.showMessage(
              "red-5",
              "center",
              this.$t("auth.register.invalid_data") + ":" + res.data.code
            );
          }
        });
    },
  },
};
</script>

<style scoped></style>
