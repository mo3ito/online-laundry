"use client";
import { createContext, useState, useCallback, useEffect } from "react";
import {
  InitialInfosType,
  AuthContextValue,
  DecodedTokenType,
} from "@/types/context/AuthContextType";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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

  useEffect(() => {
    if (!!login) {
      const getInfosFromToken = async () => {
        const token = await Cookies.get("mo3itoPak");
        if (token?.length) {
          const decodedToken: DecodedTokenType =
            await jwtDecode<DecodedTokenType>(token);
          setInfos(decodedToken.infos);
        } else {
          setInfos(null);
        }
      };
      getInfosFromToken();
    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ infos, setInfos, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
