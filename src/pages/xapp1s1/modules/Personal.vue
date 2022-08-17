<template>
  <q-page class="q-pa-md">
    <q-form class="q-gutter-md">
      <div class="row">
        <div class="col-6">
          <q-avatar size="100px" style="margin: 10px">
            <q-img :src="myProfile.avatar"></q-img>
          </q-avatar>
        </div>
        <div class="col-6">
          <update-media
            :server="this.$api.defaults.baseURL + '/zero/uploadMyTmpFiles'"
            media_file_path="/post_images"
            :media_server="this.$api.defaults.baseURL + '/zero/getMyTmpFiles'"
            @saved-media="mediaSave"
            @added-media="mediaAdd"
            @deleted-media="mediaDel"
            :multiple="false"
            :headers="{
              Authorization: 'Bearer ' + this.$auth.token(),
            }"
          >
          </update-media>
        </div>
      </div>
      <div class="row">
        <q-input
          class="col-6"
          outlined
          v-model="myProfile.nickname"
          :label="$t('xapp1s1.profile.nickname')"
          stack-label
          style="padding-right: 8px"
        />
        <q-input
          class="col-6"
          outlined
          v-model="myProfile.realname"
          :label="$t('xapp1s1.profile.realName')"
          stack-label
        />
      </div>
      <q-input
        outlined
        v-model="myProfile.idcard"
        :label="$t('xapp1s1.profile.idCard')"
        stack-label
      />
      <div class="row">
        <q-input
          class="col-6"
          outlined
          v-model="myProfile.phone"
          :label="$t('xapp1s1.profile.phone')"
          stack-label
          style="padding-right: 8px"
        />
        <q-select
          class="col-6"
          :options="nationality"
          outlined
          v-model="myProfile.nationality"
          :label="$t('xapp1s1.profile.nationality')"
          behavior="menu"
          option-value="name"
          option-label="name"
          stack-label
        />
      </div>
      <div class="row">
        <q-select
          class="col-4"
          :options="sex"
          outlined
          v-model="myProfile.sex"
          :label="$t('xapp1s1.profile.sex')"
          behavior="menu"
          stack-label
          style="padding-right: 8px"
        />
        <q-input
          class="col-4"
          outlined
          v-model="myProfile.height"
          :label="$t('xapp1s1.profile.height')"
          stack-label
          style="padding-right: 8px"
        />
        <q-input
          class="col-4"
          outlined
          v-model="myProfile.weight"
          :label="$t('xapp1s1.profile.weight')"
          stack-label
        />
      </div>
      <div class="row">
        <q-select
          class="col-6"
          outlined
          :options="eduback"
          v-model="myProfile.eduback"
          :label="$t('xapp1s1.profile.eduBack')"
          behavior="menu"
          stack-label
          style="padding-right: 8px"
        />
        <q-select
          class="col-6"
          outlined
          :options="city"
          behavior="menu"
          v-model="myProfile.nativeplace"
          :label="$t('xapp1s1.profile.nativePlace')"
          stack-label
        />
      </div>
      <q-input
        outlined
        v-model="myProfile.companyname"
        :label="$t('xapp1s1.profile.companyName')"
        stack-label
      />
      <div class="q-pa-md">
        <q-item color="grey">
          {{ $t("xapp1s1.profile.income", [income.min, income.max]) }}
        </q-item>
        <div class="row">
          <q-input
            class="col"
            outlined
            v-model="income.min"
            :label="$t('xapp1s1.profile.incomeBegin')"
            stack-label
            dense
          />
          <q-input
            class="col"
            outlined
            v-model="income.max"
            :label="$t('xapp1s1.profile.incomeEnd')"
            stack-label
            dense
          />
        </div>
        <q-range v-model="income" :max="50000" :min="0" />
      </div>
      <div class="row">
        <q-select
          class="col"
          outlined
          :options="province"
          v-model="address.province"
          :label="$t('xapp1s1.profile.workAddress.province')"
          behavior="menu"
          stack-label
          map-options
          option-label="name"
          option-value="city"
          style="padding-right: 8px"
          @update:model-value="
            address.city = '';
            address.area = '';
          "
        />
        <q-select
          class="col"
          outlined
          :options="address.province.city ? address.province.city : null"
          v-model="address.city"
          :label="$t('xapp1s1.profile.workAddress.city')"
          behavior="menu"
          stack-label
          map-options
          option-label="name"
          option-value="area"
          style="padding-right: 8px"
          @update:model-value="address.area = ''"
        />
        <q-select
          class="col"
          outlined
          :options="address.city.area ? address.city.area : null"
          v-model="address.area"
          :label="$t('xapp1s1.profile.workAddress.area')"
          behavior="menu"
          stack-label
        />
      </div>
      <q-input
        class="row"
        outlined
        v-model="address.info"
        :label="$t('xapp1s1.profile.workAddress.info')"
        stack-label
      />
      <div class="row">
        <q-select
          class="col-6"
          outlined
          :options="marriage"
          v-model="myProfile.marriage"
          :label="$t('xapp1s1.profile.marriage')"
          behavior="menu"
          stack-label
          style="padding-right: 8px"
        />
        <q-input
          outlined
          class="col-6"
          v-model="myProfile.housesitu"
          :label="$t('xapp1s1.profile.houseSitu')"
          stack-label
        />
        <q-input
          class="col-6"
          outlined
          v-model="myProfile.carsitu"
          :label="$t('xapp1s1.profile.carSitu')"
          stack-label
          style="padding-right: 8px; padding-top: 12px"
        />
        <q-input
          class="col-6"
          outlined
          v-model="myProfile.smokesitu"
          :label="$t('xapp1s1.profile.smokeSitu')"
          stack-label
          style="padding-top: 12px"
        />
        <q-input
          class="col-6"
          outlined
          v-model="myProfile.drinksitu"
          :label="$t('xapp1s1.profile.drinkSitu')"
          stack-label
          style="padding-right: 8px; padding-top: 12px"
        />
        <q-input
          class="col-6"
          outlined
          v-model="myProfile.childrensitu"
          :label="$t('xapp1s1.profile.childrenSitu')"
          stack-label
          style="padding-top: 12px"
        />
      </div>
      <q-input
        outlined
        v-model="myProfile.memo"
        type="textarea"
        :label="$t('xapp1s1.profile.memo')"
        stack-label
      />
      <div class="row">
        <q-btn
          class="col-4 offset-4"
          color="secondary"
          glossy
          :label="$t('xapp1s1.profile.ok')"
          style="margin-bottom: 20px"
          @click="update"
        />
      </div>
    </q-form>

    <q-list bordered padding>
      <q-item dense clickable v-ripple to="/user/xapp1s1shop">
        <q-item-section>
          <q-item-label>{{ $t("xapp1s1.profile.shop") }}</q-item-label>
        </q-item-section>
        <q-item-section thumbnail>
          <q-icon name="navigate_next" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn push color="savebtn" label="发起活动" to="xapp1s1sendactive" />
    <q-inner-loading :showing="loading">
      <q-spinner-box size="50px" color="secondary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { province } from "components/province";
