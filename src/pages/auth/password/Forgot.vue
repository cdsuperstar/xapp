<template>
  <q-page class="flex flex-center">
    <q-card
      square
      :flat="!$q.screen.gt.xs ? true : false"
      style="width: 400px; padding: 50px"
    >
      <q-card-section>
        <div class="row text-h6 no-wrap text-bold" style="color: #ff9800">
          {{ $t("auth.password.forgot.header") }}
        </div>
      </q-card-section>

      <q-card-section>
        请输入注册时使用的邮箱：
        <q-input
          id="email"
          v-model.trim="data.data.username"
          type="email"
          required
          autofocus
          :label="this.$t('auth.login.email')"
          :error="this.$v.data.data.username.$error"
          :error-message="this.$t('auth.password.forgot.check_email')"
          @blur="$v.data.data.username.$touch"
        />
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="secondary" icon-right="flight_takeoff" @click="sendemail">
          {{ $t("auth.password.forgot.send") }}&nbsp;&nbsp;
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <q-btn color="warning" icon-right="cancel" to="login">
          {{ $t("auth.password.forgot.back") }} &nbsp;&nbsp;
        </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="yellow" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "Forgot",
  components: {},
  data() {
    return {
      isPwd: true,
      data: {
        data: {
          username: "1@1.com",
        },
      },
      loading: false,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  methods: {
    sendemail() {
      this.$v.data.$touch();
      if (!this.$v.data.$error) {
        this.loading = true;
        this.$auth
          .sendemail(this.data)
          .then((response) => {
            this.$q.notify({
              message: this.$t("auth.password.forgot.success"),
              color: "green-5",
              textColor: "white",
              position: "center",
              timeout: 2500,
              actions: [{ icon: "close", color: "white" }],
            });
          })
          .catch((error) => {
            if (error.response) {
              this.$q.notify({
                message: this.$t("auth.register.invalid_data"),
                color: "red-5",
                textColor: "white",
                position: "center",
                timeout: 2500,
                actions: [{ icon: "close", color: "white" }],
              });
              console.error(error);
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
        username: {
          required,
          email,
        },
      },
    },
  },
};
</script>
