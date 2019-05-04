import Vue from 'https://cdn.jsdelivr.net/npm/vue/dist/vue.esm.browser.js';


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


export const app = new Vue({
  el: '#app',
  data: {
    version: '',
    queues: []
  }
});
