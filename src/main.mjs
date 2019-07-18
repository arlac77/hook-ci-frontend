import Vue from "vue";
import Vuex from 'vuex';
import Router from "vue-router";
import BootstrapVue from "bootstrap-vue";
import VueMomentLib from "vue-moment-lib";
import VueFilterPrettyBytes from "vue-filter-pretty-bytes";
import NotFound from "./components/NotFound.vue";
import State from "./components/State.vue";
import Queues from "./components/Queues.vue";
import Queue from "./components/Queue.vue";
import Jobs from "./components/Jobs.vue";
import Job from "./components/Job.vue";
import JobLog from "./components/JobLog.vue";
import Repository from "./components/Repository.vue";
import Repositories from "./components/Repositories.vue";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Profile from "./components/Profile.vue";
import Callback from "./components/Callback.vue";
import App from "./App.vue";
import { config } from '../package.json';


import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const router = new Router({
  mode: 'history',
  base: config.urlPrefix,
  routes: [
    { path: '*', component: NotFound },
    { name: "index", path: "/index.html", component: Home },
    { name: "home", path: "/", component: Home },
    { name: "about", path: "/about", component: About },
    { name: "profile", path: "/profile", component: Profile },
    { name: "callback", path: "/callback", component: Callback },
    { name: "state", path: "/state", component: State },
    { name: "queues", path: "/queues", component: Queues },
    { name: "queue", path: "/queue/:queue", component: Queue },
    { name: "jobs", path: "/queue/:queue/jobs", component: Jobs },
    { name: "job", path: "/queue/:queue/job/:job", component: Job },
    { name: "jobLog", path: "/queue/:queue/job/:job/log", component: JobLog },
    { name: "repositories", path: "/repositories", component: Repositories },
    { name: "repository", path: "/repository/:repository", component: Repository }
  ]
});


/*
const store = new Vuex.Store({
});
*/

Vue.use(Vuex);
Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(VueMomentLib);
Vue.use(VueFilterPrettyBytes);

export const app = new Vue({
  router,
  //  store,
  render: h => h(App)
}).$mount("app");
