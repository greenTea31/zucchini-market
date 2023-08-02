import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";

interface IToken {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

export default function useAuth() {
  const queryClient = useQueryClient();
  const Token = queryClient.getQueryData([QUERY_KEY.user]) as IToken;

  if (!Token) {
    return false;
  }

  return true;
}
