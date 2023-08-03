import { useNavigate } from "react-router-dom";
import { http } from "../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";
import { saveUser } from "./useLocalStorage";
import IToken from "../types/IToken";

interface IUser {
  id: string;
  password: string;
}

async function login(data: IUser) {
  const response = await http.post("user/login", data);

  return response;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: any) => login(data),
    onMutate: (variables: any) => {
      // 로그인시 실행 함수
    },
    onSuccess: (data: IToken) => {
      // 성공시 실행
      queryClient.setQueryData([QUERY_KEY.user], data);
      saveUser(data);
      navigate("/");
    },
    onError: (error: any) => {
      // 에러 발생시 실행할 함수
      alert("로그인 실패");
    },
  });

  return mutation;
}
