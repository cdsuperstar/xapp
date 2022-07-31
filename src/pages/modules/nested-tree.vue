<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="lists"
    item-key="id"
    @change="emitter"
  >
    <template #item="{ element }">
      <div>
        <div v-ripple class="item">
          <i class="material-icons" style="font-size: 1.5rem">
            {{ element.icon }} </i
          >&nbsp;&nbsp;
          <b>{{ element.title }}</b>
        </div>
        <nested-tree class="item-sub" v-model:lists="element.children" />
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "NestedTree",
  components: {
    draggable,
  },
  data() {},
  mounted() {},
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    lists: {
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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
