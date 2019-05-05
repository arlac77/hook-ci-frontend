

<template>
<div id="app">
    <h1>Hook CI</h1>
    <p>
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
    </p>
    <router-view></router-view>
    <div class="body">
        <main class="content">
            <app-body/>
        </main>
    </div>
</div>

</template>

<style>
.router-link-active {
  color: red;
}
</style>

<script>

import AppHeader from './components/AppHeader.vue';
import AppBody from './components/AppBody.vue';

export default {
    name: 'App',
    components: {
        AppHeader, AppBody
    }
};

</script>
