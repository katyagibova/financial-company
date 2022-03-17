<template>
  <v-card elevation="0" height="100%" class="pa-5 rounded-xl mb-3" style="cursor: pointer;">
    <div class="d-flex flex-no-wrap">
      <v-card-text class="pa-0">
        <div class="body-1 grey--text">
          {{ dateFormat(application.publicationDate) }}
        </div>
        <div class="sum mb-2">{{ application.sum }} ₽ на {{ application.monthsNumber }} месяцев</div>
      </v-card-text>
    </div>
    <v-row>
      <v-col cols="12">
        <div class="subtitle">
          Доход со сделки: <span class="black--text"> {{ application.revenue }} ₽</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pt-0">
        <div>{{application.person}}</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    dateFormat(date) {
      let dat = moment(date).locale('ru')
      return dat.format("D MMMM YYYY");
    },
  },
};
</script>

<style>
.sum{
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
}

.subtitle{
  font-size: 20px;
  line-height: 28px;
  color: #3B7978;
}
</style>
