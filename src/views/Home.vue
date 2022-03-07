<template>
<div>
  <div class="home">
    <v-container>
      <div class="my-3 d-flex justify-space-between">
        <div class="text-h2 d-flex justify-center flex-column">
          <div class="white--text">Больше, чем просто финансовая компания</div>
          <div>
            <v-btn
            height="40px"
            dark
            depressed
            outlined
            class="rounded-lg"
            color="#fff">Оставить заявку</v-btn>
          </div>
        </div>
        <div>
          <v-img width="660" contain src="../assets/main_img.svg"></v-img>
        </div>
      </div>
    </v-container>
  </div>
  <div class="grey lighten-4">
    <v-container>
      <v-row class="mt-4">
        <v-col 
        cols="4" 
        v-for="(item, i) in advantages" 
        :key="i"
        class="d-flex flex-column align-center">
          <v-icon size="40" color="#3B7978">
            mdi-{{item.icon}}
          </v-icon>
          <div class="advantages-title mt-4">{{item.title}}</div>
          <div class="mt-2" style="text-align: center; color: #616161">
            {{item.text}}
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-4 mb-7">
        <v-col cols="2">
          <v-btn
          color="#3B7978"
          dark
          block
          depressed>Рассчитать займ</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn
          color="#3B7978"
          text
          block
          depressed
          @click="$router.push({ name: 'applications' })">
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
          text: "Процентная ставка от 3% - это ниже, чем в любом банке страны."
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
