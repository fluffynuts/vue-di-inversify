import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import WeatherComponent from "./views/weather.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about/:city",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/weather/:city",
      name: "weather",
      component: WeatherComponent
    }
  ],
});
