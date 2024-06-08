export type allCategoryType = {
  _id: string;
  name: string;
  english_name: string;
  image_url: string;
};

export type SwiperMenuPropsType = {
  allCategoryWithoutCurrent: allCategoryType[];
};
