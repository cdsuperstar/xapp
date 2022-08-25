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
        v-model="name"
        :label="$t('xapp1s1.activate.name')"
        stack-label
      />
      <q-input
        outlined
        v-model="description"
        :label="$t('xapp1s1.activate.description')"
        stack-label
      />
      <q-input
        outlined
        v-model="tagprice"
        :label="$t('xapp1s1.activate.tagprice')"
        stack-label
      />
      <q-input
        outlined
        v-model="price"
        :label="$t('xapp1s1.activate.price')"
        stack-label
      />
      <q-date v-model="datebegin" />
      <q-date v-model="dateend" />
      <div class="row q-pa-md">
        <q-input
          v-model="timebegin"
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
                <q-time v-model="timebegin">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-model="timeend"
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
                <q-time v-model="timeend">
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
        v-model="address"
        :label="$t('xapp1s1.activate.address')"
        stack-label
      />
      <!--      要做人数限制-->
      <q-input
        outlined
        type=""
        v-model="slot"
        :label="$t('xapp1s1.activate.slot')"
        @change="setSlotsNum"
        stack-label
        maxlength="2"
      />
      <div v-for="(slt, index) in slots" :key="index">
        <div class="row">
          {{ $t("xapp1s1.activate.slots", [index + 1]) }}
        </div>
        <div class="row">
          <!--          <q-select-->
          <!--            class="col-4"-->
          <!--            :options="sex"-->
          <!--            outlined-->
          <!--            v-model="slots[sl].sex"-->
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
        <!--            v-model="slots[sl].eduback"-->
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
        <!--            v-model="slots[sl].nativeplace"-->
        <!--            :label="$t('xapp1s1.profile.nativePlace')"-->
        <!--            stack-label-->
        <!--          />-->
        <!--        </div>-->
      </div>
    </q-form>
    <q-btn
      push
      color="savebtn"
      :label="$t('xapp1s1.activate.pub')"
      @click="createActive"
    />
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  name: "Active",
  data() {
    return {
      modal: null,
      string: ["1", "2", "3", "4"],
      //test
      name: "",
      description: "",
      tagprice: 0,
      price: 0,
      datebegin: date.formatDate(Date.now(), "YYYY/MM/DD"),
      dateend: date.formatDate(Date.now(), "YYYY/MM/DD"),
      timebegin: "",
      timeend: "",
      address: "",
      slot: 0,
      //
      slots: [],
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
        { label: "不限", value: 0 },
        { label: "女", value: 2 },
        { label: "男", value: 1 },
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
  methods: {
    setSlotsNum() {
      this.slots = [];
      for (let i = 0; i < this.slot; i++) {
        this.slots.push({
          price: "",
          note: "",
          agebegin: "",
          ageend: "",
          constellation: [],
          sex: "",
          heightbegin: "",
          heightend: "",
          incomebegin: "",
          incomeend: "",
          eduback: [],
          marriage: [],
          career: [],
          weightbegin: "",
          weightend: "",
          housesitu: [],
          carsitu: [],
          smokesitu: [],
          drinksitu: [],
          childrensitu: [],
        });
      }
    },
    createActive() {
      for (let i = 0; i < this.slots.length; i++) {
        this.slots[i].constellation = JSON.stringify(
          this.slots[i].constellation
        );
        this.slots[i].eduback = JSON.stringify(this.slots[i].eduback);
        this.slots[i].marriage = JSON.stringify(this.slots[i].marriage);
        this.slots[i].career = JSON.stringify(this.slots[i].career);
        this.slots[i].housesitu = JSON.stringify(this.slots[i].housesitu);
        this.slots[i].carsitu = JSON.stringify(this.slots[i].carsitu);
        this.slots[i].smokesitu = JSON.stringify(this.slots[i].smokesitu);
        this.slots[i].drinksitu = JSON.stringify(this.slots[i].drinksitu);
        this.slots[i].childrensitu = JSON.stringify(this.slots[i].childrensitu);
      }
      console.log(this.slots);
      const active = {
        name: this.name,
        description: this.description,
        tagprice: this.tagprice,
        price: this.price,
        timebegin: this.datebegin + " " + this.timebegin,
        timeend: this.dateend + " " + this.timeend,
        address: this.address,
        slot: this.slot,
        slots: this.slots,
      };

      // console.log(active);
      this.$api.post("xapp1s1/activates/saveMyActivate", active).then((res) => {
        // console.log(res);
        if (res.data.success) {
          this.$router.back();
        }
      });
    },
  },
};
</script>

<style scoped></style>
