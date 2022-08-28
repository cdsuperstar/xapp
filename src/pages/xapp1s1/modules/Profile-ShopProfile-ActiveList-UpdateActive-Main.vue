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
      <q-input
        outlined
        v-model="activeInfo.name"
        :label="$t('xapp1s1.activate.name')"
        stack-label
      />
      <q-input
        outlined
        v-model="activeInfo.description"
        :label="$t('xapp1s1.activate.description')"
        stack-label
      />
      <q-input
        outlined
        v-model="activeInfo.tagprice"
        :label="$t('xapp1s1.activate.tagprice')"
        stack-label
      />
      <q-input
        outlined
        v-model="activeInfo.price"
        :label="$t('xapp1s1.activate.price')"
        stack-label
      />
      <q-date v-model="activeInfo.datebegin" />
      <q-date v-model="activeInfo.dateend" />
      <div class="row q-pa-md">
        <q-input
          v-model="activeInfo.timebegin"
          mask="time"
          :rules="['time']"
          :hint="$t('xapp1s1.activate.timebegin')"
          class="col-6"
          outlined
          rounded
          style="padding-right: 8px"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="activeInfo.timebegin">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-model="activeInfo.timeend"
          mask="time"
          :rules="['time']"
          :hint="$t('xapp1s1.activate.timeend')"
          class="col-6"
          outlined
          rounded
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="activeInfo.timeend">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <q-input
        outlined
        v-model="activeInfo.address"
        :label="$t('xapp1s1.activate.address')"
        stack-label
      />
      <!--      要做人数限制-->
      <q-input
        outlined
        type=""
        v-model="activeInfo.slot"
        :label="$t('xapp1s1.activate.slot')"
        @change="setSlotsNum"
        stack-label
        maxlength="2"
      />
      <q-expansion-item
        icon="chair"
        :label="$t('xapp1s1.activate.slots', [index + 1])"
        v-for="(slt, index) in activeInfo.slots"
        :key="index"
      >
        <div class="row">
          <!--          <q-select-->
          <!--            class="col-4"-->
          <!--            :options="sex"-->
          <!--            outlined-->
          <!--            v-model="activeInfo.slots[sl].sex"-->
          <!--            :label="$t('xapp1s1.profile.sex')"-->
          <!--            behavior="menu"-->
          <!--            stack-label-->
          <!--            style="padding-right: 8px"-->
          <!--          />-->

          <q-input class="col-7" outlined v-model="slt.heightbegin" stack-label>
            <template v-slot:before>
              <div class="" style="font-size: medium">
                {{ $t("xapp1s1.profile.height") }}:
              </div>
            </template>
          </q-input>
          <q-input class="col-5" outlined v-model="slt.heightend" stack-label>
            <template v-slot:before>
              <div class="" style="font-size: medium">~</div>
            </template>
          </q-input>

          <q-input class="col-7" outlined v-model="slt.incomebegin" stack-label>
            <template v-slot:before>
              <div class="" style="font-size: medium">
                {{ $t("xapp1s1.profile.incomeSit") }}:
              </div>
            </template>
          </q-input>
          <q-input class="col-5" outlined v-model="slt.incomeend" stack-label>
            <template v-slot:before>
              <div class="" style="font-size: medium">~</div>
            </template>
          </q-input>

          <q-input class="col-7" outlined v-model="slt.weightbegin" stack-label>
            <template v-slot:before>
              <div class="" style="font-size: medium">
                {{ $t("xapp1s1.profile.weight") }}:
              </div>
            </template>
          </q-input>
          <q-input class="col-5" outlined v-model="slt.weightend" stack-label>
            <template v-slot:before>
              <div style="font-size: medium">~</div>
            </template>
          </q-input>

          <q-input class="col-7" outlined v-model="slt.agebegin" stack-label>
            <template v-slot:before>
              <div class="" style="font-size: medium">
                {{ $t("xapp1s1.activate.age") }}:
              </div>
            </template>
          </q-input>
          <q-input class="col-5" outlined v-model="slt.ageend" stack-label>
            <template v-slot:before>
              <div style="font-size: medium">~</div>
            </template>
          </q-input>

          <q-input
            class="col-12"
            outlined
            v-model="slt.note"
            :label="$t('xapp1s1.activate.note')"
            stack-label
          />
          <q-input
            class="col-6"
            outlined
            v-model="slt.price"
            :label="$t('xapp1s1.activate.price')"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            :options="sex"
            v-model="slt.sex"
            :emit-value="true"
            :map-options="true"
            :label="$t('xapp1s1.profile.sex')"
            behavior="menu"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            v-model="slt.constellation"
            multiple
            :options="constellation"
            behavior="menu"
            :label="$t('xapp1s1.activate.constellation')"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            v-model="slt.marriage"
            multiple
            :options="marriage"
            behavior="menu"
            :label="$t('xapp1s1.profile.marriage')"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            v-model="slt.eduback"
            multiple
            :options="eduback"
            behavior="menu"
            :label="$t('xapp1s1.profile.eduBack')"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            v-model="slt.career"
            multiple
            :options="career"
            behavior="menu"
            :label="$t('xapp1s1.profile.career')"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            v-model="slt.housesitu"
            multiple
            :options="houseChoose"
            behavior="menu"
            :label="$t('xapp1s1.profile.houseSitu')"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            :options="carChoose"
            v-model="slt.carsitu"
            :label="$t('xapp1s1.profile.carSitu')"
            behavior="menu"
            stack-label
          />

          <q-select
            class="col-12"
            outlined
            v-model="slt.smokesitu"
            multiple
            :options="smokeChoose"
            behavior="menu"
            :label="$t('xapp1s1.profile.smokeSitu')"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            v-model="slt.drinksitu"
            multiple
            :options="drinkChoose"
            behavior="menu"
            :label="$t('xapp1s1.profile.drinkSitu')"
            stack-label
          />
          <q-select
            class="col-12"
            outlined
            v-model="slt.childrensitu"
            multiple
            :options="childChoose"
            behavior="menu"
            :label="$t('xapp1s1.profile.childrenSitu')"
            stack-label
          />
        </div>
        <!--        <div class="row">-->
        <!--          <q-select-->
        <!--            class="col-6"-->
        <!--            outlined-->
        <!--            :options="eduback"-->
        <!--            v-model="activeInfo.slots[sl].eduback"-->
        <!--            :label="$t('xapp1s1.profile.eduBack')"-->
        <!--            behavior="menu"-->
        <!--            stack-label-->
        <!--            style="padding-right: 8px"-->
        <!--          />-->
        <!--          <q-select-->
        <!--            class="col-6"-->
        <!--            outlined-->
        <!--            :options="city"-->
        <!--            behavior="menu"-->
        <!--            v-model="activeInfo.slots[sl].nativeplace"-->
        <!--            :label="$t('xapp1s1.profile.nativePlace')"-->
        <!--            stack-label-->
        <!--          />-->
        <!--        </div>-->
      </q-expansion-item>
      <update-media
        v-if="activeInfo.id"
        :server="
          this.$api.defaults.baseURL +
          `/xapp1s1/activates/uploadMyActivateFiles/${activeInfo.id}`
        "
        :media_server="
          this.$api.defaults.baseURL +
          `/xapp1s1/activates/getMyActivateFiles/${activeInfo.id}`
        "
        @deleted-media="mediaDel"
        :collention="cl"
        :multiple="true"
        :headers="{
          Authorization: 'Bearer ' + this.$auth.token(),
        }"
      >
      </update-media>
    </q-form>
    <q-btn
      push
      color="savebtn"
      :label="$t('xapp1s1.activate.pub')"
      @click="createActive"
    />
    <q-btn
      push
      color="grey"
      :label="$t('xapp1s1.activate.cancel')"
      @click="this.$router.back()"
    />
  </q-page>
