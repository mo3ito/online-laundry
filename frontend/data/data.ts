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
        itemName: "افزودن دسته‌بندی",
        path: "/admin/clothing/add-category",
      },
      {
        id: uuidv4(),
        itemName: "افزودن نوع لباس",
        path: "/admin/clothing/add-clothing",
      },

    ],
  },
  { id: uuidv4(), name: "همکاران" },
  { id: uuidv4(), name: "مشتریان" },
  { id: uuidv4(), name: "گزارشات" },
];

export { adminMnuItems };
