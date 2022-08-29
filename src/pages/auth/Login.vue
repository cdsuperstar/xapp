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
  setup: () => ({ v$: useVuelidate() }),
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
                window.Echo = new Echo({
                  broadcaster: "pusher",
                  authEndpoint:
                    "http://" +
                    window.location.hostname +
                    "/api/v1/broadcasting/auth",
                  app_id: 1,
                  key: "b540ff10ff9a76b8ee18",
                  wsHost: window.location.hostname,
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
