import { USER_LOCAL_STORAGE_KEY } from "../constants/localStorageKey";
import IToken from "../types/IToken";

export function saveUser(token: IToken): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, token.accessToken);
}

export function getUser(): string | null {
  const accessToken = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return accessToken;
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
