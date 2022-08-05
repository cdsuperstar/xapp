const xapp1s1 = {
  path: "/xapp1s1",
  meta: { auth: false },
  component: () => import("layouts/Xapp1s1MainLayout.vue"),
  children: [
    { path: "", component: () => import("pages/xapp1s1/Login.vue") },
    {
      path: "login",
      name: "xapp1s1-login",
      component: () => import("pages/xapp1s1/Login.vue"),
    },
    {
      path: "register",
      name: "xapp1s1-register",
      component: () => import("pages/xapp1s1/Register.vue"),
    },
    {
      path: "forgot",
      name: "xapp1s1-forgot",
      component: () => import("pages/xapp1s1/Forgot.vue"),
    },
    {
      path: "reset",
      name: "xapp1s1-reset",
      component: () => import("pages/xapp1s1/Reset.vue"),
    },

    {
      path: "home",
      name: "xapp1s1-home",
      component: () => import("pages/xapp1s1/modules/Home.vue"),
    },
    {
      path: "explore",
      name: "xapp1s1-explore",
      component: () => import("pages/xapp1s1/modules/Explore.vue"),
    },
    {
      path: "notify",
      name: "xapp1s1-notify",
      component: () => import("pages/xapp1s1/modules/Notify.vue"),
    },
    {
      path: "message",
      name: "xapp1s1-message",
      component: () => import("pages/xapp1s1/modules/Message.vue"),
    },
    {
      path: "personal",
      name: "xapp1s1-personal",
      component: () => import("pages/xapp1s1/modules/Personal.vue"),
    },
    {
      path: "config",
      name: "xapp1s1-config",
      component: () => import("pages/xapp1s1/modules/Config.vue"),
    },
  ],
};

export default xapp1s1;
