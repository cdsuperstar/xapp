import { boot } from "quasar/wrappers";
import axios from "axios";
if (process.env.DEV) {
  console.log("boot axios.js excuted");
}

// import { createAuth } from "@websanova/vue-auth/src/v3.js";
import { createAuth } from "@websanova/vue-auth/dist/v3/vue-auth.js";
import driverAuthBearer from "../plugins/passport.js";
import driverHttpAxios from "@websanova/vue-auth/dist/drivers/http/axios.1.x.js";
import driverRouterVueRouter from "@websanova/vue-auth/dist/drivers/router/vue-router.2.x.js";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.BASE_URL });

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;

  axios.defaults.baseURL = process.env.BASE_URL;
  if (process.env.DEV) {
    console.log("baseurl:", process.env.BASE_URL);
    console.log("client id:", process.env.CLIENT_ID);
    console.log("client secret:", process.env.CLIENT_SECRET);
  }

  app.use(
    createAuth({
      plugins: {
        http: api,
        router: router,
      },
      drivers: {
        http: driverHttpAxios,
        auth: driverAuthBearer,
        router: driverRouterVueRouter,
      },
      options: {
        rolesVar: "role",
        tokenStore: ["localStorage", "cookie"],
        tokenDefaultName: "xapp0",
        // authRedirect: { path: '/user' },
        // forbiddenRedirect: { path: '/403' },
        // notFoundRedirect: { path: '/404' },
        registerData: {
          url: "auth/register",
          method: "POST",
          redirect: "/login",
        },
        loginData: {
          url: "oauth/token",
          method: "POST",
          redirect: "/user/dashboard",
          fetchUser: true,
          staySignedIn: true,
          data: {
            grant_type: "password",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
          },
        },
        logoutData: {
          url: "auth/logout",
          method: "POST",
          redirect: "/login",
          makeRequest: true,
        },
        // fetchData: { url: 'auth/user', method: 'GET', enabled: false },
        refreshData: {
          url: "oauth/token",
          method: "POST",
          enabled: false,
          interval: 55,
          checkExpiration: true,
          data: {
            grant_type: "refresh_token",
          },
        },
        fetchData: {
          url: "auth/user",
          method: "GET",
          enabled: true,
        },
        // passportData: {
        //   client_id: 2,
        //   client_secret: "XniZcYuqhk5Ox3B1whpdIlbApQ8Rop0DMsh2kEzh",
        // },
        // rolesKey: "type",
        // notFoundRedirect: { name: "landing" },
        rolesKey: "name",
        tokenDefaultKey: "access_token",
        refreshTokenKey: "refresh_token",
        tokenExpiresKey: "expires_in",
      },
    })
  );
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
