import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "@/store";
import "./assets/main.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

Vue.prototype.$dayjs = dayjs;
dayjs.extend(relativeTime);

Vue.directive("focus", {
  inserted: function(el, flag) {
    if (flag) {
      el.querySelector("input").focus();
    }
  }
});
Vue.use(ElementUI);
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