</template>

<script>
import { date } from "quasar";
import { UpdateMedia } from "../../../components/vue-media-upload";
export default {
  name: "Active",
  components: { UpdateMedia },
  data() {
    return {
      active: null,
      modal: null,
      //test
      activeInfo: {},
      //选项
      marriage: ["不限", "未婚", "已婚", "离异", "丧偶"],
      houseChoose: [
        "不限",
        "和家人同住",
        "已购房",
        "租房",
        "打算婚后购房",
        "住在单位宿舍",
      ],
      smokeChoose: [
        "不限",
        "不抽烟",
        "稍微抽一点烟",
        "烟抽得很多",
        "社交场合会抽烟",
      ],
      drinkChoose: [
        "不限",
        "不喝酒",
        "稍微喝一点酒",
        "酒喝得很多",
        "社交场合会喝酒",
      ],
      carChoose: ["不限", "已购车", "未购车"],
      childChoose: [
        "不限",
        "没有孩子",
        "有孩子且住在一起",
        "有孩子且偶尔会一起住",
        "有孩子但不在身边",
      ],
      eduback: [
        "不限",
        "中专",
        "高中及以下",
        "大专",
        "大学本科",
        "硕士",
        "博士",
      ],
      career: [
        "不限",
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
      sex: [
        { label: "不限", value: "0" },
        { label: "女", value: "2" },
        { label: "男", value: "1" },
      ],
      constellation: [
        "不限",
        "白羊座",
        "金牛座",
        "双子座",
        "巨蟹座",
        "狮子座",
        "处女座",
        "天秤座",
        "射手座",
        "摩羯座",
        "水瓶座",
        "双鱼座",
      ],
    };
  },
  mounted() {
    if (this.$route.params.active) {
      this.active = JSON.parse(this.$route.params.active);
      if (this.active.timebegin) {
        this.active.datebegin = date.formatDate(
          this.active.timebegin.substring(0, 10),
          "YYYY/MM/DD"
        );
        this.active.timebegin = this.active.timebegin.substring(11);
      }
      if (this.active.timeend) {
        this.active.dateend = date.formatDate(
          this.active.timeend.substring(0, 10),
          "YYYY/MM/DD"
        );
        this.active.timeend = this.active.timeend.substring(11);
      }
      for (let i = 0; i < this.active.slots.length; i++) {
        Object.keys(this.active.slots[i]).forEach((k) => {
          try {
            let tmp = JSON.parse(this.active.slots[i][k]);
            if (typeof tmp != "number") this.active.slots[i][k] = tmp;
          } catch (e) {}
        });
      }

      this.activeInfo = this.active;
    } else {
      this.activeInfo = {
        name: "",
        description: "",
        tagprice: 0,
        price: 0,
        datebegin: date.formatDate(Date.now(), "YYYY/MM/DD"),
        dateend: date.formatDate(Date.now(), "YYYY/MM/DD"),
        timebegin: "00:00",
        timeend: "00:00",
        address: "",
        slot: 0,
        slots: [],
      };
    }
  },
  methods: {
    setSlotsNum() {
      this.activeInfo.slots = [];
      if (!this.activeInfo.slot) this.activeInfo.slot = 0;
      for (let i = 0; i < this.activeInfo.slot; i++) {
        this.activeInfo.slots.push({
          price: "",
          note: "",
          agebegin: "",
          ageend: "",
          constellation: ["不限"],
          sex: "0",
          heightbegin: "",
          heightend: "",
          incomebegin: "",
          incomeend: "",
          eduback: ["不限"],
          marriage: ["不限"],
          career: ["不限"],
          weightbegin: "",
          weightend: "",
          housesitu: ["不限"],
          carsitu: ["不限"],
          smokesitu: ["不限"],
          drinksitu: ["不限"],
          childrensitu: ["不限"],
        });
      }
    },
    createActive() {
      for (let i = 0; i < this.activeInfo.slots.length; i++) {
        Object.keys(this.activeInfo.slots[i]).forEach((k) => {
          if (typeof this.activeInfo.slots[i][k] == "object") {
            this.activeInfo.slots[i][k] =
              JSON.stringify(this.activeInfo.slots[i][k]) == "null"
                ? null
                : JSON.stringify(this.activeInfo.slots[i][k]);
          }
        });
      }
      const active = {
        name: this.activeInfo.name,
        description: this.activeInfo.description,
        tagprice: this.activeInfo.tagprice,
        price: this.activeInfo.price,
        timebegin: this.activeInfo.datebegin + " " + this.activeInfo.timebegin,
        timeend: this.activeInfo.dateend + " " + this.activeInfo.timeend,
        address: this.activeInfo.address,
        slot: this.activeInfo.slot,
        slots: this.activeInfo.slots,
      };
      this.$api
        .post(
          "xapp1s1/activates/saveMyActivate/" +
            (this.activeInfo.id ? this.activeInfo.id : ""),
          active
        )
        .then((res) => {
          if (res.data.success) {
            this.$router.back();
          }
        });
    },
    //content_copy
    copy(i, j) {
      structuredClone();
    },
    mediaDel(val) {
      if (val?.length > 0) {
        this.$api
          .post("/xapp1s1/activates/delMyActivateFiles/" + this.activeInfo.id, {
            filenames: val,
          })
          .then((res) => {
            if (res.data.success === true) {
              this.$zglobal.showMessage(
                "positive",
                "center",
                this.$t("operation.delsuccess")
              );
            }
          });
      }
    },
  },
};
</script>

<style scoped></style>
