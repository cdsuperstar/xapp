<template>
  <q-toolbar>
    <q-btn flat round dense icon="keyboard_arrow_left" to="xapp1s1shop" />
    <q-btn class="col-1" icon="add" flat to="xapp1s1createactive" />
  </q-toolbar>

  <show-active-compoments
    @del="del"
    :activates="activates"
  ></show-active-compoments>
</template>

<script>
import showActiveCompoments from "components/showActive-Compoments";
export default {
  name: "Profile-ShopProfile-ActiveList",
  components: {
    showActiveCompoments,
  },
  data() {
    return {
      activates: "",
    };
  },
  created() {
    this.$api.get("/xapp1s1/shops/getMyactivates").then((res) => {
      if (res.data.success === true) {
        // console.log(res.data.data);
        this.activates = res.data.data;
      }
    });
  },
  methods: {
    del(activeid) {
      this.activates = this.activates.filter((pp) => {
        return pp.id != activeid;
      });
    },
  },
};
</script>

<style scoped></style>
