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
              <div class="" style="font-size: medium">~</div>
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
      <div class="q-pa-md">
        <q-select
          filled
          label="Select multiple values"
          hint="Separate multiple values by [,;|]"
          v-model="model"
          use-input
          use-chips
          multiple
          input-debounce="0"
          @new-value="createValue"
          :options="string"
          @filter="filterFn"
          style="width: 250px"
        />
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
          constellation: "",
          sex: "",
          heightbegin: "",
          heightend: "",
          incomebegin: "",
          incomeend: "",
          eduback: "",
          marriage: "",
          career: "",
          weightbegin: "",
          weightend: "",
          housesitu: "",
          carsitu: "",
          smokesitu: "",
          drinksitu: "",
          childrensitu: "",
        });
      }
    },
    createActive() {
      for (let i = 0; i < this.slots.length; i++) {
        this.slots[i].req = JSON.stringify(this.slots[i].reqObject);
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
      });
    },
  },
};
</script>

<style scoped></style>
