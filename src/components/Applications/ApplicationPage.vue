<template>
    <div style="height: 100%; background-color: #edf3f0">
        <v-container>
            <h1>Heeeeeey</h1>
            <h1>{{this.appId}}</h1>
            <h1>{{this.application}}</h1>
        </v-container>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ApplicationPage",
  props: {
    appId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["application"]),
  },
  created(){
    this.$store.dispatch("getAppInfo", this.appId)
  }
}

</script>

<style></style>
