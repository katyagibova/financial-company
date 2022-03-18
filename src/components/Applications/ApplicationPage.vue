<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-sm-h6 subtitle-1 font-weight-regular grey--text">
            {{dateFormat(this.application.publicationDate)}}
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <div class="text-h5 text-sm-h4">
            {{ application.sum }} ₽ на {{ application.monthsNumber }} месяцев
          </div>
          <div class="text-h6 text-sm-h5 font-weight-medium mt-3 mt-md-6">
            Описание
          </div>
          <div style="white-space: pre-line" class="subtitle-1 text-sm-h6 font-weight-regular mt-1 mt-md-2 text-justify">
            {{application.description}}
          </div>
          <div class="text-h6 text-sm-h5 font-weight-medium mt-3 mt-md-6">
            Статус: <span class="text-h6 text-sm-h5 font-weight-regular">{{ application.status }}</span> 
          </div>
          <div class="text-h6 text-sm-h5 font-weight-medium mt-3 mt-md-6">
            Доход со сделки: <span class="text-h6 text-sm-h5 font-weight-regular">{{ application.revenue }} ₽</span> 
          </div>
          <div class="mt-3 mt-md-6">
            <v-btn
            v-if="!approved && application.status == 'Опубликовано'"
            @click="respondToApplication"
            dark
            color="#3B7978"
            depressed>
              Откликнуться
            </v-btn>
            <div
            v-if="approved"
            style="color: #3B7978;"
            class="subtitle-1 text-sm-h6">
              <p class="mb-0">Спасибо, что откликнулись на эту заявку! </p>
              <p>Когда {{application.person}} выплатит займ, на ваш счет поступят средства.</p>
            </div>
          </div>
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
</style>
