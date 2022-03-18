<template>
<div>
  <v-container>
    <!-- <v-row dense>
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
    </v-row> -->
    <v-row dense class="my-2">
      <v-col cols="5" lg="4" sm="4" class="d-none d-md-flex align-start">
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
          <v-row class="mb-2">
            <v-col cols="12" md="6">
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
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="6">
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
            </v-col>
          </v-row>
          <header class="filter_header">
            Доход со сделки
          </header>
          <v-row class="mb-2">
            <v-col cols="12" md="6">
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
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="6">
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
            </v-col>
          </v-row>
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
      <v-col lg="8" xs="12">
        <v-row>
          <v-col cols="2" class="d-md-none" sm="1">
            <v-btn @click="drawer = !drawer" height="100%" depressed color="#fff" small class="rounded-lg">
              <v-icon color="#000" size="28">
                mdi-tune-variant
              </v-icon>
            </v-btn>
            <v-navigation-drawer
            v-model="drawer"
            absolute
            width="100%"
            temporary
            >
              <v-card elevation="0" class="rounded-xl pa-3">
                <div class="d-flex align-center">
                  <div class="filter_header text-decoration-underline mb-0">Фильтры</div>
                  <v-spacer></v-spacer>
                  <v-btn
                  @click="drawer = false"
                  depressed
                  icon>
                    <v-icon>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </div>
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
                <v-row class="mb-5">
                  <v-col cols="6">
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
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="6">
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
                  </v-col>
                </v-row>
                <header class="filter_header">
                  Доход со сделки
                </header>
                <v-row class="mb-5">
                  <v-col cols="6">
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
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="6">
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
                  </v-col>
                </v-row>
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
            </v-navigation-drawer>
          </v-col>
          <v-col cols="10" lg="4" sm="5">
            <v-select
            @change="fetchApplication"
            :items="sortBy"
            v-model="sortValue"
            class="rounded-lg"
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
          <v-col class="d-none d-sm-flex" align-self="center">
            <div>
              Найдено результатов: {{applications.length}}
            </div>
          </v-col>
          <v-col class="d-sm-none pt-0" align-self="center">
            <div>
              Найдено результатов: {{applications.length}}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="applications.length != 0" class="pt-0">
            <div
            v-for="item in applications"
            :key="item.id"
            @click="$router.push({ name: 'application-page', params: { appId: item.id } })">
              <ApplicationCard :application="item" />
            </div>
          </v-col>
          <v-col v-else>
            <div class="d-flex flex-column align-center">
              <div class="notfound_message text-center">По вашему запросу ничего не найдено</div>
              <v-icon color="#E0E0E0" size="285">
                mdi-emoticon-cry-outline
              </v-icon>
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
    ...mapState(["applications", "cities", "user_applications", "maxRevenue", "maxSum"]),
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
      drawer: false,
      group: null,
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
        this.toRevenue = this.maxRevenue
        this.toSum = this.maxSum
        this.drawer = false
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
  color: #000;
  margin-bottom: 10px;
}

.notfound_message{
  font-size: 28px;
  line-height: 36px;
}
</style>