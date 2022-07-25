<template>
  <q-page class="q-pa-xs">
    <q-card flat>
      <q-card-section>
        <p
          class="text-bold"
          align="center"
          style="margin-bottom: 0.5em; color: var(--q-color-positive)"
        >
          <font size="4">2019 年贫困县退出专项评估检查</font><br />
          <font size="3" style="text-indent: 3em"
            >（建档立卡脱贫户调查问卷）</font
          >
        </p>
        <p style="text-indent: 2em">
          您好！我们是西藏自治区 2019 年贫困县退出专项评估检查的调查员。
          您家是我们选取的抽样农户，现需要访谈了解您家庭生产、生活及有关情况。希望您如实提供信息，我们将遵守规定对您所提供的信息严格保密。谢谢您的理解与配合！
        </p>
      </q-card-section>
    </q-card>
    <q-stepper
      ref="stepper"
      v-model="step"
      header-nav
      flat
      color="primary"
      done-color="deep-orange"
      active-color="purple"
      inactive-color="secondary"
      animated
      :vertical="$q.screen.gt.xs ? false : true"
    >
      <q-step
        :name="1"
        title="第一部分 基础信息"
        caption=""
        icon="settings"
        style="padding: 12px 12px"
        :done="done1"
      >
        <div class="q-mb-lg row">
          <q-icon name="location_on" class="text-warning" size="sm" />
          <q-input
            v-model="vote.longitude"
            dense
            disable
            type="text"
            style="max-width: 8em"
          >
            <template v-slot:before>
              <font size="3">经度</font>
            </template>
          </q-input>
          <q-input
            v-model="vote.latitude"
            dense
            disable
            type="text"
            style="max-width: 7em"
          >
            <template v-slot:before>
              <font size="3">纬度</font>
            </template>
          </q-input>
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-select
            v-model="vote.province"
            dense
            standout="bg-secondary text-white"
            label="省"
            style="min-width: 10em"
            emit-value
            :options="addressoptions"
          />
          <q-select
            v-model="vote.city"
            dense
            standout="bg-secondary text-white"
            label="市"
            style="min-width: 10em"
            emit-value
            :options="cityArray"
          />
          <q-select
            v-model="vote.country"
            dense
            standout="bg-secondary text-white"
            label="区（县）"
            emit-value
            style="min-width: 10em"
            :options="countryArray"
          />
          <q-select
            v-model="vote.town"
            dense
            standout="bg-secondary text-white"
            label="镇（乡）"
            emit-value
            style="min-width: 10em"
            :options="townArray"
          />
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-input v-model="vote.village" type="text" label="行政村（社区）" />
          <q-input v-model="vote.group" type="text" label="自然村（组）" />
          <q-select
            v-model="vote.villagetype"
            label="行政村属性"
            style="min-width: 10em"
            :options="[
              { label: '农区', value: '1' },
              { label: '牧区', value: '2' },
              { label: '半农半牧区', value: '3' },
            ]"
          />
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-input
            v-model="vote.investigator1"
            type="text"
            label="调查员1姓名"
          />
          <q-input
            v-model="vote.investigatortel1"
            type="text"
            label="调查员1联系方式"
            mask="### - #### ####"
          />
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-input
            v-model="vote.investigator2"
            type="text"
            label="调查员2姓名"
          />
          <q-input
            v-model="vote.investigatortel2"
            type="text"
            label="调查员2联系方式"
            mask="### - #### ####"
          />
        </div>
      </q-step>

      <q-step
        :name="2"
        title="第二部分 问卷主体部分"
        icon="person"
        style="padding: 12px 12px"
        :done="done2"
      >
        <dl>
          <dt class="text-h6 row no-wrap items-center">
            <div class="doc-card-title">A. 受访者信息</div>
          </dt>
          <dd
            :class="$q.screen.gt.xs ? 'text-body1 row' : 'text-body1'"
            style="margin-inline-start: 20px"
          >
            <div style="padding-top: 10px">A1. 被访者姓名？</div>
            <q-input v-model="vote.a1name" type="text" dense />
            <div style="padding-top: 10px">与户主关系？</div>
            <q-select
              v-model="vote.a1renation"
              use-input
              use-chips
              dense
              new-value-mode="add-unique"
              behavior="menu"
              style="min-width: 12em"
              :options="[
                '本人',
                '配偶',
                '子女',
                '父母',
                '兄弟',
                '姊妹',
                '爷孙',
                '其他',
              ]"
            ></q-select>
            <div style="padding-top: 10px">联系方式：</div>
            <q-input v-model="vote.a1tel" type="text" dense />
          </dd>
          <dd
            class="text-body1"
            :class="$q.screen.gt.xs ? 'text-body1 row' : 'text-body1'"
            style="margin-inline-start: 20px"
          >
            <div style="padding-top: 10px">A2. 被访者文化程度？</div>
            <q-select
              v-model="vote.a2"
              dense
              style="min-width: 15em"
              behavior="menu"
              :options="[
                '小学及以下',
                '初中',
                '高中',
                '职校、中专',
                '大专及以上',
              ]"
            ></q-select>
          </dd>
          <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px">
            <div class="doc-card-title">B. 户主基本情况</div>
          </dt>
          <dd
            class="text-body1"
            :class="$q.screen.gt.xs ? 'text-body1 row' : 'text-body1'"
            style="margin-inline-start: 20px"
          >
            <div style="padding-top: 10px">B1. 户主姓名：</div>
            <q-input v-model="vote.b1" type="text" dense />
            <div style="padding-top: 10px">B2. 户主性别：</div>
            <q-select
              v-model="vote.b2"
              dense
              style="min-width: 12em"
              behavior="menu"
              :options="['男', '女']"
            ></q-select>
            <div style="padding-top: 10px">B3. 户主民族：</div>
            <q-select
              v-model="vote.b3"
              dense
              use-input
              use-chips
              new-value-mode="add-unique"
              style="min-width: 12em"
              behavior="menu"
              :options="['汉族', '藏族', '土家族']"
            ></q-select>
          </dd>
          <dd
            class="text-body1"
            :class="$q.screen.gt.xs ? 'text-body1 row' : 'text-body1'"
            style="margin-inline-start: 20px"
          >
            <div style="padding-top: 10px">B4. 户主文化程度：</div>
            <q-select
              v-model="vote.b4"
              dense
              style="min-width: 12em"
              behavior="menu"
              :options="[
                '小学及以下',
                '初中',
                '高中',
                '职校、中专',
                '大专及以上',
              ]"
            ></q-select>
            <div style="padding-top: 10px">B5. 户主身份证号：</div>
            <q-input
              v-model="vote.b5"
              type="text"
              dense
              style="min-width: 15em"
              mask="X##### ######## ###X X"
            />
          </dd>
          <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px">
            <div class="doc-card-title">C. 农户家庭基本情况</div>
          </dt>
          <dd
            class="text-body1"
            :class="$q.screen.gt.xs ? 'text-body1 row' : 'text-body1'"
            style="margin-inline-start: 20px"
          >
            <div style="padding-top: 10px">C1. 建档立卡人口数（人）：</div>
            <q-input
              v-model="vote.c1"
              type="text"
              dense
              style="min-width: 8em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
          </dd>
        </dl>
      </q-step>

      <q-step
        :name="3"
        title="第三部分 问卷多媒体信息"
        icon="home"
        style="padding: 12px 12px"
        :done="done3"
      >
        <q-card flat dense>
          <q-card-section
            style="
              padding: 5px;
              border-bottom: 2px dashed var(--q-color-secondary);
              max-width: 20em;
            "
          >
            <div class="text-h6 text-primary">
              “ 两不愁”情况
            </div></q-card-section
          >
          <q-card-section style="padding: 1px">
            <q-select
              v-model="vote.d1"
              label="D1.现在家里是否能吃得饱？"
              style="max-width: 20em"
              :options="['是', '否']"
            ></q-select>
            <q-select
              v-model="vote.d2"
              label="D2.如果吃不饱，表现是什么？"
              style="max-width: 20em"
              :options="['常年吃不饱', '个别月份吃不饱']"
            ></q-select>
          </q-card-section>
        </q-card>
      </q-step>
      <q-step
        :name="6"
        title="第四部分 其他部分"
        icon="stars"
        style="padding: 12px 12px"
        :done="done6"
      >
        <q-card flat dense>
          <q-card-section
            style="
              padding: 5px;
              border-bottom: 2px dashed var(--q-color-secondary);
            "
          >
            <div class="text-h6 text-primary">受访者信息</div></q-card-section
          >
          <q-card-section
            style="padding: 1px"
            :class="
              $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
            "
          >
            <q-input v-model="vote.a1name" type="text" label="A1.受访者姓名" />
            <q-select
              v-model="vote.a1renation"
              use-input
              use-chips
              label="A1.与户主关系"
              new-value-mode="add-unique"
              style="min-width: 12em"
              :options="[
                '本人',
                '配偶',
                '子女',
                '父母',
                '兄弟',
                '姊妹',
                '爷孙',
                '其他',
              ]"
            ></q-select>
            <q-input v-model="vote.a1tel" type="text" label="A1.联系方式" />
            <q-select
              v-model="vote.a2"
              label="A2.被访者文化程度"
              style="min-width: 15em"
              :options="[
                '小学及以下',
                '初中',
                '高中',
                '职校、中专',
                '大专及以上',
              ]"
            ></q-select>
          </q-card-section>
          <q-card-section
            style="
              padding: 5px;
              border-bottom: 2px dashed var(--q-color-secondary);
            "
          >
            <div class="text-h6 text-primary">户主基本情况</div></q-card-section
          >
          <q-card-section
            style="padding: 1px"
            :class="
              $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
            "
          >
            <q-input v-model="vote.b1" type="text" label="B1.户主姓名" />
            <q-select
              v-model="vote.b2"
              label="B2.户主性别"
              style="min-width: 12em"
              :options="['男', '女']"
            ></q-select>
            <q-select
              v-model="vote.b3"
              label="B3.户主民族"
              use-input
              use-chips
              new-value-mode="add-unique"
              style="min-width: 12em"
              :options="['汉族', '藏族', '土家族']"
            ></q-select>
            <q-select
              v-model="vote.b4"
              label="B4.户主文化程度"
              style="min-width: 12em"
              :options="[
                '小学及以下',
                '初中',
                '高中',
                '职校、中专',
                '大专及以上',
              ]"
            ></q-select>
            <q-input
              v-model="vote.b5"
              type="text"
              label="B5.户主身份证号"
              style="min-width: 15em"
              mask="X##### ######## ###X X"
            />
          </q-card-section>
          <q-card-section
            style="
              padding: 5px;
              border-bottom: 2px dashed var(--q-color-secondary);
            "
          >
            <div class="text-h6 text-primary">
              农户家庭基本情况
            </div></q-card-section
          >
          <q-card-section
            style="padding: 1px"
            :class="
              $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
            "
          >
            <q-input
              v-model="vote.c1"
              type="text"
              label="C1.建档立卡人口数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c2"
              type="text"
              label="C2.60 周岁及以上人数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c3"
              type="text"
              label="C3.16 周岁到 60 周岁人数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c4"
              type="text"
              label="C4.劳动力人数（人）"
              style="min-width: 20em"
              mask="##"
              hint="16 到 64 周岁，除学生外 有劳动能力的人数"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c5"
              type="text"
              label="C5.其中：常年外出打工人口数（人）"
              style="min-width: 20em"
              mask="##"
              hint="指累计打工半年以上"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c6"
              type="text"
              label="C6.常年在家务农人口数（人） "
              style="min-width: 20em"
              mask="##"
              hint="指在家务农半年以上"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c7"
              type="text"
              label="C7.丧失劳动能力人数（人）"
              style="min-width: 20em"
              mask="##"
              hint="16 到 64 周岁， 因病因残丧失劳动力"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c8"
              type="text"
              label="C8.义务教育年龄段人数（人）"
              style="min-width: 20em"
              mask="##"
              hint="一般是 6 周岁到 15 周岁"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c9"
              type="text"
              label="C9.正在接受义务教育的学生数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c10"
              type="text"
              label="C10.患大病人数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c11"
              type="text"
              label="C11.残疾（含精神病）人数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c12"
              type="text"
              label="C12.患慢性病人数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c13"
              type="text"
              label="C13.常住人口数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c14"
              type="text"
              label="C14.您家哪一年被确定为建档立卡户?"
              style="min-width: 20em"
              mask="####"
              hint="年（4 位数年份）（取值范围为2014-2019）"
              :rules="[
                (val) =>
                  (val >= 2014 && val <= 2019) || '该项取值范围为2014-2019 ',
              ]"
            />
            <q-select
              v-model="vote.c15"
              label="C15.贫困户属性"
              style="min-width: 12em"
              :options="['一般户', '低保户', '五保户']"
            ></q-select>
            <q-input
              v-model="vote.c16"
              type="text"
              label="C16.2019 年低保人口数（人）"
              style="min-width: 20em"
              mask="##"
              :rules="[(val) => val <= 30 || '该项取值范围为0-30 ']"
            />
            <q-input
              v-model="vote.c17"
              type="number"
              label="C17.全家 2019 年领取的低保金是多少？ （元）"
              style="min-width: 20em"
            />
            <q-input
              v-model="vote.c18"
              type="text"
              label="C18.最近一次的低保是什么时候开始享受的？"
              style="min-width: 20em"
              hint="年月（4 位年份加 2 位月份）"
              mask="#### ##"
            />
            <q-input
              v-model="vote.c19"
              type="text"
              label="C19.是哪一年脱贫的？"
              style="min-width: 20em"
              hint="年（4 位数年份） "
              mask="####"
            />
          </q-card-section>
        </q-card>
        <div>第一部分 基础信息</div>
        <div>第二部分 农户家庭基本信息</div>
        <div>第三部分 “两不愁、三保障” 情况</div>
        <div>第四部分 政策落实情况</div>
        <div>第五部分 家庭收入核实情况</div>
        <div>第六部分 认可度调查</div>
        <div>
          <q-btn
            type="submit"
            color="secondary"
            icon-right="save"
            :loading="saving"
            @click="savedata"
          >
            保存问卷&nbsp;&nbsp;
            <template v-slot:loading>
              <q-spinner-rings />
            </template>
          </q-btn>
        </div>
      </q-step>
    </q-stepper>
    <!--    <q-page-sticky position="bottom-right" :offset="[18, 18]">-->
    <!--      <q-btn fab icon="add" color="accent" />-->
    <!--    </q-page-sticky>-->
  </q-page>
