import { useNavigate } from "react-router-dom";
import { http } from "../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";
import { getUser, removeUser } from "./useLocalStorage";
import { useUserInfo } from "./useUserInfo";
import { saveUser } from "./useLocalStorage";
import IToken from "../types/IToken";
import axios from "axios";
import { BASE_URL } from "../constants/url";
import api from "../utils/api";

interface IUser {
  id: string;
  password: string;
}

async function login(data: IUser) {
  const response = http.post("user/login", data);

  return response;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: getUserInfo } = useUserInfo();
  const mutation = useMutation({
    mutationFn: (data: any) => login(data),
    onMutate: (variables: any) => {
      // 로그인시 실행 함수
    },
    onSuccess: (data: IToken) => {
      // 성공시 실행
      queryClient.setQueryData([QUERY_KEY.user], data);
      saveUser(data);
      getUserInfo(data);
      navigate("/");
    },
    onError: (error: any) => {
      // 에러 발생시 실행할 함수
      console.log(error.response.data);
      alert(error.response.data);
    },
  });

  return mutation;
}

export async function logout() {
  const accessToken = getUser();

  if (accessToken) {
    await api({
      method: "POST",
      url: "user/logout",
    });
    removeUser();
  }
}

export async function refreshToken() {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}user/reissue`,
      withCredentials: true,
    });

    const token = await response.data;
    saveUser(token);
  } catch (error) {
    console.log("refreshToken이 만료되었습니다.");
    window.location.href = "/login"; // 로그인 페이지로 리다이렉트
  }
}

export function regenerateToken() {}
