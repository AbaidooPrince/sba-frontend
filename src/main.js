import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
// import { useLocalStorage } from '@vueuse/core'
import App from "./App.vue";
import router from "./router";
import { Form } from "vform";
import CustomButton from "./components/atoms/CustomButton.vue";
// import Form from "vform";
import "./index.css";
import CustomTextArea from "./components/atoms/CustomTextArea.vue";
import CustomInput from "./components/atoms/CustomInput.vue";

window.Form = Form;
const app = createApp(App);
const pinia = createPinia();
app.use(createPinia());
// pinia = ref(useLocalStorage(pinia))
pinia.use(
  createPersistedState({
    storage: window.sessionStorage,
  })
);

// app.use(Form);
app.component("custom-textarea", CustomTextArea);
app.component("custom-input", CustomInput);
app.component("custom-button", CustomButton);
app.use(pinia);
app.use(router);

app.mount("#app");
