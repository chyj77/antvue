import Vue from "vue";
import Router from "vue-router";
//import findLast from "lodash/findLast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      redirect: "/Ztsj"
    },
    {
      path: "/Ztsj",
      name: "涨停数据",
      meta: {
        title: "涨停数据"
      },
      component: () =>
        import("./components/Ztsj")
    },
    {
      path: "/ZtsjChart",
      name: "涨停数据图",
      meta: {
        title: "涨停数据图"
      },
      component: () =>
        import("./components/ZtsjChart")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;