<template>
  <v-card elevation="0" height="100%" class="pa-5 rounded-xl">
    <div class="d-flex flex-no-wrap">
      <v-card-text class="pa-0">
        <div class="body-1 grey--text">
          <!-- {{ dateFormat(application.publicationDate) }} -->
        </div>
        <div class="text-h6 mb-2">{{ application.title }}</div>
      </v-card-text>
      <slot name="edit-delete"></slot>
    </div>
    <v-row>
        <v-col cols="6">
            <div class="body-1 blue--text">
                Сумма: <span class="black--text"> {{ application.sum }} ₽ </span>
            </div>
        </v-col>
        <v-col cols="6">
            <div class="body-1 blue--text">
                Процент: <span class="black--text"> {{ application.percent }} % </span>
            </div>
        </v-col>
    </v-row>
    <div class="d-flex mt-2 mb-2">
      <div class="body-1 blue--text">
        На срок: <span class="black--text"> {{ application.monthsNumber }} месяцев </span>
      </div>
    </div>
    <v-row>
      <v-col cols="12">
        <div>{{application.person}}</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
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
  },
};
</script>

<style></style>
