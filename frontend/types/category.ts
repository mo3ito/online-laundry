export type allCategoryType = {
  _id: string;
  name: string;
  english_name: string;
  image_url: string;
};

export type SwiperMenuPropsType = {
  allCategoryWithoutCurrent: allCategoryType[];
};

export type InformationClothingsItemProps = {
    _id:string;
    clothing_category : string,
    clothing_category_English: string,
    first_price:string;
    image_url:string;
    last_price:string;
    type:string;
    unit:string
  }
