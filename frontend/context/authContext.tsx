"use client";
import { createContext, useState, useCallback, useEffect } from "react";
import {
  InitialInfosType,
  AuthContextValue,
  DecodedTokenType,
} from "@/types/context/AuthContextType";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { mo3itoPakToken } from "@/help/tokenName";

export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initInfos = {
    _id: "",
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
    await Cookies.set(mo3itoPakToken, token);
    await setInfos(infos);
  }, []);

  const logout = useCallback(async () => {
    await setToken(null);
    await setInfos(null);
    await Cookies.remove(mo3itoPakToken);
  }, []);

  useEffect(() => {
    const getInfosFromToken = async () => {
      try {
        const token = await Cookies.get(mo3itoPakToken);
        if (token && token.length > 0) {
          const decodedToken: DecodedTokenType =
            await jwtDecode<DecodedTokenType>(token);
          console.log("decodedToken:", decodedToken);
          setInfos(decodedToken.infos);
        } else {
          setInfos(null);
        }
      } catch (error) {
        setInfos(null);
      }
    };

    if (!!login) {
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
