import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import VueMomentLib from "vue-moment-lib";
import VueFilterPrettyBytes from "vue-filter-pretty-bytes";
import App from "./App.vue";
import About from "./components/About.vue";
import Queues from "./components/Queues.vue";
import Queue from "./components/Queue.vue";
import Jobs from "./components/Jobs.vue";
import Repository from "./components/Repository.vue";
import Home from "./components/Home.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "about", path: "/about", component: About },
  { name: "queues", path: "/queues", component: Queues },
  { name: "queue", path: "/queue/:queue", component: Queue },
  { name: "jobs", path: "/queue/:queue/jobs", component: Jobs },
  { name: "repository", path: "/repository/:repository", component: Repository }
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
