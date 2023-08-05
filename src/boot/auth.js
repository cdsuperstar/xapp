import { boot } from "quasar/wrappers";
//import driverAuthBearer from "src/plugins/passport";
import { api } from "boot/axios";
import { createAuth } from "@websanova/vue-auth/dist/v3/vue-auth.js";
import driverAuthBearer from "../plugins/passport.js";
import driverHttpAxios from "@websanova/vue-auth/dist/drivers/http/axios.1.x.js";
import driverRouterVueRouter from "@websanova/vue-auth/dist/drivers/router/vue-router.2.x.js";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
let auth;
export default boot(({ app, router } /* { app, router, ... } */) => {
  // something to do

  const auth = app.use(
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
        tokenDefaultName: "xapp",
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
          enabled: true,
          interval: 55,
          checkExpiration: true,
          data: {
            grant_type: "refresh_token",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
          },
        },
        fetchData: {
          url: "auth/user",
          method: "GET",
          enabled: true,
          data: {
            grant_type: "authorization_code",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
          },
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
});
export { auth };
