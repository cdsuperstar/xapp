<template>
  <q-page padding class="q-pa-lg">
    <div class="content search">
      <p
        class="row text-h6 no-wrap text-bold"
        style="margin-bottom: 0.5em; color: var(--q-color-positive)"
      >
        {{ $t("help.header") }}
      </p>
      <div inline class="doc-page row">
        <div class="col-md-6">
          <q-input
            v-model.trim="data.data.keyword"
            type="text"
            color="warning"
            required
            autofocus
            :label="this.$t('help.keylabel')"
            :error="this.$v.data.data.keyword.$error"
            :error-message="this.$t('help.check_keylabel')"
            @blur="$v.data.data.keyword.$touch"
          />
        </div>
        <div class="col-md-4 q-gutter-md" style="margin-top: 6px">
          &nbsp;
          <q-btn color="savebtn" icon-right="search" @click="search">
            {{ $t("help.search") }}&nbsp;&nbsp;
          </q-btn>
        </div>
      </div>
      <q-separator color="accent" />
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>Voted!</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="green-8" />
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "Help",
  components: {},
  data() {
    return {
      data: {
        data: {
          keyword: "",
        },
      },
      loading: false,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  methods: {
    search() {
      this.$v.data.$touch();
      if (!this.$v.data.$error) {
        this.loading = true;
        this.$auth
          .search(this.data)
          .then((response) => {})
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
        keyword: {
          required,
        },
      },
    },
  },
};
</script>

<style scoped></style>
