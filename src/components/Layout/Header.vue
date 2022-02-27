<template>
  <v-container>
    <v-toolbar flat>
      <div  sm="2" md="1" class="mr-4 fix-margin-left">
        <router-link to="/" class="reset-link">
          <div >
              <v-img width="40" class="my-logo" contain src="../../assets/main_logo.svg"></v-img>
          </div>
        </router-link>
      </div>
      <v-toolbar-title>
        <div class="logo-text">Aced deal!</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="d-none d-md-flex">
        <v-text-field
          label="Поиск"
          color="#3B7978"
          single-line
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          hide-details="auto"
          class="rounded-lg"
        ></v-text-field>

        <v-btn
          class="ml-4 rounded-lg fix-margin-right"
          height="40px"
          depressed
          dark
          color="#3B7978"
          @click="$router.push({ name: 'login' })"
        >
          Личный кабинет
        </v-btn>

        <!-- <v-btn
          class="ml-7 rounded-lg fix-margin-right"
          height="40px"
          dark
          depressed
          color="#3B7978"
          @click="logout"
        >
          Выйти
        </v-btn>         -->
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
    }
  },
  computed: {},
  created(){},
  methods: {},
};
</script>

<style>

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