import { UpdateMedia } from "../../../components/vue-media-upload";

export default {
  name: "Personal",
  components: {
    UpdateMedia,
  },
  data() {
    return {
      province,
      loading: false,
      sex: ["男", "女"],
      myProfile: {},
      income: {
        min: 0,
        max: 50000,
      },
      address: {
        province: "",
        city: "",
        area: "",
        info: "",
      },
      eduback: ["小学及以下", "初中", "高中", "大专", "本科及以上"],
      marriage: ["未婚", "已婚", "离异", "丧偶"],
      city: [
        "全国",
        "北京市",
        "天津市",
        "河北省",
        "山西省",
        "内蒙古自治区",
        "辽宁省",
        "吉林省",
        "黑龙江省",
        "上海市",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省",
        "河南省",
        "湖北省",
        "湖南省",
        "广东省",
        "广西壮族自治区",
        "海南省",
        "重庆市",
        "四川省",
        "贵州省",
        "云南省",
        "西藏自治区",
        "陕西省",
        "甘肃省",
        "青海省",
        "宁夏回族自治区",
        "新疆维吾尔自治区",
        "香港特别行政区",
        "澳门特别行政区",
      ],
      nationality: [
        "汉族",
        "蒙古族",
        "回族",
        "藏族",
        "维吾尔族",
        "苗族",
        "彝族",
        "壮族",
        "布依族",
        "朝鲜族",
        "满族",
        "侗族",
        "瑶族",
        "白族",
        "土家族",
        "哈尼族",
        "哈萨克族",
        "傣族",
        "黎族",
        "傈僳族",
        "佤族",
        "畲族",
        "高山族",
        "拉祜族",
        "水族",
        "东乡族",
        "纳西族",
        "景颇族",
        "柯尔克孜族",
        "土族",
        "达斡尔族",
        "仫佬族",
        "羌族",
        "布朗族",
        "撒拉族",
        "毛南族",
        "仡佬族",
        "锡伯族",
        "阿昌族",
        "普米族",
        "塔吉克族",
        "怒族",
        "乌孜别克族",
        "俄罗斯族",
        "鄂温克族",
        "德昂族",
        "保安族",
        "裕固族",
        "京族",
        "塔塔尔族",
        "独龙族",
        "鄂伦春族",
        "赫哲族",
        "门巴族",
        "珞巴族",
        "基诺族",
      ],
    };
  },
  created() {
    this.$api.get("xapp1s1/profile/getMyProfile").then((res) => {
      if (res.data.success === true) {
        this.myProfile = res.data.data;
        this.income.min = this.myProfile.incomebegin;
        this.income.max = this.myProfile.incomeend;
        const tmp = JSON.parse(this.myProfile.workaddress);
        //已知：数据库长度不够，存在数据库中的数据只有地址没有存其他的选项
        //通过filter筛选出province中对应项目解决问题
        let tmp2 = province.filter((value) => {
          return tmp.province == value.name;
        })[0];
        this.address.province = tmp2 ? tmp2 : { name: "", city: [] };

        let tmp3 = this.address.province.city.filter((value) => {
          return tmp.city == value.name;
        })[0];
        this.address.city = tmp3 ? tmp3 : { name: "", area: [] };

        this.address.area = tmp.area;
        this.address.info = tmp.info;
      }
    });
  },
  methods: {
    mediaSave(val) {
      // console.log("save", val);
    },
    mediaAdd(val) {
      if (val.length > 0) {
        this.$api
          .post("/xapp1s1/profile/updateMyAvatar", { filenames: val })
          .then((res) => {
            if (res.data.success === true) {
              this.myProfile.avatar = res.data.data.avatar;
            }
          });
      }
      // console.log("add", val);
    },
    mediaDel(val) {
      if (val.length > 0) {
        this.$api
          .post("/zero/delMyTmpFiles", { filenames: val })
          .then((res) => {
            if (res.data.success === true) {
            }
          });
        // console.log("mediaDel: ", val);
      }
    },
    update() {
      this.loading = true;
      this.myProfile.incomebegin = this.income.min;
      this.myProfile.incomeend = this.income.max;
      const tmp = {
        province: this.address.province.name,
        city: this.address.city.name,
        area: this.address.area,
        info: this.address.info,
      };
      this.myProfile.workaddress = JSON.stringify(tmp);
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
