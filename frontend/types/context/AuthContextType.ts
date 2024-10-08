export type InitialInfosType = {
  _id: string;
  name: string;
  last_name: string;
  phone_number: string;
  created_at: string;
  is_customer?: boolean;
  is_driver?: boolean;
  is_dryer?:boolean;
  is_register_by_admin?:boolean;
  is_admin?:boolean
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
