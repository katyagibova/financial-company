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
      <v-col cols="4">
        <v-card elevation="0" class="rounded-xl pa-3">
          <header class="filter_header">
            Статус заявки
          </header>
          <div class="d-flex mb-5">
            <v-radio-group
            class="mt-0 pt-0"
            hide-details="auto" 
            v-model="radioGroup">
              <v-radio
              color="#3B7978"
              v-for="item in status"
              :key="item"
              :label="item"
              :value="item"
              ></v-radio>
            </v-radio-group>
          </div>
          <header class="filter_header">
            Сумма сделки
          </header>
          <div class="d-flex mb-5">
            <v-text-field
            color="#3B7978"
            v-model="fromSum"
            placeholder="От"
            hide-details="auto"
            class="rounded-lg"
            dense
            elevation="0"
            outlined
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
            color="#3B7978"
            v-model="toSum"
            placeholder="До"
            hide-details="auto"
            class="rounded-lg"
            dense
            elevation="0"
            outlined
            ></v-text-field>
          </div>
          <header class="filter_header">
            Доход со сделки
          </header>
          <div class="d-flex mb-5">
            <v-text-field
            color="#3B7978"
            v-model="fromRevenue"
            placeholder="От"
            hide-details="auto"
            class="rounded-lg"
            dense
            elevation="0"
            outlined
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
            color="#3B7978"
            v-model="toRevenue"
            placeholder="До"
            hide-details="auto"
            class="rounded-lg"
            dense
            elevation="0"
            outlined
            ></v-text-field>
          </div>
          <v-card-actions class="pa-0">
            <v-btn
            @click="fetchApplication"
            class="rounded-lg"
            color="#3B7978"
            dark
            depressed>
              Отфильтровать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
      cols="8"
      >
        <v-row>
          <v-col>
            <v-select
            @change="fetchApplication"
            :items="sortBy"
            v-model="sortValue"
            return-object
            item-color="teal darken-3"
            color="teal darken-3"
            item-text="state"
            item-value="value"
            solo
            flat
            hide-details="auto"
            ></v-select>
          </v-col>
          <v-col align-self="center">
            <div >
              Найдено результатов: {{applications.length}}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div
            v-for="item in applications"
            :key="item.id"
            @click="$router.push({ name: 'application-page', params: { appId: item.id } })">
              <ApplicationCard :application="item" />
            </div>
          </v-col>
        </v-row>
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
      sortBy: [
        { state: "Сначала новые", value: "desc" },
        { state: "Сначала старые", value: "asc" }
      ],
      sortValue: { state: "Сначала новые", value: "desc" },
      fromSum: 0,
      toSum: 0,
      fromRevenue: 0,
      toRevenue: 0,
      radioGroup: "Опубликовано",
      status:[ "Опубликовано", "Одобрено", "Завершено" ],
    }
  },
  methods: {
    fetchApplication(){
      let filters = {
        sortBy: this.sortValue.value,
        fromRevenue: Number(this.fromRevenue),
        toRevenue: Number(this.toRevenue),
        fromSum: Number(this.fromSum),
        toSum: Number(this.toSum),
        status: this.radioGroup
      }
      this.$store.dispatch("getApp", filters).then(() => {
        if(this.toRevenue == 0){
          this.applications.sort((a, b) => b.revenue - a.revenue)
          this.toRevenue = Number(this.applications[0].revenue)
        }
        if(this.toSum == 0){
          this.applications.sort((a, b) => a.sum < b.sum ? 1 : -1)
          this.toSum = Number(this.applications[0].sum)
        }
        
      })
    },
  },
  created(){
    this.$store.dispatch("getAppCities")
    this.fetchApplication()
  }
}
</script>

<style>
.filter_header{
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 10px;
}
</style>