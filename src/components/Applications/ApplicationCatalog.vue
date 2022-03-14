<template>
<div>
  <v-container>
    <v-row dense>
      <v-col class="d-flex" cols="12" md="2">
        <v-select
        :items="cities"
        v-model="city"
        item-color="teal darken-3"
        color="teal darken-3"
        solo
        flat
        hide-details="auto"
        ></v-select>
      </v-col>
      <v-col cols="9">
        <v-text-field
        label="Поиск"
        color="#3B7978"
        single-line
        prepend-inner-icon="mdi-magnify"
        v-model="rearch"
        solo
        flat
        hide-details="auto"
        class="rounded-lg"
        ></v-text-field>
      </v-col>
      <v-col cols="3" md="2" lg="1">
        <v-btn
        class="rounded-lg"
        large
        depressed
        height="48px"
        width="100%"
        dark
        color="#3B7978"
        >
          Найти
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense class="my-2">
      <v-col cols="5">
        Здесь будут фильтры
      </v-col>
      <v-col
      cols="7"
      >
        <div
        v-for="item in applications"
        :key="item.id"
        @click="$router.push({ name: 'application-page', params: { appId: item.id } })">
            <ApplicationCard :application="item" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
// import Axios from "axios";
import { mapState } from "vuex";
import ApplicationCard from './ApplicationCard.vue'

export default {
  name: 'ApplicationCatalog',
  components: {
    ApplicationCard
  },
  computed: {
    ...mapState(["applications", "cities", "user_applications"]),
  },
  data(){
    return {
      city: "Москва",
      rearch: "",
    }
  },
  methods: {
    
  },
  created(){
    this.$store.dispatch("getAppCities")
    this.$store.dispatch("getApp")
  }
}
</script>

<style>
</style>