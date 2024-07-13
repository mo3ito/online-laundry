export type ServicesType = {
  id: string;
  service_name: string;
  price: string;
};

export type ClothingCategoryType = {
  _id: string;
  name: string;
  english_name: string;
  image_url: string;
};

export type TypeClothinginfosType = {
  typeClothingId: string;
  typeClothingEnglishName: string;
};

export type CategoryInfosType = {
  categoryId: string;
  categoryEnglishName: string;
};

export type DriversType = {
  _id: string;
  name: string;
  last_name: string;
  phone_number: string;
  is_driver: boolean;
  password: string;
  is_register_by_admin: boolean;
  created_at: string;
  created_at_shamsi: string;
};

export type CustomersType = {
  _id: string;
  name: string;
  last_name: string;
  phone_number: string;
  is_customer: boolean;
  created_at: "string";
  orders: [];
  created_at_shamsi: "string";
};

export type ShowOrdersForadminProps = {
  ordersApi: string;
  isDeleteButton: boolean;
  dleteOrderApi: string;
  headersPage: string;
  emptyMessage: string;
};

export type AllDataImagesType = {
  _id: string;
  image_name: string;
  image_url: string;
};
