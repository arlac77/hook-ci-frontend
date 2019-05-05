import Vue from 'vue';
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

//App.props.queues.push([{name:"EEE"}]);


Vue.use(BootstrapVue)

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
