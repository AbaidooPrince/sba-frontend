import axios from "axios";
// import * as Cookies from "js-cookie";
import { useAuthStore } from "../stores/auth";
export default () => {
  // eslint-disable-next-line no-undef
  const Api = "http://localhost:1337/api";
  console.log(Api);
  const authStore = useAuthStore()
  const authToken = authStore.token
  return axios.create({
    baseURL: Api,
    withCredentials: false,
    headers: {
      Accept: "Application/json",
      Authorization: authToken ? `Bearer ${authToken}` : null,
    },
  });
};
