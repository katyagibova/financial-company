<template>
<div>
  <v-card elevation="0" height="100%" class="pa-5 rounded-xl mb-3">
    <div class="d-flex flex-no-wrap">
      <v-card-text class="pa-0">
          <div class="d-flex">
              <div class="body-1 grey--text">
                {{ dateFormat(application.publicationDate) }}
              </div>
              <v-spacer></v-spacer>
              <div>
                  <v-btn  icon>
                    <v-icon color="#000" size="20" @click="editApp">
                        mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                  <v-btn icon class="ml-2">
                    <v-icon color="#000" size="20">
                        mdi-trash-can-outline
                    </v-icon>
                  </v-btn>
              </div>
          </div>
          <div class="d-flex">
            <div class="sum mb-2">{{ application.sum }} ₽ на {{ application.monthsNumber }} месяцев</div>
            <v-spacer></v-spacer>
              <div>
                Статус
              </div>
          </div>
      </v-card-text>
      <slot name="edit-delete"></slot>
    </div>
    <v-row>
      <v-col cols="12" align-self="center">
        <div class="subtitle">
          Ежемесячный платёж: <span class="black--text"> {{ application.payment }} ₽</span>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="8" align-self="center" class="py-0">
        <div class="subtitle">Остаток долга: {{application.debt}} ₽</div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2">
          <v-btn
          color="#3B7978"
          dark
          block
          depressed>
            Заплатить
          </v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-dialog
  width="500"
  v-model="dlg">
      <v-card>
          <h1>Hey</h1>
          <h1>Hey</h1>
          <h1>Hey</h1>
          <h1>Hey</h1>
      </v-card>
  </v-dialog>
</div>
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
    return {
        dlg: false,
    };
  },
  methods: {
    dateFormat(date) {
      let dat = moment(date).locale('ru')
      return dat.format("D MMMM YYYY");
    },

    editApp(){
        
    }
  },
};
</script>

<style>
.sum{
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
}

.subtitle{
  font-size: 22px;
  line-height: 28px;
}
</style>
