<template>
  <v-container>
    <v-toolbar flat>
      <div  sm="2" md="1" class="mr-4 fix-margin-left">
        <router-link to="/" class="reset-link">
          <div>
            <v-img width="40" class="my-logo" contain src="../../assets/logo.svg"></v-img>
          </div>
        </router-link>
      </div>
      <v-toolbar-title class="d-none d-md-flex">
        <div class="logo-text">Aced deal!</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="d-none d-sm-flex">
        <div
        class="text d-flex align-center"
        @click="$router.push({ name: 'application-catalog' })">Все заявки</div>

        <v-btn
          class="ml-4 rounded-lg fix-margin-right"
          height="40px"
          depressed
          dark
          color="#3B7978"
          @click="$router.push({ name: 'user-profile' })"
        >
          Личный кабинет
        </v-btn>

        <v-btn
        v-if="loggedIn"
        class="ml-7 rounded-lg fix-margin-right"
        height="40px"
        dark
        depressed
        color="#3B7978"
        @click="logout"
        >
          Выйти
        </v-btn>        
      </div>
      <div class="d-sm-none d-flex">
        <div
        class="text d-flex align-center"
        @click="$router.push({ name: 'application-catalog' })">Все заявки</div>

        <v-btn
        class="ml-2 rounded-lg fix-margin-right"
        height="40"
        small
        depressed
        icon
        dark
        color="#3B7978"
        @click="$router.push({ name: 'user-profile' })"
        >
          <v-icon size="26">
            mdi-account-circle
          </v-icon>
        </v-btn>

        <v-btn
        v-if="loggedIn"
        class="ml-5 rounded-lg fix-margin-right"
        dark
        small
        height="40"
        icon
        depressed
        color="#3B7978"
        @click="logout"
        >
          <v-icon size="26">
            mdi-exit-to-app
          </v-icon>
        </v-btn>  
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  created(){},
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss">
.text{
  font-size: 20px;
  &:hover{
    text-decoration: underline;
    color: #3B7978;
    cursor: pointer;
  }
}
.logo-text{
  font-family: 'ABeeZee', sans-serif;
  font-size: 36px;
  line-height: 37px;
}

.fix-margin-left {
  margin-left: -16px;
}

.fix-margin-right {
  margin-right: -16px;
}
.v-badge__badge {
  color: black !important;
}
.my-logo {
  width: 40px;
  height: 40px;
  /* background-color: #3B7978; */
  border-radius: 8px;
}
</style>
