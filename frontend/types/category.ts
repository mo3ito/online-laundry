export type allCategoryType = {
  _id: string;
  name: string;
  english_name: string;
  image_url: string;
};

export type SwiperMenuPropsType = {
  allCategoryWithoutCurrent: allCategoryType[];
};

export type ServicesInformationclothing = {
  _id: string;
  price: string;
  service_name: string;
};

export type InformationClothingsItemProps = {
  _id: string;
  clothing_category: string;
  clothing_category_English: string;
  image_url: string;
  services: ServicesInformationclothing[];
  type: string;
  english_type: string;
  unit: string;
};
