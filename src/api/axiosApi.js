import axios from "axios";

import { DangerRight } from "./toastServices";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { baseURL, key } from "../component/util/config";



export const apiInstance = axios.create({
  baseURL: baseURL,
});

apiInstance.defaults.headers.common["key"] = key;

apiInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
apiInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (!error?.response?.data?.message) {
      DangerRight("Something went Wrong!");
    }
    if (
      error?.response?.data?.code === "E_USER_NOT_FOUND" ||
      error?.response?.data?.code === "E_UNAUTHORIZED"
    ) {
      localStorage.clear();
      window.location.reload(false);
    }

    if (typeof error?.response?.data?.message === "string") {
      DangerRight(error.response.data.message);
    } else {
      for (let i = 0; i < error?.response?.data?.message?.length; i++) {
        DangerRight(error.response.data.message[i]);
      }
      return Promise.reject(error);
    }
  }
);
