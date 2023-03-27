import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // TODO check for user in user store.
  // If null, redirect to login page
  next();
});

export default router;
