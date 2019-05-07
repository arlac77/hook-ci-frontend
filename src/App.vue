<template>
  <div id="app">
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#/">Hook CI</a>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/queues">Queues</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/about">About</a>
        </li>
      </ul>
    </div>
  </nav>
    <router-view> </router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  }
};
</script>
