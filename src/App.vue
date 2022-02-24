<template>
  <div id="app">
    <v-app>
      <Header />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Layout/Header.vue'

export default {
  name: "App",
  components: {Header},
  data() {
    return {
    }
  },
  computed: {},
  created(){},
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
