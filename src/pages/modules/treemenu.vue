<template>
  <div v-if="children.ismenu.indexOf('A') !== -1">
    <q-expansion-item
      v-if="children.children.length > 0"
      :key="children.id"
      v-model="epandstate"
      :header-class="{ 'text-primary text-weight-bold': epandstate }"
      expand-separator
      :to="
        children.url === '' || children.url === null
          ? ''
          : { name: children.url }
      "
      :content-inset-level="depth * 0.2"
      :caption="children.tip"
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-icon :name="children.icon" />
        </q-item-section>

        <q-item-section>
          {{ children.title }}
        </q-item-section>
      </template>
      <treemenu
        v-for="node in children.children"
        :key="node.id"
        :children="node"
        :depth="depth + 1"
      ></treemenu>
    </q-expansion-item>
    <q-item
      v-if="children.children.length == 0"
      :to="
        children.url === '' || children.url === null
          ? ''
          : { name: children.name }
      "
      style="border-bottom: 1px dashed #ebebeb"
      :caption="children.tip"
      :title="children.tip"
    >
      <!-- 暂时禁用 draggable，避免 Vue 3 兼容性问题 -->
      <q-item-section avatar>
        <q-icon :name="children.icon" />
      </q-item-section>
      <q-item-section>{{ children.title }}</q-item-section>
    </q-item>
  </div>
</template>
<script>
// import draggable from "vuedraggable"; // 暂时禁用，v4.1.0 与 Vue 3 存在兼容性问题
export default {
  name: "Treemenu",
  // components: { draggable }, // 暂时禁用
  props: ["children", "depth"],
  data() {
    return {
      epandstate: false,
    };
  },
  created() {
    // console.log(
    //   this.children.url,
    //   this.children.url === '' || this.children.url === null
    // )
    // console.log(this.children.name, this.children, this.depth)
  },
  method: {
    test() {
      console.log(this);
      return true;
    },
  },
};
</script>
