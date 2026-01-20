<template>
  <q-page padding>
    <q-btn @click="clearLogs" color="primary"> Clear Logs(X) </q-btn>
    <q-separator />
    <q-card v-for="item in this.errors" :key="item.id" dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">#{{ item.id }}) {{ item.message }}</div>
        <div class="text-subtitle2">{{ item.info }}</div>
      </q-card-section>
      <q-card-section>
        {{ item.stack }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'xapperrs',
  data() {
    return {
      errors: {},
    }
  },
  created() {
    this.getLogs()
  },
  methods: {
    getLogs() {
      this.$api
        .get('/xapperr/getAllLogs/')
        .then((res) => {
          if (res.data.success) {
            this.errors = res.data.data
          } else {
            /* empty */
          }
        })
        .catch((e) => {})
    },
    clearLogs() {
      this.$api
        .post('/xapperr/clearLogs/')
        .then((res) => {
          this.getLogs()
        })
        .catch((e) => {})
    },
  },
}
</script>
