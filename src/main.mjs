import Vue from 'vue';
import App from './App.vue';

//import Vue from 'https://cdn.jsdelivr.net/npm/vue/dist/vue.esm.browser.js';
//import VueRouter from 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.6/vue-router.esm.js';


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

//App.props.queues.push([{name:"EEE"}]);

//Vue.use(VueRouter);

const Home = { template: '<div>home</div>' };
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

/*
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})
*/


export const app = new Vue({
  render: h => h(App),

  //el: '#app',
//  router,
  data: {
    queues: []
  }
});
