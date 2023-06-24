import axios from "axios";

import config from "../config/Constants";

const client = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(new Error("Connection error"));
    } else {
      return Promise.reject(error);
    }
  }
);

export const HttpClient = {
  ...client,
};
