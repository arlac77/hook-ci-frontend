<style>

.header {
    padding: 10px 0;
}

</style>

<template>

<h1 class="header">
    {{ title }}
  </h1>

</template>

<script>

export default {
    name: 'AppHeader',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};

</script>
