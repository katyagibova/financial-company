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
        <div class="d-flex">
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
            <div>
                <div>
                    Итоговая процентная ставка:
                </div>
                <div style="margin-top: auto">3% в месяц</div>
                
            </div>
        </div>
        <div>
            <v-slider
            color="#3B7978"
            track-color="#3B7978"
            v-model="slider"
            thumb-label="always"
            ></v-slider>
        </div>
        <div>
            <v-btn
            color="#3B7978"
            dark
            depressed
            class="mr-2"
            @click="postNewApplication">Сохранить</v-btn>
            <v-btn
            color="#F5F5F5"
            depressed>
                Отмена
            </v-btn>
        </div>
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
        create_application_dialog: false,
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
</style>