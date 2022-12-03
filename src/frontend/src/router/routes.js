export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
  },
  {
    path: "/sign-in",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "AppLayoutEmpty",
    },
  },
  {
    path: "/user-data",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
];
