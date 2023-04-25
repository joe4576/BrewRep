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
        /* webpackChunkName: "auth" */ "@/views/authentication/Authentication.vue"
      ),
    props: () => ({
      login: false,
    }),
    meta: {
      unauthenticated: true,
    },
  },
  {
    path: "/tenant",
    name: "tenant-selector",
    component: () =>
      import(
        /* webpackChunkName: "auth" */ "@/views/authentication/TenantSelector.vue"
      ),
    meta: {
      noTenant: true,
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () =>
      import(/* webpackChunkName: "tasks" */ "@/views/ViewTasks.vue"),
  },
  {
    path: "/settings/company",
    name: "company-settings",
    component: () =>
      import(
        /* webpackChunkName: "settings" */ "@/views/settings/CompanySettings.vue"
      ),
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

  // if the user isn't signed in, redirect to login
  if (!userStore.isUserSignedIn) {
    return next({
      name: "login",
    });
  }

  // if the user is logged in with a selected tenant, all good
  if (userStore.isUserSignedIn && userStore.isTenantSelected) {
    return next();
  }

  // if user is logged in without a selected tenant...
  if (userStore.isUserSignedIn && !userStore.isTenantSelected) {
    // if going to a no-tenant route, allow
    if (to.meta?.noTenant) {
      return next();
    } else {
      // otherwise redirect to tenant selection
      return next({
        name: "tenant-selector",
      });
    }
  }
});

export default router;
