import { QUERY_KEY } from "../constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveUserInfo } from "./useLocalStorage";
import IToken from "../types/IToken";
import api from "../utils/api";

export function useUserInfo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: any) => getUserInfo(data),
    onMutate: (variables: any) => {},
    onSuccess: (data: any) => {
      // 성공시 실행
      // 조회한 정보를 쿼리에 저장
      queryClient.setQueryData([QUERY_KEY.userInfo], data);
      // saveUserInfo(data);
    },
    onError: (error: any) => {
      // 에러 발생시 실행할 함수
      alert("회원 정보 가져오기 실패");
    },
  });

  return mutation;
}

export async function getUserInfo(user: IToken): Promise<UserInfo> {
  const response = await api({
    method: "GET",
    url: "user/mypage",
  });
  saveUserInfo(response.data);
  return response.data;
}

export interface UserInfo {
  id: string;
  nickname: string;
  name: string;
  phone: string;
  gender: boolean;
  email: string;
  reportCount: number;
  grade: number;
  dealCount: number;
  locked: boolean;
}
