import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import About from "./components/About.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export async function refresh(app) {
  try {
    const data = await fetch("api/state");
    const state = await data.json();
    app.version = state.version;
    app.queues.length = 0;
    app.queues.push(...state.queues);
  } catch (err) {
    console.error(err);
  }
}

const Foo = { template: "<div>foo</div>" };

const routes = [
  { path: "/about", component: About },
  { path: "/foo", component: Foo }
];

const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
Vue.use(BootstrapVue);

export const app = new Vue({
  router,
  render: h => h(App)
}).$mount("app");
