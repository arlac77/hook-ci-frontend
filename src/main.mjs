import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import VueMomentLib from 'vue-moment-lib';
import VueFilterPrettyBytes from 'vue-filter-pretty-bytes'
import App from "./App.vue";
import About from "./components/About.vue";
import Queues from "./components/Queues.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const routes = [
  { path: "/about", component: About },
  { path: "/queues", component: Queues }
];

const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueMomentLib);
Vue.use(VueFilterPrettyBytes);

export const app = new Vue({
  router,
  render: h => h(App)
}).$mount("app");
