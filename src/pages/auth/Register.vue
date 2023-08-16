<template>
  <q-page class="flex flex-center">
    <!-- content -->
    <q-card
      square
      :flat="!$q.screen.gt.xs ? true : false"
      style="width: 400px; padding: 50px"
    >
      <q-card-section class="row">
        <div class="row text-h6 text-primary no-wrap text-bold">
          {{ $t("auth.register.registernew") }}
        </div>
        <q-space />
        <div>
          <q-checkbox
            v-model="data.autoLogin"
            :label="this.$t('auth.register.autologin')"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model.trim="data.data.name"
          type="text"
          autofocus
          :label="this.$t('auth.register.name')"
        />
        <q-input
          v-model.trim="data.data.email"
          type="email"
          :label="this.$t('auth.register.email')"
          :error="v$.data.data.email.$error"
          :error-message="this.$t('auth.errors.email')"
          @blur="v$.data.data.email.$touch"
        />
        <q-input
          v-model.trim="data.data.password"
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.register.password')"
          :error="v$.data.data.password.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="v$.data.data.password.$touch"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          v-model.trim="data.data.password_confirmation"
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.register.repeat_password')"
          :error="v$.data.data.password_confirmation.$error"
          :error-message="this.$t('auth.errors.password_match')"
          @blur="v$.data.data.password_confirmation.$touch"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="row no-wrap" align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="primary" icon="save" @click="register">
          {{ $t("auth.logout.confirm") }}
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <q-btn color="warning" icon-right="cancel" to="login">
          {{ $t("auth.register.cencel") }}
        </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, sameAs } from "@vuelidate/validators";

export default {
  name: "Login",
  components: {},
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      isPwd: true,
      data: {
        data: {
          name: "luke",
          username: "181977814@qq.com",
          email: "181977814@qq.com",
          password: "*12345678",
          pwdType: "password",
          password_confirmation: "*12345678",
        },
        autoLogin: false,
        rememberMe: false,
      },
      loading: false,
    };
  },
  validations() {
    return {
      data: {
        data: {
          name: {
            required,
          },
          email: {
            required,
            email,
          },
          password: {
            minLength: minLength(8),
            required,
          },
          password_confirmation: {
            sameAsPassword: sameAs(this.data.data.password),
            required,
          },
        },
      },
    };
  },
  created() {},
  methods: {
    register() {
      this.data.data.username = this.data.data.email;
      this.v$.data.$touch();
      if (!this.v$.data.$error) {
        this.loading = true;
        this.$auth
          .register(this.data)
          .then((response) => {
            this.$q.notify({
              message: this.$t("auth.register.account_created"),
              color: "purple-4",
              textColor: "white",
              position: "center",
              timeout: 2500,
              actions: [{ icon: "close", color: "white" }],
            });
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 422) {
                for (var key in error.response.data.error) {
                  switch (error.response.data.error[key][0]) {
                    case "The email has already been taken.":
                      this.$q.notify({
                        message: this.$t("auth.register.already_registered"),
                        color: "red-5",
                        textColor: "white",
                        position: "center",
                        timeout: 2500,
                        actions: [{ icon: "close", color: "white" }],
                      });
                      break;
                    default:
                  }
                }
              } else {
                this.$q.notify({
                  message: this.$t("auth.register.invalid_data"),
                  color: "red-5",
                  textColor: "white",
                  position: "center",
                  timeout: 2500,
                  actions: [{ icon: "close", color: "white" }],
                });
              }
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
