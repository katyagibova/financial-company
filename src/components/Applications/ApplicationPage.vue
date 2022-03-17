<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <header class="date grey--text">
            {{dateFormat(this.application.publicationDate)}}
          </header>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <section>
            <header class="header">
              {{ application.sum }} ₽ на {{ application.monthsNumber }} месяцев
            </header>
            <h1 class="description_title mt-6">
              Описание
            </h1>
            <div style="white-space: pre-line" class="description_subtitle mt-2 text-justify">
              {{application.description}}
            </div>
            <div class="description_title mt-6">
              Доход со сделки: {{ application.revenue }} ₽
            </div>
            <div class="mt-6">
              <v-btn
              v-if="!approved"
              @click="respondToApplication"
              dark
              color="#3B7978"
              depressed>
                Откликнуться
              </v-btn>
              <div
              class="approved_message"
              v-if="approved">
                <p class="mb-0">Спасибо, что откликнулись на эту заявку! </p>
                <p>Когда {{application.person}} выплатит займ, на ваш счет поступят средства.</p>
              </div>
            </div>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";

export default {
  name: "ApplicationPage",
  props: {
    appId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      approved: false,
    };
  },
  methods: {
    dateFormat(date) {
      let dat = moment(date).locale('ru')
      return dat.format("D MMMM YYYY");
    },

    respondToApplication(){
      if(this.loggedIn){
        this.application.status =  "Одобрено"
        this.$store.dispatch("updateUserApplication", { appId: this.appId, application: this.application })
        .then(() => {
          this.approved = true
        })
        this.$store.dispatch("updateApplication", { appId: this.appId, application: this.application })
      } else {
        this.$router.push({ name: 'user-profile' })
      }
    }
  },
  computed: {
    ...mapState(["application"]),
    ...mapGetters(["loggedIn"]),
  },
  created(){
    this.$store.dispatch("getAppInfo", this.appId)
  }
}

</script>

<style>
.date{
  font-size: 20px;
}
.header{
  font-weight: 500;
  font-size: 36px;
  line-height: 40px;
}

.description_title{
  font-size: 32px;
  line-height: 40px;
  font-weight: 400;
}

.description_subtitle{
  font-size: 22px;
  line-height: 30px;
}

.approved_message{
  font-size: 20px;
  line-height: 30px;
  color: #3B7978;
}
</style>
