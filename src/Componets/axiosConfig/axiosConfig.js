import axios from "axios";
import { changeLoader } from "../../store/actions/loaderAction";
import store from "../../store/store";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
});
axiosInstance.interceptors.request.use(
  function (config) {
    store.dispatch(changeLoader(true));
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    store.dispatch(changeLoader(false));

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
