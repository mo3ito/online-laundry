export type InitialInfosType = {
  _id: string;
  name: string;
  last_name: string;
  phone_number: string;
  orders?: any[];
  created_at: string;
  is_driver?: boolean;
  is_dryer?:boolean
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
