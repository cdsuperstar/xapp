<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    @start="dragging = true"
    @end="dragging = false"
    class="item-container"
    :list="list"
    :value="value"
    @change="emitter"
  >
    <div v-for="el in realValue" :key="el.id" class="item-group">
      <div v-ripple class="item">
        <i class="material-icons" style="font-size: 1.5rem"> {{ el.icon }} </i
        >&nbsp;&nbsp;
        <b>{{ el.title }}</b>
      </div>
      <nested-tree class="item-sub" v-model:list="el.children" />
    </div>
  </draggable>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
  name: "NestedTree",
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    dragging: false;
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
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      // console.log("Inside nested:", this.value, this.list);
      return this.value ? this.value : this.list;
    },
  },
  methods: {
    emitter(value) {
      // console.log("Inside emitter: ", value);
      this.$emit("change", value);
    },
  },
};
</script>

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
    var(--q-info)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    #ffffff,
    var(--q-info)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    #ffffff,
    var(--q-info)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    #ffffff,
    var(--q-info)
  ); /* 标准的语法（必须放在最后） */
}
.item-sub {
  margin: 0 0 0 2rem;
  cursor: pointer;
}
.material-icons {
  color: var(--q-primary);
}
</style>
