import { useUserStore } from "@/store/userStore";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    name: "index",
    redirect: {
      path: "/login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "auth" */ "@/views/authentication/Authentication.vue"
      ),
    props: () => ({
      login: true,
    }),
    meta: {
      unauthenticated: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/views/authentication/Authentication.vue"
      ),
    props: () => ({
      login: false,
    }),
    meta: {
      unauthenticated: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // if visiting an unauthenticated route, always allow
  if (to.meta?.unauthenticated) {
    return next();
  }

  // otherwise, only allow if user is signed in, or redirect
  // to login page
  if (userStore.isUserSignedIn) {
    return next();
  } else {
    return next({
      name: "login",
    });
  }
});

export default router;
