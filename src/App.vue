<template>
  <div id="app" class="layout">
    <header>
      <app-header title="Hook-CI" />
    </header>
    <div class="body">
      <main class="content">
        <app-body/>
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppBody from './components/AppBody.vue';

export default {
  name: 'App',
  components: { AppHeader, AppBody }
/*  props: {
    queues: { type: Array, default: [{ name: 'CCC', waiting: 0},{ name: 'DDD', waiting: 2}] }
  }*/
};

</script>
