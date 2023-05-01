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
    path: "/tenant/create",
    name: "tenant-create",
    component: () =>
      import(
        /* webpackChunkName: "auth" */ "@/views/authentication/CreateTenant.vue"
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
    path: "/calendar",
    name: "planner",
    component: () =>
      import(
        /* webpackChunkName: "calendar" */ "@/views/calendar/Calendar.vue"
      ),
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () =>
      import(/* webpackChunkName: "tasks" */ "@/views/ViewTasks.vue"),
  },
  {
    path: "/outlets",
    name: "outlets",
    component: () =>
      import(
        /* webpackChunkName: "outlets" */ "@/views/outlet/ViewAllOutlets.vue"
      ),
  },
  {
    path: "/outlets/:id",
    name: "view-outlet",
    component: () =>
      import(/* webpackChunkName: "outlets" */ "@/views/outlet/ViewOutlet.vue"),
    props: (route) => ({
      outletId: route.params.id,
    }),
  },
  {
    path: "/outlets/map",
    name: "outlets-map",
    component: () =>
      import(/* webpackChunkName: "outlets" */ "@/views/outlet/OutletMap.vue"),
  },
  {
    path: "/settings/company",
    name: "company-settings",
    component: () =>
      import(
        /* webpackChunkName: "settings" */ "@/views/settings/CompanySettings.vue"
      ),
  },
  {
    path: "/settings/user",
    name: "user-settings",
    component: () =>
      import(
        /* webpackChunkName: "settings" */ "@/views/settings/UserSettings.vue"
      ),
  },
  {
    path: "/sales/journeys",
    name: "sales-journeys",
    component: () =>
      import(
        /* webpackChunkName: "sales" */ "@/views/sales/ViewAllSalesJourneys.vue"
      ),
  },
  {
    path: "/sales/journeys/:id",
    name: "view-sales-journey",
    component: () =>
      import(
        /* webpackChunkName: "sales" */ "@/views/sales/ViewSalesJourney.vue"
      ),
    props: (route) => ({
      salesJourneyId: route.params.id,
    }),
  },
  {
    path: "/sales/visits",
    name: "sales-visits",
    component: () =>
      import(
        /* webpackChunkName: "sales" */ "@/views/sales/ViewAllSalesVisits.vue"
      ),
  },
  {
    path: "/sales/visits/:id",
    name: "view-sales-visit",
    component: () =>
      import(
        /* webpackChunkName: "sales" */ "@/views/sales/ViewSalesVisit.vue"
      ),
    props: (route) => ({
      salesVisitId: route.params.id,
    }),
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
