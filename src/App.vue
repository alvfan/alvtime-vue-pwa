<template>
  <div id="app">
    <button @click="signIn">Sign In</button>
    <button @click="signOut">Sign Out</button>
    <button @click="log">Console log user</button>
    <div v-if="user">
      <div>Welcome {{ user.name }}</div>
      <div v-if="user">Your job title is {{ user }}</div>
    </div>
    <router-view />
    <Snackbar />
  </div>
</template>

<script>
import Snackbar from "./components/Snackbar";
import { msalMixin } from "vue-msal";

export default {
  components: {
    Snackbar,
  },

  mounted() {
    this.fetchTasks();
    this.fetchTimeEntries();
  },

  mixins: [msalMixin],

  computed: {
    user() {
      let user = null;
      if (this.msal.isAuthenticated) {
        // Note that the dollar sign ($) is missing from this.msal
        user = {
          ...this.msal.user,
          profile: {},
        };
        if (this.msal.graph && this.msal.graph.profile) {
          user.profile = this.msal.graph.profile;
        }
      }
      return user;
    },
  },

  methods: {
    log() {
      console.log(this.user);
    },

    signOut() {
      this.$msal.signOut();
    },

    signIn() {
      this.$msal.signIn();
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
