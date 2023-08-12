import { getUser } from "./useLocalStorage";

interface IToken {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

export default function useAuth() {
  const Token = getUser();

  if (!Token) {
    return false;
  }

  return true;
}
