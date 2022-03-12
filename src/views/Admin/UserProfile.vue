<template>
<div  style="height: 100%; background-color: #edf3f0">
  <v-container>
    <div class="d-flex mb-5">
        <div class="text-h4">Мои заявки</div>
        <div class="d-flex align-center ml-2">
          <v-btn color="#3B7978" outlined icon @click="create_application_dialog = true">
            <v-icon color="#3B7978" size="28">
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
    </div>
    <v-row dense>
        <v-col>
            <v-btn
            color="#3B7978"
            dark
            depressed
            @click="postNewApplication">Сохранить</v-btn>
        </v-col>
    </v-row>
  </v-container>
  <v-dialog
  v-model="create_application_dialog"
  max-width="800">
    <v-card
    class="pa-4"
    elevation="0">
        <div class="mb-3">Создать заявку</div>
        <div class="mb-2">
            Название заявки
            <v-text-field
            v-model="title"
            hide-details="auto"
            flat
            solo
            background-color="#F5F5F5">
            </v-text-field>
        </div>
        <div class="mb-2">
            Описание заявки
            <v-textarea
            height="100"
            solo
            v-model="description"
            hide-details="auto"
            background-color="#F5F5F5"
            flat
            ></v-textarea>
        </div>
        <v-row>
          <v-col cols="4">
            <div class="mr-2">
                Сумма займа
                <v-text-field
                v-model="sum"
                hide-details="auto"
                flat
                solo
                background-color="#F5F5F5">
                </v-text-field>
            </div>
          </v-col>
          <v-col cols="8">
            <div>
              <div>
                Итоговая процентная ставка:
              </div>
              <div class="percent d-flex flex-coloumn align-center justify-center">{{percent}}%</div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <div class="mr-2">
              Срок выплаты (в месяцах)
                <v-text-field
                v-model="monthsNumber"
                hide-details="auto"
                flat
                solo
                background-color="#F5F5F5">
                </v-text-field>
            </div>
          </v-col>
          <v-col cols="8">
            <div>
              <div>
                Ежемесячный платёж:
              </div>
              <div class="percent d-flex flex-coloumn align-center justify-center">3000₽</div>
            </div>
          </v-col>
        </v-row>
        <!-- <div>
            <v-slider
            color="#3B7978"
            track-color="#3B7978"
            v-model="slider"
            thumb-label="always"
            ></v-slider>
        </div> -->
        <v-row>
          <v-col cols="2">
            <v-btn
            color="#3B7978"
            dark
            block
            depressed
            class="mr-2"
            @click="postNewApplication">Сохранить</v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-btn
            block
            color="#F5F5F5"
            depressed>
              Отмена
            </v-btn>
          </v-col>
        </v-row>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'UserProfile',
  components: {
  },
  computed: {
    ...mapState(["user_applications"]),
    generateId(){
      const id = '_' + Math.random().toString(36).substr(2, 9);
      return id
    }
  },
  data(){
    return {
      title: "",
      description: "",
      sum: null,
      monthsNumber: null,
      percent: 0,
      create_application_dialog: false,
    }
  },
  watch: {
    sum(value){
      if(value == 0){
        this.percent = 0
      } else if(value > 0 && value < 10000){
        this.percent = 3
      } else if(value >= 10000 && value < 30000){
        this.percent = 4
      } else {
        const number = value / 30000
        this.percent = 4 + Math.trunc(number)
      }
    }
  },
  methods: {
    postNewApplication(){
      const application = {
        id: this.generateId,
        title: this.title,
        sum: Number(this.sum),
        description: this.description,
        percent: 5,
        publicationDate: new Date,
        monthsNumber: Number(this.monthsNumber),
        person: "Гибова Екатерина",
        personId: 4
      }
      console.log(application)
        // this.$store.dispatch("postNewApplication", application)
    },
  },
  created(){
    this.$store.dispatch("getUserApplication")    
  }
}
</script>

<style>
.percent{
  font-size: 32px;
  line-height: 40px;
  color: #3B7978;
}
</style>