<template>
  <v-img height="660px" width="100%" src="@/assets/background_img.jpg">
    <v-container class="my-16">
      <v-row class="justify-center my-16">
        <v-col
          cols="10"
          sm="8"
          md="7"
          lg="5"
          xl="3"
          class="white pa-8 rounded-lg my-opacity"
        >
          <div class="font-weight-bold text-h5 mb-7 text-center">
            Войти в аккаунт
          </div>
          <form @submit.prevent="loginUser">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  autocomplete="new-password"
                  label="Электронная почта"
                  outlined
                  v-model="mail"
                  flat
                  color="#3B7978"
                  hide-details="auto"
                  class="rounded-lg"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Пароль"
                  outlined
                  v-model="password"
                  autocomplete="new-password"
                  flat
                  color="#3B7978"
                  hide-details="auto"
                  class="rounded-lg"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  @click:append="showPass = !showPass"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="mt-6">
              <div class="text-center">
                <v-btn
                  tile
                  class="mb-5 rounded-lg"
                  large
                  dark
                  color="#3B7978"
                  elevation="0"
                  type="submit"
                >
                  Продолжить
                </v-btn>
                <p class="mb-0">
                  Нет аккаунта? Зарегистрироваться
                </p>
              </div>
            </div>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      enterMail: false,
      showPass: false,
      password: "",
      mail: "",
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch("loginUser", {
          email: this.mail,
          password: this.password
        })
      .then(() => {
        this.$router.push({ name: "user-profile" });
      })
      .catch(() => {});
    },
  },
};
</script>

<style>
.my-opacity {
  opacity: 0.9 !important;
}
</style>
