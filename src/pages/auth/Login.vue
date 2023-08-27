<template>
  <q-page class="flex flex-center">
    <q-card
      square
      :flat="!$q.screen.gt.xs ? true : false"
      style="width: 400px; padding: 50px"
    >
      <q-card-section>
        <div class="row text-h6 text-primary text-weight-bold no-wrap">
          <q-icon
            name="stop"
            :class="$auth.check() ? 'text-secondary' : 'text-warning'"
            style="font-size: 32px"
          />
          {{ $t("auth.login.login") }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          id="email"
          v-model.trim="data.data.username"
          type="email"
          required
          autofocus
          :label="this.$t('auth.login.email')"
          :error="this.v$.data.data.username.$error"
          :error-message="this.$t('auth.errors.email')"
          @blur="this.v$.data.data.username.$touch"
        />
        <q-input
          id="password"
          v-model="data.data.password"
          required
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.login.password')"
          :error="this.v$.data.data.password.$error"
          :error-message="this.$t('auth.errors.password')"
          @blur="this.v$.data.data.password.$touch"
          @keyup.enter="login"
        >
          <template v-slot:append>
            <q-icon
              color="accent"
              class="cursor-pointer"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="q-ml-ma row" style="padding-right: 10px">
          <q-checkbox
            id="rememberMe"
            v-model="data.rememberMe"
            :label="this.$t('auth.login.remember_me')"
          />
          <q-space />
          <q-checkbox
            id="offlinelogin"
            v-model="data.offlinelogin"
            :label="this.$t('auth.login.offline_login')"
          />
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn
          type="submit"
          color="secondary"
          icon-right="input"
          :loading="submitting"
          @click="login"
        >
          {{ $t("auth.login.login") }}&nbsp;&nbsp;
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <q-btn color="warning" icon-right="how_to_reg" to="register">
          &nbsp;&nbsp;{{ $t("auth.register.register") }} &nbsp;&nbsp;
        </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="secondary" />
      </q-inner-loading>

      <div class="q-card__actions justify-center q-card__actions--horiz row">
        <q-btn round @click="wechatLogin" style="width: 10px; height: 10px">
          <img
            style="width: 40px; height: 40px"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEUAAABXu0BYt0BQt0BXu0BWu0BXu0BXu0BXu0BWukBWukBXvEBXu0BXvEBXvEBYukBVukBXu0BWt0BXukBXuEBXu0D////1+/Pq9+fV7s/A5rer3aBsw1jg89uBzHBiwEy14auL0Xug2ZOW1YeBzG93yGSW1YjL6sO14azL6cN2yGP3XpzOAAAAFXRSTlMA3yAQ78+/r5+AUI9w74BgYEBAkHDBb56KAAACF0lEQVRIx52W6XKDIBRGwT3GZmsRUXFP0vb9H7AKGS8aiCXnR0TCmU/gOoh0uJck8jEZwUGYXND/cOPggyz4CE//0HZgKeDIsdSA3Qs1Bk2XejLF7ckGe1fnOT7ZBDsaDxNiZ4Jna4Jnb7rgbeKrK7QnFuzBOxIrYrsJAth9iIdl/9CwLE0pv/elqfoegWpfXdAUYINW9GRkRIBWakBemiOVGRbpE1lpijwaPDANCxvCc8qBbcVF47vq5EQ1YjCK3nyXiXE3QqrpSseeu+jptc96XgWmHSGDEGtCmDHygpK5nUuRdr2MvvfNdMvzXCN+KVNk6RO0qOpr37fXJzFCwdzmT9532THZovmqFHxlF3/WcdWQGUsBI2g3K/G3WG3o4oEVsVqOK4RHaTpfaKkXCVsWzPTL65pPN7X4kxnEX6qIXS4mJqfOH5tVKSJWzJsiXqlcklxe5AI0yuL4RDUpiKkGphRrRFRK+lLk88AQSg4KXVC9TvwSRQ4MU5m1xZ2xlmnEm1LkrqeKTVbU5rcaNtJDCAWqCOutq90CpjiKMTFQZuuah/9Oo+h6ZtPkYTSxI0YKReWLtxFBpJ5bzjOasWYsoBp6HQSRW5R5tz4C4HS0PltjO/H05sH6iQDXtz0d3/94ANPes/9Asjd9572PwE8X6Tm+DPViZMQ5mLUDxGnVCFtqwDH0VlYQS22bcxIGIhn7UXLWWn+10s6FZo+4YQAAAABJRU5ErkJggg=="
          />
        </q-btn>
        <q-btn round @click="weboLogin" style="width: 10px; height: 10px">
          <img
            style="width: 40px; height: 40px"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAh1BMVEUAAADXQDjTQDzaQzfcRTfbRDfcRDbcQzbbRDbbRDfcQzbaQzbbRDbbRDbaRDfcQzbbRDfaQjjaQjXcQzfYRDfbRDTbRDf////gW1D99PPtoZvyubT76Ob20M3pioLdT0Tvrajkc2n20c3rlo7mfnb0xcD43NrrlY7kcmniZ1343driZ1z0xMEgvW1iAAAAFnRSTlMAIBDf34Dv78+/n1BAj7CvcGBgkHBwDUc+aAAAAmpJREFUSMeVlueCqjAQRgOI0qy7m0YVsN297/98OwEdCUQ05w8WDt/MkIjEhJv8RIFHAS/c/CTkM9w4XFKN5ebwgeaDNWURObYa4s+oMWrG1MOruDV9w9o1eU5A37JwDN6CUksTPWsTPXvTRe89wXBCa2rB+ukd6By3K6ca8WcNVoyxLB26i0ex/mxgzRTiMlx990A6C09PZ6XKwXbpIyP6Fn4C8zKONHVYFrJ4tJWfoUMJ5k2PPBi0igHZrX8j4HVLITPXB7udeK1gHem9ziJjouTwQYmnhCCuxh5UhSJO9qKmWwxrTcZeyh5UpcyFyOH0Bi5SaYNNyG7qYeK95CttWUWlJn6PW5RsSgVtlyqxoEhEQs1rNEPrldf5cI8Qb+hxYRKlaVsSY4NZKqU81aynpQY0kTNF3pS4fsDFvTESx4Gi0b4vMqWKdl4UcHWukmSeZXnRV9Gb5VgcDucIJ3B11JbckSmKyXAC7V7I52hxI2WmyYYk0m7+Dbd8JR7boTYlbshOE9WBsYb+MglBZ6r4p8TxXL+Hi7zov2dCnY1N8v7ViIS4z21V9q3U7Ap9YkzOulnrLAkZLtYTA4f+CpYLHEjFgCMdtwhiTBGedT+D/NwtIHU2V3li4tE9iO5qaILQwvF4LNUtTLsr8InnTX6Pebfq8qopmup/V29W0CkRIaNISDmxJwLqNeEYHwG8repzltVpA/Ua8UmP61ErPHy2xnbiniBflg9WxA0sCnXJAMezadDSRM/aRM/eDMCb4n7Z/glE9rOhq5i8xPFfaz7GmdXIs9aw4O1qZIUxam9IdtuwS/aCaJcYrT+uh9kYccQkXQAAAABJRU5ErkJggg=="
          />
        </q-btn>
        <q-btn round @click="qqLogin" style="width: 10px; height: 10px">
          <img
            style="width: 40px; height: 40px"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEUAAABMouVIn+NEn99MouVMouVMo+ZMouVKouRKouJMn+NMouZLouRLo+VMoeNMouZLoeVLoeVNn+RMouX///+83Pal0PL0+v6x1vRireiay/FXqOfS6Pl5uevH4vePxe+Ev+1utOrp9Pzp8/yEv+7XzqLPAAAAE3RSTlMA3yAQ74C/n2BQQK9wz5CPz7BwJ8NfpgAAAbNJREFUSMe1lutygjAQhTeEOyi2AQIC3t//GcvYqk3OYsh0+v1yMN+czc4mQBwyL5ONUDMiLsqc1iGzOFQGYZGu0KLZQkQSrNSQ6I2aGRqkpktxlXJQSc4LNsqJCBhPOCQwwXOa6PmbErxlNpJeVMqD6uWliqOfprPiyN5tcOp0PaObntnmo9hIAV39pFNA9BOogKb+RQN/h9+RCfzR1gbtQqSArtQmemAjUy4QI7GxBTy92qKGJfEshlgp0DO15srmhuIRFuX0Cc/2KO5hUUkF1xt3dxKKuUS3uCPBjA0w4rySwqYyDLCM+EqxVrd45UTtFm81ywlEuzkHXhyhOfY1DArfntg+jRMY/PB80CeODaLhHigpt7fYNSgeuvpgD7k0j9V4Gfbc6RjN7oRE1rCeejVo27vMD4/WFokynB33qUpnUYb+t5zg7+OhNYrVxx5PIzGRJ9ijniwxIC7y3DV3urZ9/DrDfQxvR793a+YnpvRk6+Nt6YXceRQq//rxgKb/h87/fVrtAmKQW2c/JfGkb0PDjBYJomUtMuJQTcRKDUmL0LLiDDWevCzie7LYJGXOWl/BnLhvbq/sWgAAAABJRU5ErkJggg=="
          />
        </q-btn>
      </div>
      <div align="right">
        <br />
        <router-link to="/forgot">
          <a>{{ this.$t("auth.login.password_forgot") }}</a>
        </router-link>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useZeroStore } from "stores/zero";

