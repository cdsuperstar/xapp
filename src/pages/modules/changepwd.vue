<template>
  <q-page class="flex flex-center">
    <!-- content -->
    <q-card square style="width: 400px; padding: 50px">
      <q-card-section>
        <div class="row text-h6 no-wrap text-weight-bold text-secondary">
          {{ $t("auth.password.change.header") }}
          <q-space />
          <q-icon
            color="accent"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            :title="this.$t('auth.password.change.showpwd')"
            @click="isPwd = !isPwd"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model.trim="data.oldpwd"
          :label="this.$t('auth.password.change.currentpwd')"
          :type="isPwd ? 'password' : 'text'"
          :error="$v.data.oldpwd.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="$v.data.oldpwd.$touch"
        />
        <q-input
          v-model.trim="data.newpwd"
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.password.change.newpwd')"
          :error="$v.data.newpwd.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="$v.data.newpwd.$touch"
        />

        <q-input
          v-model.trim="data.password_confirmation"
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.register.repeat_password')"
          :error="$v.data.password_confirmation.$error"
          :error-message="this.$t('auth.errors.password_match')"
          @blur="$v.data.password_confirmation.$touch"
        />
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="secondary" icon="save" @click="changepwd()">
          &nbsp; {{ $t("auth.logout.confirm") }}
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <q-btn color="warning" icon-right="cancel" to="user">
          {{ $t("auth.register.cencel") }} &nbsp;
        </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { required, minLength, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "Changepwd",
  data() {
    return {
      isPwd: true,
      data: {
        oldpwd: "",
        newpwd: "",
        password_confirmation: "",
      },
      loading: false,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  methods: {
    changepwd() {
      this.data.id = this.$auth.user().id;
      this.$v.data.$touch();
      if (!this.$v.data.$error) {
        this.loading = true;
        this.$router.app.$http
          .post("/users/setMyPassword/", this.data)
          .then((res) => {
            this.loading = false;
            if (res.data.success) {
              this.$zglobal.showMessage(
                "positive",
                "center",
                this.$t("auth.password.change.success")
              );
            } else {
              this.loading = false;
              if (res.data.code === 2) {
                this.$zglobal.showMessage(
                  "red-7",
                  "center",
                  this.$t("auth.password.change.oldpwderror")
                );
              }
            }
          })
          .catch((e) => {
            this.loading = false;
          });
      }
    },
  },
  validations: {
    data: {
      oldpwd: {
        minLength: minLength(8),
        required,
      },
      newpwd: {
        minLength: minLength(8),
        required,
      },
      password_confirmation: {
        sameAsPassword: sameAs("newpwd"),
        required,
      },
    },
  },
};
</script>

<style scoped></style>
