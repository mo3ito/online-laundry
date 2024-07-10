import { v4 as uuidv4 } from "uuid";

const adminMnuItems = [
  {
    id: uuidv4(),
    name: "لباس‌ها",
    list: [
      {
        id: uuidv4(),
        itemName: "دسته‌بندی‌ها",
        path: "/admin/clothing/categories",
      },
      {
        id: uuidv4(),
        itemName: "تایپ‌ها",
        path: "/admin/clothing/clothes",
      },
      {
        id: uuidv4(),
        itemName: "افزودن دسته‌بندی",
        path: "/admin/clothing/add-category",
      },
      {
        id: uuidv4(),
        itemName: "افزودن تایپ",
        path: "/admin/clothing/add-clothing",
      },

    ],
  },
  { id: uuidv4(), name: "رانندگان" ,     list: [
    {
      id: uuidv4(),
      itemName: "مشاهده رانندگان",
      path: "/admin/drivers/show-drivers",
    },
    {
      id: uuidv4(),
      itemName: "تایپ‌ها",
      path: "/admin/clothing/clothes",
    },


  ], },
  { id: uuidv4(), name: "مشتریان" },
  { id: uuidv4(), name: "گزارشات" },
];

export { adminMnuItems };
