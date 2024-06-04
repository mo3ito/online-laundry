"use client";
import { createContext, useState, useCallback } from "react";
import {
  InitialInfosType,
  AuthContextValue,
} from "@/types/context/AuthContextType";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initInfos = {
    name: "",
    last_name: "",
    phone_number: "",
    orders: [],
    created_at: "",
  };

  const [infos, setInfos] = useState<InitialInfosType | null>(initInfos);
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback(async (infos: InitialInfosType, token: string) => {
    await setToken(token);
    await Cookies.set("mo3itoPak", token);
    await setInfos(infos);
  }, []);

  const logout = useCallback(async () => {
    await setToken(null);
    await setInfos(null);
    await Cookies.remove("mo3itoPak");
  }, []);

  return (
    <AuthContext.Provider value={{ infos, setInfos, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
