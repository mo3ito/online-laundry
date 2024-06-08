export type InitialInfosType = {
  name: string;
  last_name: string;
  phone_number: string;
  orders: any[];
  created_at: string;
};

export type AuthContextValue = {
  infos: InitialInfosType | null;
  setInfos: React.Dispatch<React.SetStateAction<InitialInfosType | null>>;
  login: (infos: InitialInfosType, token: string) => void;
  logout: () => void;
  token: string | null;
};

export type DecodedTokenType = {
  infos: InitialInfosType;
};
