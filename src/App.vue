<template>
  <div id="app">
    <button v-on:click="$adal.login()">Sign In</button>
    <button v-on:click="$adal.logout()">Sign Out</button>
    <div v-if="$adal.isAuthenticated()">You are signed in!</div>
    <div v-if="$adal.checkRoles(['Admin'])">You're also an admin</div>
    <div v-if="!$adal.checkRoles(['Admin'])">You're not an admin</div>
    <div>{{ profile }}</div>
    <router-view />
    <Snackbar />
  </div>
</template>

<script>
import Snackbar from "./components/Snackbar";
import config from "@/config";
import { AuthenticationContext } from "vue-adal";

export default {
  components: {
    Snackbar,
  },

  mounted() {
    /* this.login(); */
    this.fetchTasks();
    this.fetchTimeEntries();
  },

  computed: {
    profile() {
      return AuthenticationContext &&
        AuthenticationContext.user &&
        AuthenticationContext.user.profile
        ? AuthenticationContext.user.profile
        : "";
    },
  },

  methods: {
    login() {
      const url = new URL(config.HOST + "/api/ping").toString();
      const res = fetch(url, {
        redirect: "follow",
      });
    },
    fetchTasks() {
      return this.$store.dispatch("FETCH_TASKS");
    },

    fetchTimeEntries() {
      return this.$store.dispatch("FETCH_TIME_ENTRIES");
    },
  },
};
</script>

<style>
html {
  font-size: 20px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
