const routes = [
  {
    path: "/",
    meta: { auth: false },
    component: () => import("layouts/GuestLayout.vue"),
    children: [
      { path: "", component: () => import("pages/auth/Login.vue") },
      { path: "/login", component: () => import("pages/auth/Login.vue") },
      { path: "/register", component: () => import("pages/auth/Register.vue") },
      {
        path: "/forgot",
        component: () => import("pages/auth/password/Forgot.vue"),
      },
      {
        path: "/reset",
        component: () => import("pages/auth/password/Reset.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    meta: { auth: true },
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/Index.vue"),
        // component: () => import("pages/IndexPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "not-found",
    component: () => import("pages/Error404.vue"),
  },
];

/*old style by luke

if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    name: "not-found",
    component: () => import("pages/Error404.vue"),
  });
}
 */
export default routes;
