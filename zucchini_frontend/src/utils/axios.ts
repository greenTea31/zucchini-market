import Axios from "axios";
import { BASE_URL } from "../constants/url";

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const http = {
  get: function get(url: string) {
    return axios.get(url).then((res) => res.data);
  },
  post: async function post(url: string, body: any) {
    return await axios.post(url, body).then((res) => res.data);
  },
  put: function put(url: string, body: any) {
    return axios.put(url, body).then((res) => res.data);
  },
  delete: function remove(url: string) {
    return axios.delete(url).then((res) => res.data);
  },
};
