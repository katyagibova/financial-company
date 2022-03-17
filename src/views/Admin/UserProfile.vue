<template>
<div>
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
    <v-row>
      <v-col cols="12" sm="6">
        <div
        v-for="item in user_applications"
        :key="item.id">
          <AdminApplicationCard :application="item" />
        </div>
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
              <div class="percent d-flex flex-coloumn align-center justify-center">{{payment}}₽</div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="mb-2">
              Описание заявки
              <v-textarea
              solo
              v-model="description"
              hide-details="auto"
              background-color="#F5F5F5"
              flat
              ></v-textarea>
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
            @click="create_application_dialog = false"
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
import AdminApplicationCard from './AdminApplicationCard.vue';

export default {
  name: 'UserProfile',
  components: {
    AdminApplicationCard
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
      description: "",
      sum: null,
      monthsNumber: null,
      percent: 0,
      payment: 0,
      create_application_dialog: false,
    }
  },
  watch: {
    sum(value){
      if(value == 0){
        this.percent = 0
      } else if(value > 0 && value < 10000){
        this.percent = 11
      } else if(value >= 10000 && value < 15000){
        this.percent = 12
      } else if(value >= 15000 && value < 20000){
        this.percent = 13
      } else if(value >= 20000 && value < 25000){
        this.percent = 14
      } else if(value >= 25000){
        this.percent = 15
      }

      this.paymentCalculation(this.monthsNumber)
    },
    monthsNumber(value){
      if(this.sum <= 0) return

      this.paymentCalculation(value)
    }
  },
  methods: {
    postNewApplication(){
      const revenue = (this.payment * this.monthsNumber - this.sum) * 0.9
      const application = {
        id: this.generateId,
        sum: Number(this.sum),
        description: this.description,
        percent:  Number(this.percent),
        payment: Number(this.payment),
        debt: Number(this.sum),
        revenue: Number(this.rounded(revenue)),
        publicationDate: new Date,
        monthsNumber: Number(this.monthsNumber),
        status: "Опубликовано",
        person: "Гибова Екатерина",
        personId: 4
      }
      console.log(application)
      this.$store.dispatch("postNewApplication", application)
      this.$store.dispatch("postNewUserApplication", application).then(() => {
        this.create_application_dialog = false
        this.initAppDialog()
      })
    },

    paymentCalculation(data){
      const percentageShare = this.percent / 1200
      this.payment = this.sum*(percentageShare + (percentageShare / ((1 + percentageShare)**data - 1)))
      this.payment = this.rounded(this.payment)
    },

    rounded(number){
      return +number.toFixed(2);
    },

    initAppDialog() {
      this.description = ""
      this.sum = null
      this.monthsNumber = null
      this.percent = 0
      this.payment= 0
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