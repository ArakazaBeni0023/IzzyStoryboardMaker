<script>
import HeaderCmp from './components/HeaderCmp.vue';

export default {
  name: 'App',
  components: {
    HeaderCmp,
  },
  computed: {
    showNavigation() {
      return this.$route.name === 'home'
    }
  }
}
</script>

<template>
  <div id="app">
    <HeaderCmp class="header" />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: 2rem;
  margin: 0 auto;
  width: 100%;
  max-width: 70%;
  overflow: auto;
}


@media (max-width: 768px) {
  .main {
    padding: 1rem;
  }
}
</style>