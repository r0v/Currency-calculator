import Vue from "vue";
import Select from "buefy/dist/components/select";
import Field from "buefy/dist/components/field";
import Input from "buefy/dist/components/input";
import "buefy/dist/buefy.css";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Select);
Vue.use(Field);
Vue.use(Input);

new Vue({
  render: h => h(App)
}).$mount("#app");
