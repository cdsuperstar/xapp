<template>
  <q-page class="flex flex-center">
    <!-- content -->
    <q-card square style="width: 400px; padding: 50px">
      <q-card-section>
        <div class="row text-h6 no-wrap text-bold" style="color: #c10015">
          {{ $t("auth.password.reset.header") }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model.trim="data.data.vkey"
          color="light-green-7"
          type="text"
          autofocus
          :label="this.$t('auth.password.reset.key')"
        />
        <q-input
          v-model.trim="data.data.email"
          color="light-green-7"
          type="email"
          :label="this.$t('auth.register.email')"
          :error="$v.data.data.email.$error"
          :error-message="this.$t('auth.errors.email')"
          @blur="$v.data.data.email.$touch"
        />
        <q-input
          v-model.trim="data.data.password"
          color="light-green-7"
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.password.reset.newpwd')"
          :error="$v.data.data.password.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="$v.data.data.password.$touch"
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
          color="light-green-7"
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.register.repeat_password')"
          :error="$v.data.data.password_confirmation.$error"
          :error-message="this.$t('auth.errors.password_match')"
          @blur="$v.data.data.password_confirmation.$touch"
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
      <q-card-actions class="row no-wrap" align="right">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="purple" icon-right="update" @click="resetpwd">
          {{ $t("auth.password.reset.confirm") }} &nbsp;&nbsp;
        </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { email, required, minLength, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "Reset",
  components: {},
  data() {
    return {
      isPwd: true,
      data: {
        data: {
          vkey: "11",
          email: "1@1.com",
          password: "12345678",
          pwdType: "password",
          password_confirmation: "12345678",
        },
        autoLogin: false,
        rememberMe: false,
      },
      loading: false,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  methods: {
    resetpwd() {
      this.data.data.username = this.data.data.email;
      this.$v.data.$touch();
      if (!this.$v.data.$error) {
        this.loading = true;
        this.$auth
          .resetpwd(this.data)
          .then((response) => {
            this.$q.notify({
              message: this.$t("auth.password.reset.success"),
              color: "green-5",
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
                        message: this.$t("auth.password.reset.keyfail"),
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
  validations: {
    data: {
      data: {
        vkey: {
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
          sameAsPassword: sameAs("password"),
          required,
        },
      },
    },
  },
};
</script>
