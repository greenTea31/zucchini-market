import axios from "axios";
import { BASE_URL } from "../constants/url";
import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "../hooks/useLocalStorage";
import { refreshToken } from "../hooks/useLogin";

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

api.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async function (error) {
    console.log("accessToken expired");
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return api(originalRequest);
    }
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

export default api;
