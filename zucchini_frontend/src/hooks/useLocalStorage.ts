import {
  USER_LOCAL_STORAGE_KEY,
  USER_INFO_LOCAL_STORAGE_KEY,
} from "../constants/localStorageKey";
import IToken from "../types/IToken";
import { UserInfo } from "./useUserInfo";

export function saveUser(token: IToken): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, token.accessToken);
}

export function getUser(): string | null {
  const accessToken = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return accessToken;
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  localStorage.removeItem(USER_INFO_LOCAL_STORAGE_KEY);
}

export function saveUserInfo(userInfo: UserInfo): void {
  localStorage.setItem(USER_INFO_LOCAL_STORAGE_KEY, JSON.stringify(userInfo));
}

export function getUserInfo(): any | null {
  const userInfo = localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY);
  return userInfo;
}

export function removeUserInfo(): void {
  localStorage.removeItem(USER_INFO_LOCAL_STORAGE_KEY);
}
