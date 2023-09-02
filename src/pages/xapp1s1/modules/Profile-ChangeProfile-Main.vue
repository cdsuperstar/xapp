<template>
  <q-page class="q-pa-md">
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="keyboard_arrow_left"
        @click="this.$router.back()"
      />
    </q-toolbar>
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
        <q-input
          class="col-6"
          outlined
          v-model="myProfile.height"
          :label="$t('xapp1s1.profile.height')"
          stack-label
          style="padding-right: 8px"
        />
        <q-input
          class="col-6"
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
      <q-select
        outlined
        :options="career"
        behavior="menu"
        v-model="myProfile.career"
        :label="$t('xapp1s1.profile.career')"
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
        <q-select
          class="col-6"
          outlined
          :options="houseChoose"
          v-model="myProfile.housesitu"
          :label="$t('xapp1s1.profile.houseSitu')"
          behavior="menu"
          stack-label
        />
        <q-select
          class="col-6"
          outlined
          :options="carChoose"
          v-model="myProfile.carsitu"
          :label="$t('xapp1s1.profile.carSitu')"
          behavior="menu"
          stack-label
          style="padding-right: 8px; padding-top: 12px"
        />
        <q-select
          class="col-6"
          outlined
          :options="smokeChoose"
          v-model="myProfile.smokesitu"
          :label="$t('xapp1s1.profile.smokeSitu')"
          behavior="menu"
          stack-label
          style="padding-top: 12px"
        />
        <q-select
          class="col-6"
          outlined
          :options="drinkChoose"
          v-model="myProfile.drinksitu"
          :label="$t('xapp1s1.profile.drinkSitu')"
          behavior="menu"
          stack-label
          style="padding-right: 8px; padding-top: 12px"
        />
        <q-select
          class="col-6"
          outlined
          :options="childChoose"
          v-model="myProfile.childrensitu"
          :label="$t('xapp1s1.profile.childrenSitu')"
          behavior="menu"
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

    <q-inner-loading :showing="loading">
      <q-spinner-box size="50px" color="secondary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { province } from "components/xapp1s1/province";
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
      houseChoose: [
        "",
        "和家人同住",
        "已购房",
        "租房",
        "打算婚后购房",
        "住在单位宿舍",
      ],
      smokeChoose: [
        "",
        "不抽烟",
        "稍微抽一点烟",
        "烟抽得很多",
        "社交场合会抽烟",
      ],
      drinkChoose: [
        "",
        "不喝酒",
        "稍微喝一点酒",
        "酒喝得很多",
        "社交场合会喝酒",
      ],
      carChoose: ["", "已购车", "未购车"],
      childChoose: [
        "",
        "没有孩子",
        "有孩子且住在一起",
        "有孩子且偶尔会一起住",
        "有孩子但不在身边",
      ],
      eduback: ["", "中专", "高中及以下", "大专", "大学本科", "硕士", "博士"],
      marriage: ["", "未婚", "已婚", "离异", "丧偶"],
      career: [
        "",
        "教师",
        "工人",
        "记者",
        "演员",
        "厨师",
        "医生",
        "护士",
        "司机",
        "军人",
        "律师",
        "商人",
        "会计",
        "店员",
        "出纳",
        "作家",
        "导游",
        "模特",
        "警察",
        "歌手",
        "画家",
        "裁缝",
        "翻译",
        "法官",
        "保安",
        "花匠",
        "服务员",
        "清洁工",
        "建筑师",
        "理发师",
        "采购员",
        "设计师",
        "消防员",
        "机修工",
        "推销员",
        "魔术师",
        "模特儿",
        "邮递员",
        "售货员",
        "救生员",
        "运动员",
        "工程师",
        "飞行员",
        "管理员",
        "机械师",
        "经纪人",
        "审计员",
        "漫画家",
        "园艺师",
        "科学家",
        "主持人",
        "调酒师",
        "化妆师",
        "音乐节",
        "艺术家",
        "糕点师",
        "甜品师",
        "运动员",
        "外交官",
        "舞蹈",
        "箭术",
        "演员",
        "溜冰",
        "弹钢琴",
        "古筝手",
        "设计师",
        "酒吧老板",
        "CEO",
        "游乐园老板",
        "机长",
        "记者",
        "赛车手",
        "律师",
        "理发师",
        "跆拳道教练",
        "运动员",
        "兽医",
        "特警",
        "按摩",
        "其它职业",
      ],
      city: [
        "",
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
        "",
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

        let tmp2 = province.filter((value) => {
          return this.myProfile.province == value.name;
        })[0];
        this.address.province = tmp2 ? tmp2 : { name: "", city: [] };

        let tmp3 = this.address.province.city.filter((value) => {
          return this.myProfile.city == value.name;
        })[0];
        this.address.city = tmp3 ? tmp3 : { name: "", area: [] };

        this.address.area = this.myProfile.district;
        this.address.info = this.myProfile.addr;
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
      this.myProfile.province = this.address.province.name;
      this.myProfile.city = this.address.city.name;
      this.myProfile.district = this.address.area;
      this.myProfile.addr = this.address.info;
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
