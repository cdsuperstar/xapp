<template>
  <q-layout view="hhh LpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="row">
          <q-avatar>
            <img src="../assets/app-logo.jpg" />
          </q-avatar>
          <div v-if="$q.screen.gt.xs" style="margin-top: 5px">
            &nbsp;&nbsp;{{ $t("system.name") }}
          </div>
        </q-toolbar-title>
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="home"
          :class="$auth.check() ? 'text-white' : 'text-warning'"
          to="/user/dashboard"
          :title="this.$t('buttons.home')"
        />
        <!-- 角色选择--->
        <q-btn-dropdown
          stretch
          flat
          :label="
            currectRole === undefined
              ? this.$t('roles.rolelist')
              : currectRole.title
          "
          :title="this.$t('roles.rolelistheader')"
        >
          <q-list dense>
            <q-item
              v-for="ro in MyRoleList"
              :key="ro.id"
              v-close-popup
              clickable
              style="
                text-align: left;
                border-bottom: 1px dashed #d6d6d6;
                padding: 6px;
              "
              :class="
                ro.name == store?.ZPermissions?.currectrole?.name
                  ? 'text-primary'
                  : 'text-grey-7'
              "
              @click="setRole(ro)"
            >
              <q-item-section avatar style="min-width: 30px">
                <q-icon name="person" size="25px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ ro.title }} </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <!-- 语言选择--->
        <q-btn-dropdown
          v-if="$q.screen.gt.xs"
          stretch
          flat
          :label="
            lang.label === undefined ? this.$t('langs.header') : lang.label
          "
        >
          <q-list dense>
            <q-item-label
              header
              style="
                text-align: left;
                border-bottom: 1px dashed #d6d6d6;
                padding: 8px;
              "
              >{{ $t("langs.title") }}
            </q-item-label>
            <q-item
              v-for="n in langs"
              :key="n.value"
              v-close-popup
              clickable
              style="
                text-align: left;
                border-bottom: 1px dashed #d6d6d6;
                padding: 6px;
              "
              :class="lang.value === n.value ? 'text-primary' : 'text-grey-7'"
              @click="setlanguage(n)"
            >
              <q-item-section avatar style="min-width: 30px">
                <q-icon size="25px" name="directions" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ n.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          v-if="$q.screen.gt.xs"
          dense
          flat
          round
          icon="apps"
          @click="right = !right"
        />
        <q-btn
          v-if="$q.screen.lt.sm"
          flat
          round
          dense
          icon="more_vert"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="left"
      v-touch-swipe.mouse.left="handleleftSwipe"
      bordered
      side="left"
      behavior="desktop"
      :width="leftdrawer"
      :mini="!left || miniState"
      :overlay="!$q.screen.gt.xs ? true : false"
      @click.capture="drawerClick"
    >
      <!-- drawer content -->
      <q-list bordered link class="rounded-borders">
        <div v-for="menus in menutree" :key="menus.id">
          <treemenu
            v-for="item in menus.children"
            :key="item.id"
            :children="item"
            :depth="1"
          ></treemenu>
        </div>
      </q-list>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="info"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>
    <q-drawer
      v-model="right"
      v-touch-swipe.mouse.right="handlerightSwipe"
      behavior="desktop"
      overlay
      bordered
      side="right"
      :width="rightdrawer"
    >
      <!-- drawer content -->
      <!-- 语言选择--->
      <div class="q-mt-sm">
        <q-list>
          <q-expansion-item
            v-if="!$q.screen.gt.xs"
            expand-separator
            icon="language"
            class="text-primary text-weight-bold"
            :label="this.$t('langs.title')"
          >
            <q-item
              v-for="n in langs"
              :key="n.value"
              v-close-popup
              v-ripple
              clickable
              style="border-bottom: 1px dashed #b5b5b5"
              :class="lang.value === n.value ? 'text-primary' : 'text-grey-7'"
              @click="setlanguage(n)"
            >
              <q-item-section avatar>
                <q-icon size="30px" name="directions" />
              </q-item-section>
              <q-item-section class="column text-weight-medium text-left">
                <q-item-label>{{ n.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </div>
      <!-- 颜色选择--->
      <div class="q-mt-sm">
        <q-list>
          <q-expansion-item
            expand-separator
            icon="palette"
            class="text-primary text-weight-bold"
            :label="this.$t('theme.title')"
          >
            <q-item>
              <q-item-section
                ><q-toggle
                  v-model="usercfg.dark"
                  :label="this.$t('theme.shieldeye')"
                ></q-toggle
              ></q-item-section>
            </q-item>
            <q-item
              v-for="n in themeoptions"
              :key="n.value"
              v-close-popup
              v-ripple
              clickable
              style="border-bottom: 1px dashed #b5b5b5"
              :class="
                usercfg.theme === n.value ? 'text-primary' : 'text-grey-7'
              "
              @click="setthemecolor(n.value)"
            >
              <q-item-section avatar>
                <q-icon size="30px" name="directions" />
              </q-item-section>
              <q-item-section class="column text-weight-medium text-left">
                <q-item-label>{{ n.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </div>
      <!-- 历史记录--->
      <div class="q-mt-sm">
        <q-list>
          <q-expansion-item
            expand-separator
            icon="history"
            class="text-primary text-weight-bold"
            :label="this.$t('history.title')"
          >
            <q-item
              v-for="n in MyHistoryList"
              :key="n.id"
              v-close-popup
              v-ripple
              clickable
              style="border-bottom: 1px dashed #b5b5b5"
              class="text-grey-7"
              :to="n.url"
            >
              <q-item-section avatar>
                <q-icon :name="n.icon" />
              </q-item-section>
              <q-item-section class="column text-weight-medium text-left">
                <q-item-label>{{ n.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <!--      <transition>-->
      <!--        <keep-alive>-->
      <router-view></router-view>
      <!--        </keep-alive>-->
      <!--      </transition>-->
    </q-page-container>

    <q-footer reveal bordered class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
        <q-btn-dropdown
          stretch
          flat
          dense
          icon="person_outline"
          :title="this.$t('auth.personprfile')"
        >
          <q-list separator style="overflow: hidden">
            <div v-for="item in menuB" :key="item.id">
              <q-item
                v-if="item.ismenu.indexOf('B') !== -1"
                v-ripple
                clickable
                tag="a"
                :to="item.url"
              >
                <q-item-section avatar>
                  <q-avatar
                    color="secondary"
                    text-color="white"
                    :icon="item.icon"
                    size="30px"
                  ></q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <q-item v-ripple clickable tag="a" @click="$auth.logout()">
              <q-item-section avatar>
                <q-avatar
                  color="secondary"
                  text-color="white"
                  icon="exit_to_app"
                  size="30px"
                ></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("auth.logout.logout") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
// import NestedTest from "../pages/modules/nested-tree";
import { useZeroStore } from "stores/zero";
import treemenu from "../pages/modules/treemenu";
import { setCssVar } from "quasar";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Dashboardlayout",
  components: { treemenu },
  data() {
    return {
      routearr: [],
      MyRoleList: [],
      blRouterReady: false,
      usercfg: { theme: "blue", dark: false },
      themeoptions: this.$tm("menu.themeoptions"),
      left: false,
      right: false,
      leftdrawer: 210,
      rightdrawer: 230,
      miniState: false,
      langs: [
        {
          label: "中文",
          value: "zh-CN",
        },
        {
          label: "English",
          value: "en-US",
        },
      ],
      lang: this.$i18n.locale,
    };
  },
  setup() {
    const store = useZeroStore();

    return {
      store,
      // you can return the whole store instance to use it in the template
    };
  },
  beforeCreate() {},
  computed: {
    menutree: {
      get() {
        if (this.blRouterReady) {
          return this.store?.ZPermissions?.moduletree;
        } else {
          return [];
        }
      },
    },
    MyHistoryList: {
      get() {
        let tmphistory = [];
        if (this.store?.ZOptHist?.length > 0) {
          tmphistory = this.store.ZOptHist;
        }
        return tmphistory;
      },
      set(value) {},
    },
    menuB: {
      get() {
        return this.store?.ZPermissions?.modules;
      },
      set(value) {},
    },
    currectRole: {
      get() {
        return this.store?.ZPermissions?.currectrole;
      },
    },
  },
  watch: {
    "usercfg.dark"(val) {
      this.applydarkmode();
    },
    lang(lang) {
      this.$i18n.locale = lang.value;
      // set quasar's language too!!
      import(`quasar/lang/${lang.value}`).then((language) => {
        this.$q.lang.set(language.default);
      });
    },
  },
  mounted() {
    this.lang = this.langs.filter((lan) => lan.value === this.lang)[0];
    //如果登录了
    if (this.$auth.check()) {
      if (this.$auth.user().usercfg) {
        this.usercfg = JSON.parse(this.$auth.user().usercfg);
      }
      this.$router.isReady().then(() => {
        this.store
          .getMyPermissions({
            role: "",
          })
          .then((res) => {
            this.MyRoleList = res.roles;
            this.routearr = res.modules;
            if (Array.isArray(this.routearr)) {
              this.routearr.forEach(function (val) {
                // push url to router by Luke
                if (val.url !== "" && val.url !== null) {
                  if (!this.$router.hasRoute(val.name)) {
                    let tmpAuth = {};
                    if (val.author == "vue-auth") {
                      tmpAuth = { auth: true };
                    }
                    this.$router.addRoute("user", {
                      path: val.url,
                      name: val.name,
                      meta: tmpAuth,
                      component: () =>
                        import("../pages/modules/" + val.url + ".vue"),
                    });
                    // console.log("Route added test:", val);
                  }
                }
              }, this);
              this.blRouterReady = true;
            }
            // this.store.getMyPermissions({ role: "" });
          })
          .catch((e) => {
            console.log("Dashboard getMyPermissions ERROR", e);
          });
      });

      if (this.usercfg?.theme) this.applytheme(this.usercfg?.theme);
      if (this.usercfg?.dark) this.applydarkmode();
    }
  },
  created() {},
  methods: {
    setlanguage(lang) {
      this.lang = lang;
    },
    // 设置主题
    setthemecolor(color) {
      this.usercfg.theme = color;

      let tmpUsercfg = {};
      if (this.$auth.check()) {
        const tmpu = this.$auth.user();
        if (tmpu.usercfg !== undefined) {
          tmpUsercfg = JSON.parse(this.$auth.user().usercfg);
          if (tmpUsercfg === null) tmpUsercfg = {};
          tmpUsercfg.theme = color;
          tmpUsercfg.dark = this.usercfg.dark;
        }

        this.$api
          .post("/zero/setMyUsercfg/", {
            usercfg: JSON.stringify(tmpUsercfg),
          })
          .then((res) => {
            if (res.data.success) {
              this.$auth.user().usercfg = res.data.data.usercfg;
              this.usercfg = JSON.parse(this.$auth.user().usercfg);
              this.applytheme(color);
            }
          });
      }
    },
    applytheme(color) {
      this.$zglobal.colors[color].forEach((item) => {
        setCssVar(item.name, item.value);
      });
    },
    applydarkmode() {
      this.$q.dark.set(this.usercfg.dark);
    },
    setRole(val) {
      if (val.name !== this.currectRole.name) {
        this.store.getMyPermissions({ role: val.name });
        if (this.$router.currentRoute.name !== "dashboard") {
          this.$router.push("dashboard");
        }
      }
    },
    // 左滑关闭菜单列表
    handleleftSwipe() {
      this.left = false;
    },
    handlerightSwipe() {
      this.right = false;
    },
    drawerClick(e) {
      if (this.miniState) {
        this.miniState = false;
        e.stopPropagation();
      }
    },
  },
});
</script>
<style>
.q-item__section--avatar {
  min-width: 42px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background-color: #f1f1f1;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
  background-color: #c1c1c1;
}
/*定义aggrid的css*/
.ag-theme-balham .ag-icon,
.ag-header-icon .ag-sort-ascending-icon {
  color: #ffffff;
}
.ag-theme-balham .ag-paging-page-summary-panel .ag-icon,
.ag-theme-balham .ag-paging-panel {
  color: #000000;
}
.ag-theme-balham .ag-icon-checkbox-unchecked {
  color: #cccccc;
}
.ag-theme-balham .ag-icon-checkbox-checked {
  color: var(--q-secondary);
}
</style>
