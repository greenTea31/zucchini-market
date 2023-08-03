import axios from "axios";
import { BASE_URL } from "../constants/url";
import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "../hooks/useLocalStorage";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
});

// 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = getUser(); // localStorage에서 토큰을 가져옵니다. 적절한 방법으로 토큰을 가져와주세요.
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