</template>

<script>
export default {
  title: "Vo",
  components: {},
  data() {
    return {
      saving: false,
      vote: {},
      show2: true,
      addressoptions: [
        {
          label: "四川省",
          value: "四川省",
          city: [
            {
              label: "成都市",
              value: "成都市",
              country: [
                {
                  label: "成华区",
                  value: "成华区",
                  town: [
                    {
                      label: "二仙桥",
                      value: "二仙桥",
                    },
                    { label: "八里庄", value: "八里庄" },
                  ],
                },
                {
                  label: "青羊区",
                  value: "青羊区",
                  town: [
                    {
                      label: "西南交通大学",
                      value: "西南交通大学",
                    },
                    { label: "西南石油大学", value: "西南石油大学" },
                  ],
                },
              ],
            },
            {
              label: "广元市",
              value: "广元市",
            },
            {
              label: "南充市",
              value: "南充市",
            },
          ],
        },
        {
          label: "海南省",
          value: "海南省",
          city: [
            {
              label: "三亚市",
              value: "三亚市",
            },
            {
              label: "海口市",
              value: "海口市",
            },
          ],
        },
        {
          label: "重庆市",
          value: "重庆市",
          city: [
            {
              label: "嘉陵区",
              value: "嘉陵区",
            },
            {
              label: "北碚区",
              value: "北碚区",
            },
            {
              label: "黔江县",
              value: "黔江县",
            },
          ],
        },
      ],
      step: 2,
      done1: false,
      done2: false,
      done3: false,
      done4: false,
      done5: false,
      done6: false,
    };
  },

  computed: {
    // 获得列表
    cityArray: function () {
      let tmpRe1 = [];
      for (var i in this.addressoptions) {
        if (this.addressoptions[i].value === this.vote.province) {
          tmpRe1 = this.addressoptions[i].city;
          break;
        }
      }
      return tmpRe1;
    },
    countryArray: function () {
      let tmpRe2 = [];
      for (var i in this.cityArray) {
        if (this.cityArray[i].value === this.vote.city) {
          tmpRe2 = this.cityArray[i].country;
          break;
        }
      }
      return tmpRe2;
    },
    townArray: function () {
      let tmpRe3 = [];
      for (var i in this.countryArray) {
        if (this.countryArray[i].value === this.vote.country) {
          tmpRe3 = this.countryArray[i].town;
          break;
        }
      }
      return tmpRe3;
    },
  },
  watch: {
    "vote.province"(val) {
      if (this.vote.city) this.vote.city = null;
      if (this.vote.country) this.vote.country = null;
      if (this.vote.town) this.vote.town = null;
    },
    "vote.city"(val) {
      if (this.vote.country) this.vote.country = null;
      if (this.vote.town) this.vote.town = null;
    },
    "vote.country"(val) {
      if (this.vote.town) this.vote.town = null;
    },
    "vote.sex"(val) {
      if (val === "female") {
        this.show2 = false;
      } else {
        this.show2 = true;
      }
    },
  },
  created() {},
  mounted() {
    this.getPosition();
  },
  methods: {
    // 1 查询当前位置信息
    getPosition() {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess,
        this.getPositionError,
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
      );
    },
    // 1-1 查询当前位置信息成功
    getPositionSuccess(position) {
      this.vote.latitude = String(position.coords.latitude.toFixed(2));
      this.vote.longitude = String(position.coords.longitude.toFixed(2));
    },
    // 1-2 查询当前位置信息失败
    getPositionError(error) {
      if (error) {
        this.$zglobal.showMessage(
          "red-7",
          "center",
          this.$t("getlocationfailed")
        );
      }
    },
    savedata() {
      this.saving = true;
      console.log(this.vote, "提交成功");
      setTimeout(() => {
        // we're done, we reset loading state
        this.saving = false;
        console.log("-=----=---=---=---=---=--" + JSON.stringify(this.vote));
      }, 3000);
    },
  },
};
</script>
<style scoped>
.q-stepper--vertical .q-stepper__step-inner {
  padding: 0 2px 25px 37px;
}
.doc-card-title {
  margin-left: -40px;
  padding: 2px 10px 2px 24px;
  background: var(--q-color-info);
  color: #000000;
  position: relative;
  border-radius: 3px 5px 5px 0;
}
</style>
