<style scoped>
.item-container {
  max-width: 22rem;
  margin: 0;
}
.item {
  padding: 0.5rem;
  text-align: left;
  cursor: pointer;
  border-bottom: 1px dashed #b5b5b5;
}
.item:hover {
  border-radius: 15px 15px 5px 5px;
  background: -webkit-linear-gradient(
    #ffffff,
    var(--q-color-info)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    #ffffff,
    var(--q-color-info)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    #ffffff,
    var(--q-color-info)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    #ffffff,
    var(--q-color-info)
  ); /* 标准的语法（必须放在最后） */
}
.item-sub {
  margin: 0 0 0 2rem;
}
.material-icons {
  color: var(--q-color-primary);
}
</style>

<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :value="value"
    @input="emitter"
  >
    <div v-for="el in realValue" :key="el.id" class="item-group">
      <div v-ripple class="item">
        <i class="material-icons" style="font-size: 1.5rem">{{ el.icon }}</i
        >&nbsp;&nbsp;
        <b>{{ el.title }}</b>
      </div>
      <nested-tree class="item-sub" :list="el.children" />
    </div>
  </draggable>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import { defineComponent } from "vue";
export default defineComponent({
  name: "NestedTree",
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    list: {
      required: false,
      type: Array,
      default: null,
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    },
  },
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
  },
});
</script>
