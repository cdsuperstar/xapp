<template>
  <div
    class="ag-cell ag-cell-not-inline-editing ag-cell-with-height ag-cell-value"
  >
    <q-icon
      dense
      name="date_range"
      class="cursor-pointer text-grey-8"
      size="18px"
      style="padding-bottom: 7px"
    >
      <q-popup-proxy dense transition-show="scale" transition-hide="scale">
        <q-date
          dense
          mask="YYYY-MM-DD"
          :landscape="$q.screen.gt.xs"
          :value="params.value"
          v-model="proxyDate"
          today-btn
          @update:model-value="updateDate"
        />
      </q-popup-proxy>
    </q-icon>
    {{ params.value }}
  </div>
</template>

<script>
// import { defineComponent } from "vue";

export default {
  data() {
    return {
      proxyDate: this.params.value,
    };
  },
  methods: {
    updateDate(val) {
      // console.log("celldebug:", val, this.params.value, this.proxyDate);
      this.params.setValue(val);
      return false;
    },
  },
};
</script>
