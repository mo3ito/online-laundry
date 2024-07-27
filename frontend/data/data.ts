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
      {
        id: uuidv4(),
        itemName: "عکس‌های دسته‌بندی",
        path: "/admin/clothing/category-image-show",
      },
      {
        id: uuidv4(),
        itemName: "عکس‌های تایپ‌ها",
        path: "/admin/clothing/type-image-show",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "همکاران",
    list: [
      {
        id: uuidv4(),
        itemName: "مشاهده رانندگان",
        path: "/admin/drivers/show-drivers",
      },
      {
        id: uuidv4(),
        itemName: "تایید رانندگان",
        path: "/admin/drivers/unverified-driver",
      },
      {
        id: uuidv4(),
        itemName: "مشاهده خشکشویی‌ها",
        path: "/admin/dryers/show-dryers",
      },
      {
        id: uuidv4(),
        itemName: "تایید خشکشویی‌ها",
        path: "/admin/dryers/unverified-dryer",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "مشتریان",
    list: [
      {
        id: uuidv4(),
        itemName: "مشاهده مشتریان",
        path: "/admin/customers/show-customers",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "گزارشات",
    list: [
      {
        id: uuidv4(),
        itemName: "کل سفارشات",
        path: "/admin/reports/all-orders",
      },
      {
        id: uuidv4(),
        itemName: "سفارشات پرداخت شده",
        path: "/admin/reports/paid-orders",
      },
      {
        id: uuidv4(),
        itemName: "سفارشات تحویل گرفته شده",
        path: "/admin/reports/got-orders",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "امکانات",
    list: [
      {
        id: uuidv4(),
        itemName: "QR code",
        path: "/admin/qr-code",
      },
    ],
  },
];

export { adminMnuItems };
