<template>
<div>
  <v-card flat class="pa-5 rounded-xl">
    <div class="d-flex flex-no-wrap">
      <v-card-text class="pa-0">
        <div class="d-flex align-center" style="height: 36px">
          <div class="card_date grey--text">
            {{ dateFormat(application.publicationDate) }}
          </div>
          <v-spacer></v-spacer>
          <div v-if="application.status == 'Опубликовано'">
            <v-btn icon>
              <v-icon color="#000" size="20" @click="editApp">
                mdi-pencil-outline
              </v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="#000" size="20" @click="delete_application_dialog = true">
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="d-flex">
          <div class="sum mb-2">{{ application.sum }} ₽ на {{ application.monthsNumber }} месяцев</div>
          <v-spacer></v-spacer>
          <div class="d-md-none d-flex"> 
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div>
                  <v-icon
                  v-if="application.status == 'Опубликовано'"
                  size="30"
                  color="purple"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                  v-if="application.status == 'Одобрено'"
                  size="30"
                  color="green"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                  v-if="application.status == 'Завершено'"
                  size="30"
                  color="red"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                </div>
              </template>
              <span>{{application.status}}</span>
            </v-tooltip>
          </div>
          <div class="d-none d-md-flex">
            <v-chip
            v-if="application.status == 'Опубликовано'"
            color="purple"
            outlined
            >{{application.status}}</v-chip>
            <v-chip
            v-if="application.status == 'Одобрено'"
            color="green"
            outlined
            >{{application.status}}</v-chip>
            <v-chip
            v-if="application.status == 'Завершено'"
            color="red"
            outlined
            >{{application.status}}</v-chip>
          </div>
        </div>
      </v-card-text>
    </div>
    <v-row class="pt-1">
      <v-col cols="12" align-self="center">
        <div class="card_subtitle">
          Ежемесячный платёж: {{ application.payment }} ₽
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" md="8" align-self="center" >
        <div class="card_subtitle">Остаток долга: {{application.debt}} ₽</div>
      </v-col>
      <v-spacer class="d-none d-sm-flex"></v-spacer>
      <v-col class="d-none d-sm-flex py-0" v-if="application.status == 'Одобрено'">
        <v-btn
        @click="payment_dialog = true"
        color="#3B7978"
        class="rounded-lg"
        block
        dark
        depressed>
          Заплатить
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="d-sm-none d-flex" v-if="application.status == 'Одобрено'">
      <v-col class="pt-0 d-flex align-end">
        <v-btn
        @click="payment_dialog = true"
        color="#3B7978"
        class="rounded-lg"
        dark
        block
        depressed>
          Заплатить
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-dialog
  v-model="edit_application_dialog"
  max-width="800">
    <v-card
    ref="form"
    class="pa-4"
    elevation="0">
      <div class="d-flex align-center mb-3">
        <div class="text-h5">Редактировать заявку</div>
        <v-spacer></v-spacer>
        <v-btn
        @click="edit_application_dialog = false"
        depressed
        icon>
          <v-icon size="28">
            mdi-close
          </v-icon>
        </v-btn>
      </div>
      <v-row>
        <v-col cols="12" sm="5" md="4">
          <div class="mr-2">
            Сумма займа
            <v-text-field
            v-model="sum"
            ref="sum"
            :rules="[rules.required, rules.isFloatNumber]"
            hide-details="auto"
            flat
            solo
            background-color="#F5F5F5">
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="12" sm="7" md="8">
          <div>
            <div>
              Итоговая процентная ставка:
            </div>
            <div class="percent d-flex flex-coloumn align-center justify-center">{{percent}}%</div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="5" md="4">
          <div class="mr-2">
            Срок выплаты (в месяцах)
            <v-text-field
            ref="monthsNumber"
            v-model="monthsNumber"
            :rules="[rules.required, rules.isIntNumber]"
            hide-details="auto"
            flat
            solo
            background-color="#F5F5F5">
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="12" sm="7" md="8">
          <div>
            <div>
              Ежемесячный платёж:
            </div>
            <div class="percent d-flex flex-coloumn align-center justify-center">{{payment}} ₽</div>
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
      <v-row>
        <v-col cols="6" sm="3">
          <v-btn
          color="#3B7978"
          dark
          block
          depressed
          class="mr-2 rounded-lg"
          @click="updateApp">Сохранить</v-btn>
        </v-col>
        <v-col cols="6" sm="3">
          <v-btn
          @click="edit_application_dialog = false"
          block
          class="rounded-lg"
          color="#F5F5F5"
          depressed>
            Отмена
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
  <v-dialog v-model="payment_dialog" max-width="600">
    <v-card>
      <v-card-text class="d-flex justify-center text-h5 black--text text-center pt-5">
        Сумма списания составляет {{application.payment}} ₽
      </v-card-text>
      <v-card-text class="d-flex justify-center text-h5 text-center black--text">
        Заплатить?
      </v-card-text>
      <v-card-actions class="mt-3">
        <v-spacer></v-spacer>
        <v-btn
        color="#F5F5F5"
        class="rounded-lg"
        @click="payment_dialog = false"
        elevation="0"
        >
          Отмена
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
        elevation="0"
        color="#3B7978"
        class="rounded-lg"
        dark
        @click="makePayment"
        >
          Заплатить
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="delete_application_dialog" max-width="600">
    <v-card>
      <v-card-text class="d-flex justify-center text-h5 black--text text-center pt-5">
        Вы действительно хотите удалить эту заявку?
      </v-card-text>
      <v-card-actions class="mt-3">
        <v-spacer></v-spacer>
        <v-btn
        color="#F5F5F5"
        class="rounded-lg"
        @click="delete_application_dialog = false"
        elevation="0"
        >
          Отмена
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
        elevation="0"
        color="#3B7978"
        class="rounded-lg"
        dark
        @click="deleteApp"
        >
          Удалить
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
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
  computed:{
    form () {
      return {
        sum: this.sum,
        monthsNumber: this.monthsNumber,
      }
    },
  },
  data() {
    return {
      edit_application_dialog: false,
      delete_application_dialog: false,
      payment_dialog: false,
      description: "",
      sum: null,
      monthsNumber: null,
      percent: 0,
      payment: 0,
      rules: {
        required: value => {
          return !!value || 'Обязательно для заполнения'
        },
        isFloatNumber: value => {
          const pattern = /^[1-9][0-9]*(\.[0-9]+)?$/
          return pattern.test(value) || 'Не верный формат числа.\n Пример: 5500.5'
        },
        isIntNumber: value => {
          const pattern = /^[1-9][0-9]*$/
          return pattern.test(value) || 'Введите целое положительное число'
        },
      },
      formHasErrors: false,
    };
  },
  watch: {
    sum(value){
      if(value > 0 && value < 10000){
        this.percent = 11
      } else if(value >= 10000 && value < 15000){
        this.percent = 12
      } else if(value >= 15000 && value < 20000){
        this.percent = 13
      } else if(value >= 20000 && value < 25000){
        this.percent = 14
      } else if(value >= 25000){
        this.percent = 15
      }  else {
        this.percent = 0
        this.payment = 0
        return
      }

      if(this.monthsNumber > 0){
        this.paymentCalculation(this.monthsNumber)
      }
    },
    monthsNumber(value){
      if(this.sum > 0 && value > 0){
        this.paymentCalculation(value)
      } else {
        this.payment = 0
        return
      }
    }
  },
  methods: {
    dateFormat(date) {
      let dat = moment(date).locale('ru')
      return dat.format("D MMMM YYYY");
    },

    updateApp(){
      this.submit()
      if(this.formHasErrors) return

      const revenue = (this.payment * this.monthsNumber - this.sum) * 0.9
      const application = {
        sum: Number(this.sum),
        description: this.description,
        percent:  Number(this.percent),
        payment: Number(this.payment),
        debt: Number(this.sum),
        revenue: Number(this.rounded(revenue)),
        publicationDate: this.application.publicationDate,
        monthsNumber: Number(this.monthsNumber),
        status: "Опубликовано",
        person: "Гибова Екатерина",
        personId: 4
      }
      this.$store.dispatch("updateUserApplication", { appId: this.application.id, application: application })
      .then(() => {
        this.$store.dispatch("getUserApplication")
        this.edit_application_dialog = false
      })
      this.$store.dispatch("updateApplication", { appId: this.application.id, application: application })
    },

    editApp(){
      this.sum = this.application.sum
      this.monthsNumber = this.application.monthsNumber
      this.description = this.application.description
      this.edit_application_dialog = true
    },

    deleteApp(){
      this.$store.dispatch("deleteUserApplication", this.application.id).then(() => {
        this.$store.dispatch("getUserApplication")
      });
      this.$store.dispatch("deleteApplication", this.application.id)
    },

    makePayment(){
      if(this.application.debt < this.application.payment){
        this.application.debt = 0
      } else {
        const percentageShare = this.application.debt * this.application.percent / 1200
        const debtPart = this.application.payment - percentageShare
        this.application.debt = this.rounded(this.application.debt - debtPart)
      }

      if(this.application.debt == 0){
        this.application.status = "Завершено"
      }
      
      this.$store.dispatch("updateUserApplication", { appId: this.application.id, application: this.application })
      .then(() => {
        this.$store.dispatch("getUserApplication")
        this.payment_dialog = false
      })
      this.$store.dispatch("updateApplication", { appId: this.application.id, application: this.application })
    },

    paymentCalculation(data){
      const percentageShare = this.percent / 1200
      this.payment = this.sum*(percentageShare + (percentageShare / ((1 + percentageShare)**data - 1)))
      this.payment = this.rounded(this.payment)
    },

    rounded(number){
      return +number.toFixed(2);
    },

    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })
    },
  },
};
</script>

<style>
.card_date{
  font-size: 16px;
  line-height: 20px;
}

.sum{
  font-weight: 500;
  font-size: 26px;
  line-height: 32px;
}

.card_subtitle{
  font-size: 18px;
  line-height: 20px;
}
</style>
