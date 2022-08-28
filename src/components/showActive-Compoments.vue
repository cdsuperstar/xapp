<template>
  <q-card
    v-for="active in activates"
    :key="active.index"
    class="my-card"
    flat
    bordered
  >
    <q-item>
      <q-item-section avatar top>
        <q-avatar>
          <img :src="active.shop.avatar" />
        </q-avatar>
        <q-item-label overline>{{ active.shop.name }}</q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label header>{{ active.name }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-btn-dropdown
          dropdown-icon="more_horiz"
          dense
          flat
          unelevated
          :ripple="false"
        >
          <q-list>
            <q-item clickable @click="del(active.id)">
              {{ $t("xapp1s1.activate.del") }}
            </q-item>
            <q-item clickable @click="modify(active)">
              {{ $t("xapp1s1.activate.fix") }}
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-card-section @click="showDetail(active)">
      <q-item>
        <q-item-section>
          <q-item-label overline>
            {{ $t("xapp1s1.activate.time") }}:
          </q-item-label>
          <q-item-label overline>
            {{ active.timebegin.substring(0, active.timebegin.length - 3) }}
            <br />
            ~
            <br />
            {{ active.timeend.substring(0, active.timeend.length - 3) }}
          </q-item-label>
          <q-item-label overline>
            {{ $t("xapp1s1.activate.address") }}:
          </q-item-label>
          <q-item-label overline>
            {{ active.address }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-8">
        <q-item-label overline lines="3">
          {{ active.description }}
        </q-item-label>
      </q-card-section>
      <q-separator vertical />

      <q-card-section class="col-4">
        <q-item-label overline>
          {{ $t("xapp1s1.activate.tagprice") }}:{{ active.tagprice }}
        </q-item-label>
        <q-item-label overline>
          {{ $t("xapp1s1.activate.price") }}:{{ active.price }}
        </q-item-label>
      </q-card-section>
    </q-card-section>
    <q-separator />
    <q-card-section> <show-pic :pics="active.pics"></show-pic></q-card-section>
    <q-separator />
    <q-card-section></q-card-section>
  </q-card>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="detail"
      persistent
      :maximized="true"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
      <q-card class="text-black">
        <q-bar>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="this.target.shop.avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section thumbnail>
              <q-item-label overline>
                {{ this.target.shop.name }}
              </q-item-label>
              <q-item-label overline>
                {{ this.target.name }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                {{ $t("xapp1s1.activate.time") }}:
              </q-item-label>
              <q-item-label overline>
                {{
                  this.target.timebegin.substring(
                    0,
                    this.target.timebegin.length - 3
                  )
                }}
                ~
                {{
                  this.target.timeend.substring(
                    0,
                    this.target.timeend.length - 3
                  )
                }}
              </q-item-label>
              <q-item-label overline>
                {{ $t("xapp1s1.activate.address") }}:
              </q-item-label>
              <q-item-label overline>
                {{ this.target.address }}
              </q-item-label>
              <q-item-label overline>
                {{ $t("xapp1s1.activate.desc") }}:
              </q-item-label>
              <q-item-label overline>
                {{ this.target.description }}
              </q-item-label>
              <q-item-label overline>
                {{ $t("xapp1s1.activate.tagprice") }}:{{ this.target.tagprice }}
              </q-item-label>
              <q-item-label overline>
                {{ $t("xapp1s1.activate.price") }}:{{ this.target.price }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator />
        <q-card-section
          ><show-pic :pics="this.target.pics"> </show-pic
        ></q-card-section>
        <q-separator />
        <q-card-section>
          <q-expansion-item
            icon="chair"
            :label="$t('xapp1s1.activate.slots', [index + 1])"
            v-for="(slt, index) in this.target.slots"
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
              <q-item>
                <q-item-section>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.height") }}: {{ slt.heightbegin }}~{{
                      slt.heightend
                    }}
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.incomeSit") }}:
                    {{ slt.incomebegin }}~{{ slt.incomeend }}
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.weight") }}: {{ slt.weightbegin }}~{{
                      slt.weightend
                    }}
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.activate.age") }}: {{ slt.agebegin }}~{{
                      slt.ageend
                    }}
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.activate.note") }}: {{ slt.note }}
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.activate.price") }}: {{ slt.price }}
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.sex") }}: {{ slt.sex }}
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.activate.constellation") }}:
                    <q-item-label
                      v-for="(text, index) in slt.constellation"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.marriage") }}:
                    <q-item-label
                      v-for="(text, index) in slt.marriage"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.eduBack") }}:
                    <q-item-label
                      v-for="(text, index) in slt.eduback"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.career") }}:
                    <q-item-label
                      v-for="(text, index) in slt.career"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.houseSitu") }}:
                    <q-item-label
                      v-for="(text, index) in slt.housesitu"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.carSitu") }}:
                    <q-item-label
                      v-for="(text, index) in slt.carsitu"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.smokeSitu") }}:
                    <q-item-label
                      v-for="(text, index) in slt.smokesitu"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.drinkSitu") }}:
                    <q-item-label
                      v-for="(text, index) in slt.drinksitu"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                  <q-item-label overline>
                    {{ $t("xapp1s1.profile.childrenSitu") }}:
                    <q-item-label
                      v-for="(text, index) in slt.childrensitu"
                      :key="index"
                    >
                      {{ text + " " }}
                    </q-item-label>
                  </q-item-label>
                </q-item-section>
              </q-item>
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
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import showPic from "components/showPic";
export default {
  name: "Active-list",
  data() {
    return {
      detail: false,
      target: "",
    };
  },
  components: {
    showPic,
  },
  props: {
    activates: {},
  },
  methods: {
    showDetail(active) {
      this.detail = true;
      this.target = active;
      for (let i = 0; i < this.target.slots.length; i++) {
        Object.keys(this.target.slots[i]).forEach((k) => {
          try {
            let tmp = JSON.parse(this.target.slots[i][k]);
            if (typeof tmp != "number") this.target.slots[i][k] = tmp;
          } catch (e) {}
        });
      }
      console.log(active);
    },
    del(activeid) {
      this.$api
        .post("/xapp1s1/activates/delMyActivate/" + activeid)
        .then((res) => {
          if (res.data.success) {
            this.$emit("del", res.data.data.id);
          }
        });
    },
    modify(val) {
      this.$router.push({
        name: "xapp1s1createactive",
        params: {
          active: JSON.stringify(val),
        },
      });
    },
  },
};
</script>

<style scoped></style>
