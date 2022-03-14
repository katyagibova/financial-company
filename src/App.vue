<template>
  <div id="app">
    <v-app>
      <Header />
      <v-main style=" background-color: #F5F5F5">
        <router-view />
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Footer from './components/Layout/Footer.vue';
import Header from './components/Layout/Header.vue'

export default {
  name: "App",
  components: {Header, Footer},
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
*{
  font-family: 'Poppins', sans-serif;
}
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
