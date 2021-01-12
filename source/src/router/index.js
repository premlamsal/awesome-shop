import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
     meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/product/:slug',
    name: "Product",
    component: () => import("../views/ProductDetail.vue"),
     meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
     meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/CheckOut.vue"),
     meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
     path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
   
  {
     path: "/customer/profile",
    name: "CustomerProfile",
    component: () => import("../views/CustomerProfile.vue"),
     meta: {
      requiresAuth: true,
    },
  },

    
  {
    path: "/category/:slug",
   name: "Category",
   component: () => import("../views/Category.vue"),
  },


];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['auth/getToken']) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
