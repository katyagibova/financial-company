<template>
<div>
  <div class="home">
    <v-container>
      <div class="my-3 d-flex flex-column justify-center align-center flex-md-row justify-md-space-between">
        <div class="d-flex justify-center text-center text-h5 text-sm-h3 text-md-h2 text-md-left flex-column">
          <div class="white--text">Больше, чем просто финансовая компания</div>
        </div>
        <div>
          <v-img width="19rem" class="d-sm-none d-flex" contain src="../assets/main_img.svg"></v-img>
          <v-img width="30rem" class="d-none d-sm-flex d-md-none" contain src="../assets/main_img.svg"></v-img>
          <v-img width="40rem" class="d-none d-md-flex" contain src="../assets/main_img.svg"></v-img>
        </div>
      </div>
    </v-container>
  </div>
  <div>
    <v-container>
      <v-row class="mt-4">
        <v-col 
        cols="12" 
        md="4"
        v-for="(item, i) in advantages" 
        :key="i"
        class="d-flex flex-column align-center">
          <v-icon size="40" color="#3B7978">
            mdi-{{item.icon}}
          </v-icon>
          <div class="advantages-title text-center mt-4">{{item.title}}</div>
          <div class="mt-2 mx-sm-16 mx-md-0 text-center" style=" color: #616161">
            {{item.text}}
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-4 mb-md-7">
        <v-col cols="12" md="3" lg="2" sm="12">
          <v-btn
          @click="$router.push({ name: 'user-profile' })"
          color="#3B7978"
          dark
          block
          depressed>Оставить заявку</v-btn>
        </v-col>
        <v-col cols="12" md="3" lg="2" sm="12">
          <v-btn
          color="#3B7978"
          text
          block
          depressed
          @click="$router.push({ name: 'application-catalog' })">
            Перейти к заявкам
            <v-icon
            color="#3B7978">
              mdi-arrow-right-thin
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      advantages: [
        {
          icon: "account-cash-outline",
          title: "Без пороговой суммы",
          text: "У нас нет минимальной суммы займа. Любые ваши денежные проблемы должны найти решение!"
        },
        {
          icon: "calendar-clock-outline",
          title: "Без ограничения срока выплаты",
          text: "Вы сами определяете срок, за который готовы погасить долг."
        },
        {
          icon: "percent-outline",
          title: "Низкая процентная ставка",
          text: "Процентная ставка до 15% - это ниже, чем в любом банке страны."
        },
      ]
    }
  }
}
</script>

<style>
.home{
  background-color: #3B7978;
}

.advantages-title{
  color: #212121;
  font-size: 20px;
  line-height: 20px;
}
</style>
