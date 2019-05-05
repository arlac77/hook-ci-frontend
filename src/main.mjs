import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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

Vue.use(BootstrapVue);

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
];

const router = new VueRouter({
  routes
});


export const app = new Vue({
  router,
  render: h => h(App)
}).$mount('app');
