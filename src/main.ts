import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import {
  MdButton,
  MdSnackbar,
  MdIcon,
  MdCheckbox,
} from "vue-material/dist/components";
import VueMq from "vue-mq";
import moment from "moment";
import msal from "vue-msal";
import config from "@/config";

moment.locale("nb");

console.log("TENANT_ID: ", config.TENANT_ID);
console.log("CLIENT_ID: ", config.CLIENT_ID);
Vue.use(msal, {
  auth: {
    clientId: config.CLIENT_ID,
    tenantId: config.TENANT_ID,
  },
});
Vue.use(VueMq);
Vue.use(MdButton);
Vue.use(MdSnackbar);
Vue.use(MdIcon);
Vue.use(MdCheckbox);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
