// import Vue from 'vue'
import { boot } from "quasar/wrappers";
if (process.env.DEV) {
  console.log("boot zglobl.js excuted");
}

const zglobal = {
  props: {
    self: null,
  },
  colors: {
    blue: [
      { name: "primary", value: "#027BE3" },
      { name: "secondary", value: "#26A69A" },
      { name: "accent", value: "#9C27B0" },
      { name: "positive", value: "#21BA45" },
      { name: "negative", value: "#C10015" },
      { name: "info", value: "#aceee6" },
      { name: "warning", value: "#F2C037" },
      { name: "addbtn", value: "#c0ca33" },
      { name: "deldbtn", value: "#ff7043" },
      { name: "savebtn", value: "#5c6bc0" },
      { name: "treebtn", value: "#ab47bc" },
      { name: "expbtn", value: "#4caf50" },
    ],
    Bright: [
      { name: "primary", value: "#666699" },
      { name: "secondary", value: "#CC3399" },
      { name: "accent", value: "#9C27B0" },
      { name: "positive", value: "#21BA45" },
      { name: "negative", value: "#C10015" },
      { name: "info", value: "#dbcdec" },
      { name: "warning", value: "#F2C037" },
      { name: "addbtn", value: "#CCCC33" },
      { name: "deldbtn", value: "#FF6600" },
      { name: "savebtn", value: "#99CC66" },
      { name: "treebtn", value: "#0099CC" },
      { name: "expbtn", value: "#99CC33" },
    ],
    simple: [
      { name: "primary", value: "#0099CC" },
      { name: "secondary", value: "#336699" },
      { name: "accent", value: "#ABCDEF" },
      { name: "positive", value: "#666666" },
      { name: "negative", value: "#FF9933" },
      { name: "info", value: "#CCCCCC" },
      { name: "warning", value: "#FF9933" },
      { name: "addbtn", value: "#CCCC33" },
      { name: "deldbtn", value: "#FF9933" },
      { name: "savebtn", value: "#99CC33" },
      { name: "treebtn", value: "#ab47bc" },
      { name: "expbtn", value: "#99CC33" },
    ],
    fancy: [
      { name: "primary", value: "#CC3399" },
      { name: "secondary", value: "#9933CC" },
      { name: "accent", value: "#CCCC99" },
      { name: "positive", value: "#CC6699" },
      { name: "negative", value: "#FFCC99" },
      { name: "info", value: "#CCCCCC" },
      { name: "warning", value: "#FF6666" },
      { name: "addbtn", value: "#99CC66" },
      { name: "deldbtn", value: "#FF6666" },
      { name: "savebtn", value: "#339999" },
      { name: "treebtn", value: "#cc7195" },
      { name: "expbtn", value: "#FF33CC" },
    ],
  },
  showMessage(color, position, msgval) {
    this.self.$q.notify({
      message: msgval,
      color: color,
      textColor: "white",
      position: position,
      timeout: 2500,
      actions: [{ icon: "close", color: "white" }],
    });
  },
  flatten(arr) {
    return arr
      ? arr.reduce(
          (result, item) => [...result, item, ...this.flatten(item.children)],
          []
        )
      : [];
  },
  changethemecolor(val) {
    console.log(val, "-----");
    if (val === "blue") {
    }
  },
};
export default boot(({ app }) => {
  app.config.globalProperties.$zglobal = zglobal;
});
