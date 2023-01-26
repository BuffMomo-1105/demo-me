import Vue from "vue";
import VueRouter from "vue-router";
import { Meteor } from "meteor/meteor";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../components/dashboard/Dashboard.vue"
      ),
  },
  {
    path: "/organization/:org_id/dashboard",
    name: "Organization",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../components/organization/Organization.vue"
      ),
  },
  {
    path: "/organization/:org_id/users",
    name: "Users",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/users/Users.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/auth/login.vue"),
  },
  {
    path: "/register",
    name: "Regsiter",
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/auth/register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  let isAuth = Meteor.userId();
  if (to.meta.requiresAuth && !isAuth) {
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
