<template>
  <div id="app">
    <Search msg="Kalkulator walut"/>
  </div>
</template>

<script>
import Search from "./components/Search.vue";

export default {
  name: "app",
  components: {
    Search
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3.8rem;
}

* {
  transition: all 0.1s ease;
}

@media only screen and (max-width: 769px) {
  html {
    font-size: 14px;
  }
}
</style>