window.Pusher = Pusher;

export default {
  name: "Login",
  components: {},
  data() {
    return {
      submitting: false,
      isPwd: true,
      data: {
        data: {
          username: "1@1.com",
          password: "12345678",
        },
        rememberMe: false,
        offlinelogin: false,
      },
      loading: false,
    };
  },
  setup() {
    const store = useZeroStore();
    return {
      store,
      v$: useVuelidate(),
    };
  },
  created() {
    // 加入初始记住的用户信息
    if (this.$q.localStorage.getItem("rememberMe")) {
      this.data.data.username = this.$q.localStorage.getItem("username");
      this.data.data.password = this.$q.localStorage.getItem("password");
      this.data.rememberMe = this.$q.localStorage.getItem("rememberMe");
    }
  },
  methods: {
    login() {
      // 离线登录
      if (this.data.offlinelogin) {
        this.v$.data.$touch();
        if (!this.v$.data.$error) {
          console.log(this.data.data, "------");
          var path =
            cordova.file.externalRootDirectory + "AsmartApp/Login.json";
          var reader = new FileReader();
          reader.readAsText(path);
        }
      } else {
        // 在线登录
        // console.log("logindata", this.data);
        this.submitting = true;
        this.v$.data.$touch();
        if (!this.v$.data.$error) {
          // console.log("Logined:", this.$auth);
          this.loading = true;
          this.$auth
            .login(this.data)
            .then((response) => {
              // 登录后初始化echo
              if (process.env.USE_BROADCAST == "true") {
                let baseurl = process.env.BASE_URL;
                let baseurlObj = new URL(baseurl);
                let baseurlHostname = baseurlObj.hostname;
                window.Echo = new Echo({
                  broadcaster: "pusher",
                  authEndpoint: baseurl + "/broadcasting/auth",
                  app_id: 1,
                  key: "b540ff10ff9a76b8ee18",
                  wsHost: baseurlHostname,
                  // wsHost: '0apps.test',
                  wsPort: 8001,
                  wssPort: 8001,
                  encrypted: false,
                  secret: "xapp1s1",
                  forceTLS: false,
                  enabledTransports: ["ws", "wss"],
                  disableStats: true,
                  auth: {
                    headers: {
                      Authorization: "Bearer " + this.$auth.token(),
                      Accept: "application/json",
                    },
                  },
                });
                window.Echo.private(
                  "App.Models.User." + response.data.data.id
                ).listen("msgEvt", (msg) => {
                  if (this.store.ZUserMsg[msg.sender] == undefined) {
                    this.store.ZUserMsg[msg.sender] = [];
                  }
                  this.store.ZUserMsg[msg.sender].push(msg);
                  console.log(
                    "Server broadcast msgEvt is :",
                    msg,
                    window.Echo.socketId()
                  );
                });
              }

              // console.log("Login res:", response);
              if (this.data.rememberMe) {
                this.$q.localStorage.set("username", this.data.data.username);
                this.$q.localStorage.set("password", this.data.data.password);
              }
              this.$q.localStorage.set("rememberMe", this.data.rememberMe);
              /* eslint-disable */
              if (device.platform === "Android") {
                var path =
                  cordova.file.externalRootDirectory + "AsmartApp/Login.json";
                let tmplogin = [];
                tmplogin.username = this.data.data.username;
                tmplogin.password = md5(this.data.data.password);
                writeFile(path, tmplogin);
              }
              /* eslint-enable */
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.status === 401) {
                  this.$q.dialog({
                    message: this.$t("auth.login.verification_required"),
                  });
                } else if (error.response.status === 403) {
                  this.$q.dialog({
                    message: this.$t("auth.login.invalid_credentials"),
                  });
                } else if (error.response.status === 400) {
                  this.$q.dialog({
                    message: this.$t("auth.login.invalid_credentials"),
                  });
                } else {
                  console.error(error);
                }
              }
            })
            .finally(() => {
              this.submitting = false;
              this.loading = false;
            });
        }
      }
    },
    wechatLogin() {
      window.location.href =
        "https://open.weixin.qq.com/connect/qrconnect?appid=wx85f17c29f3e648bf&response_type=code&scope=snsapi_login&redirect_uri=https%3A%2F%2Fpassport.baidu.com%2Fphoenix%2Faccount%2Fafterauth%3Fmkey%3D2a0f5503160e7b2d11e653c258d3a5dea67ec917028f52ade8%26tpl%3Dmn%26appid%3Dwx85f17c29f3e648bf%26traceid%3D&state=1693110743&display=page&traceid=";
    },
    qqLogin() {
      window.location.href =
        "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&state=authorize&client_id=101135748&redirect_uri=https%3A%2F%2Fpassport.bilibili.com%2Fpc%2Fpassport%2FsnsLogin%3Fcsrf_state%3Dacd3fa87ddb75aaf5370b39e4ce83f03%26sns_platform%3Dqq%26source%3Dmain-fe-header%26go_url%3Dhttps%253A%252F%252Fwww.bilibili.com%252F&scope=do_like,get_user_info,get_simple_userinfo,get_vip_info,get_vip_rich_info,add_one_blog,list_album,upload_pic,add_album,list_photo,get_info,add_t,del_t,add_pic_t,get_repost_list,get_other_info,get_fanslist,get_idollist,add_idol,del_idol,get_tenpay_addr";
    },
    weboLogin() {
      window.location.href =
        "https://api.weibo.com/oauth2/authorize?client_id=2841902482&redirect_uri=https%3A%2F%2Fpassport.bilibili.com%2Fpc%2Fpassport%2FsnsLogin%3Fcsrf_state%3Dbb12badbda4f7346c954ff01bd98210d%26sns_platform%3Dweibo%26source%3Dmain-fe-header%26go_url%3Dhttps%253A%252F%252Fwww.bilibili.com%252F&scope=email###";
    },
  },
  validations() {
    return {
      data: {
        data: {
          username: {
            required,
            email,
          },
          password: {
            required,
          },
        },
      },
    };
  },
};
</script>
