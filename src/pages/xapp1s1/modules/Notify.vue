<template>
  <q-page class="q-pa-md" style="padding: 0">
    <div class="row">
      <q-card class="col-11">
        <q-tabs
          active-color="pink"
          v-model="notifyTools"
          dense
          align="justify"
          narrow-indicator
          indicator-color="white"
          active-bg-color="white"
        >
          <q-tab name="recommend" label="推荐" @click="load('R')" />
          <q-tab name="followed" label="关注" @click="load('F')" />
          <q-tab name="shop" label="商铺" @click="load('S')" />
        </q-tabs>
      </q-card>
      <q-separator />
      <q-btn class="col-1" icon="add" flat to="xapp1s1sendactive" />
    </div>
    <q-separator />

    <q-tab-panels v-model="notifyTools" swipeable animated>
      <q-tab-panel name="recommend">
        <div class="active" :key="active" v-for="active in activeR">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-img :src="active.user_pub.xapp1s1profile_pub.avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <!--              用户名-->
              <q-item-label>
                {{ active.user_pub.xapp1s1profile_pub.nickname }}
              </q-item-label>
              <!--              用户资料-->
              <q-item-label caption>
                {{ active.user_pub.xapp1s1profile_pub.sex }},
                {{ active.user_pub.xapp1s1profile_pub.weight }},
                {{ active.user_pub.xapp1s1profile_pub.height }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item style="max-height: 200px; height: 200px">
            {{ active.note }}
          </q-item>
          <q-separator />
        </div>
      </q-tab-panel>

      <q-tab-panel name="followed">
        <div class="active" :key="active" v-for="active in activeF">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-img :src="active.user_pub.xapp1s1profile_pub.avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <!--              用户名-->
              <q-item-label>
                {{ active.user_pub.xapp1s1profile_pub.nickname }}
              </q-item-label>
              <!--              用户资料-->
              <q-item-label caption>
                {{ active.user_pub.xapp1s1profile_pub.sex }},
                {{ active.user_pub.xapp1s1profile_pub.weight }},
                {{ active.user_pub.xapp1s1profile_pub.height }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item style="max-height: 200px; height: 200px">
            {{ active.note }}
          </q-item>
          <q-separator />
        </div>
      </q-tab-panel>

      <q-tab-panel name="shop">
        <div class="active" :key="active" v-for="active in activeS">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-img :src="active.user_pub.xapp1s1profile_pub.avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <!--              用户名-->
              <q-item-label>
                {{ active.user_pub.xapp1s1profile_pub.nickname }}
              </q-item-label>
              <!--              用户资料-->
              <q-item-label caption>
                {{ active.user_pub.xapp1s1profile_pub.sex }},
                {{ active.user_pub.xapp1s1profile_pub.weight }},
                {{ active.user_pub.xapp1s1profile_pub.height }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item style="max-height: 200px; height: 200px">
            {{ active.note }}
          </q-item>
          <q-separator />
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <q-separator />
  </q-page>
</template>

<script>
export default {
  name: "Notify",
  mounted() {
    this.$api.get("xapp1s1/moments/getRecommMoments ").then((res) => {
      this.got("R");
    });
  },
  data() {
    return {
      activeR: null,
      activeF: null,
      activeS: null,
      notifyTools: "recommend",
    };
  },
  methods: {
    got(po) {
      if (po == "R") {
        this.$api.get("xapp1s1/moments/getRecommMoments ").then((res) => {
          if (res.data.success) {
            this.activeR = res.data.data;
            //查看结构
            console.log(1);
          }
        });
      } else if (po == "F") {
        this.$api.get("xapp1s1/moments/getFocusedMoments ").then((res) => {
          if (res.data.success) {
            this.activeF = res.data.data;
          }
        });
      } else {
        this.$api.get("xapp1s1/moments/getShopMoments ").then((res) => {
          if (res.data.success) {
            this.activeS = res.data.data;
          }
        });
      }
    },
    load(po) {
      if (po == "S" && this.activeS == null) {
        this.got(po);
      } else if (po == "R" && this.activeR == null) {
        this.got(po);
      } else if (po == "F" && this.activeF == null) {
        this.got(po);
      }
    },
  },
};
</script>

<style scoped></style>
