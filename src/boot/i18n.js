import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";

import messages from "src/i18n";

if (process.env.DEV) {
  console.log("boot i18n.js excuted");
}

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: "zh-CN",
    fallbackLocale: "zh-CN",
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
