const xapp1s1 = {
  path: "/user",
  component: () => import("layouts/Xapp1s1MainLayout.vue"),
  // component: () => import("layouts/DashboardLayout.vue"),
  children: [
    { path: "/xapp1s1", component: () => import("pages/xapp1s1/Login.vue") },
    {
      path: "/xapp1s1/login",
      name: "xapp1s1-login",
      component: () => import("pages/xapp1s1/Login.vue"),
    },
    {
      path: "/xapp1s1/register",
      name: "xapp1s1-register",
      component: () => import("pages/xapp1s1/Register.vue"),
    },
    {
      path: "/xapp1s1/forgot",
      name: "xapp1s1-forgot",
      component: () => import("pages/xapp1s1/Forgot.vue"),
    },
    {
      path: "/xapp1s1/reset",
      name: "xapp1s1-reset",
      component: () => import("pages/xapp1s1/Reset.vue"),
    },

    {
      path: "/user/xapp1s1home",
      name: "xapp1s1home",
      component: () => import("pages/xapp1s1/modules/Home.vue"),
    },
    {
      path: "/user/xapp1s1explore",
      name: "xapp1s1explore",
      component: () => import("pages/xapp1s1/modules/Explore.vue"),
    },
    {
      path: "xapp1s1noti",
      name: "xapp1s1noti",
      component: () => import("pages/xapp1s1/modules/Notify.vue"),
    },
    {
      path: "xapp1s1msg",
      name: "xapp1s1msg",
      component: () => import("pages/xapp1s1/modules/Message.vue"),
    },
    {
      path: "xapp1s1msgbox",
      name: "xapp1s1msgbox",
      component: () => import("pages/xapp1s1/modules/MessageBox.vue"),
    },
    {
      path: "xapp1s1personal",
      name: "xapp1s1personal",
      component: () =>
        import("pages/xapp1s1/modules/Profile-ViewProfile.vue"),
    },
    {
      path: "xapp1s1personalchange",
      name: "xapp1s1personalchange",
      component: () =>
        import("pages/xapp1s1/modules/Profile-ChangeProfile-Main.vue"),
    },
    {
      path: "xapp1s1shop",
      name: "xapp1s1shop",
      component: () =>
        import("pages/xapp1s1/modules/Profile-ShopProfile-Main.vue"),
    },
    // {
    //   path: "xapp1s1shopinfo",
    //   name: "xapp1s1shopinfo",
    //   component: () =>
    //     import("pages/xapp1s1/modules/Profile-ShopProfile-Shop.vue"),
    // },
    {
      path: "xapp1s1createshop",
      name: "xapp1s1createshop",
      component: () =>
        import(
          "pages/xapp1s1/modules/Profile-ShopProfile-ChangeShopProfile-Main.vue"
        ),
    },
    {
      path: "xapp1s1shopproducts",
      name: "xapp1s1shopproducts",
      component: () =>
        import(
          "pages/xapp1s1/modules/Profile-ShopProfile-ProductsList-Main.vue"
        ),
    },
    {
      path: "xapp1s1createproduct",
      name: "xapp1s1createproduct",
      component: () =>
        import(
          "pages/xapp1s1/modules/Profile-ShopProfile-ProductsList-UpdateProduct-Main.vue"
        ),
    },
    {
      path: "xapp1s1profile",
      name: "xapp1s1profile",
      component: () => import("pages/xapp1s1/modules/Profile-Main.vue"),
    },
    {
      path: "xapp1s1set",
      name: "xapp1s1set",
      component: () => import("pages/xapp1s1/modules/Config.vue"),
    },
    {
      path: "xapp1s1sendmoment",
      name: "xapp1s1sendmoment",
      component: () => import("pages/xapp1s1/modules/SendMoment.vue"),
    },
    {
      path: "xapp1s1sendactive",
      name: "xapp1s1sendactive",
      component: () =>
        import("pages/xapp1s1/modules/Profile-ShopProfile-ActiveList-Main.vue"),
    },
    {
      path: "xapp1s1createactive",
      name: "xapp1s1createactive",
      component: () =>
        import(
          "pages/xapp1s1/modules/Profile-ShopProfile-ActiveList-UpdateActive-Main"
        ),
    },
    {
      path: "/user/xapp1s1ActivityDisplay",
      name: "xapp1s1ActivityDisplay",
      component: () =>
        import(
          "src/pages/xapp1s1/modules/ActivityDisplay.vue"
        ),
    },
    {
      path: "/user/xapp1s1GroupDisplay",
      name: "xapp1s1GroupDisplay",
      component: () =>
        import(
          "src/pages/xapp1s1/modules/GroupDisplay.vue"
        )
    },
    {
      path: "/user/xapp1s1SignUp",
      name: "xapp1s1SignUp",
      component: () =>
        import(
          "src/pages/xapp1s1/modules/SignUp.vue"
        )
    },
    {
      path: "otherUserProfile",
      name: "otherUserProfile",
      component: () =>
        import(
          "src/pages/xapp1s1/modules/otherUserProfile.vue"
        )
    }
  ],
};

export default xapp1s1;
