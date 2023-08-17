import {
  USER_LOCAL_STORAGE_KEY,
  USER_INFO_LOCAL_STORAGE_KEY,
} from "../constants/localStorageKey";
import IToken from "../types/IToken";
import { UserInfo } from "./useUserInfo";

export function saveUser(token: IToken): void {
  sessionStorage.setItem(USER_LOCAL_STORAGE_KEY, token.accessToken);
}

export function getUser(): string | null {
  const accessToken = sessionStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return accessToken;
}

export function removeUser(): void {
  sessionStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

export function saveUserInfo(userInfo: UserInfo): void {
  sessionStorage.setItem(USER_INFO_LOCAL_STORAGE_KEY, JSON.stringify(userInfo));
}

export function getUserInfo(): any | null {
  const userInfo = sessionStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY);
  return userInfo;
}

export function removeUserInfo(): void {
  sessionStorage.removeItem(USER_INFO_LOCAL_STORAGE_KEY);
}
