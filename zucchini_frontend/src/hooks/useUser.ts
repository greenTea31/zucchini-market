import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/axios";
import { QUERY_KEY } from "../constants/queryKey";
import * as userLocalStorage from "./userLocalStorage";
import { useEffect } from "react";
import axios from "axios";

export function useUser(): IUseUser {
  const { data: user } = useQuery<User | null>(
    [QUERY_KEY.user],
    (): Promise<User | null> => getUser(user),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: userLocalStorage.getUser,
      onError: () => {
        userLocalStorage.removeUser();
      },
    }
  );

  useEffect(() => {
    if (!user) {
      userLocalStorage.removeUser();
    } else {
      userLocalStorage.saveUser(user);
    }
  }, [user]);

  return {
    user: user ?? null,
  };
}

async function getUser(user: User | null | undefined) {
  if (!user) {
    return null;
  }

  const response = await axios({
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  return await response.data;
}

export interface User {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

interface IUseUser {
  user: User | null;
}
