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

  const login = useCallback((infos: InitialInfosType, token: string) => {
    setToken(token);
    Cookies.set(mo3itoPakToken, token, { expires: 100 });
    setInfos(infos);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setInfos(null);
    Cookies.remove(mo3itoPakToken);
  }, []);

  useEffect(() => {
    const getInfosFromToken = () => {
      try {
        const token = Cookies.get(mo3itoPakToken);
        if (token && token.length > 0) {
          const decodedToken: DecodedTokenType =
            jwtDecode<DecodedTokenType>(token);
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
