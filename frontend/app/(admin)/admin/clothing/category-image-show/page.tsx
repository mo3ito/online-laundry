import React from "react";
import ShowImagesForAdmin from "@/components/admin/ShowImagesForAdmin";
import {
  ADMIN_GET_ALL_CATEGORY_IMAGES,
  ADMIN_DELETE_CATEGORY_IMAGES,
} from "@/routeApi/endpoints";

export default function page() {
  return (
    <ShowImagesForAdmin
      deleteImageApi={ADMIN_DELETE_CATEGORY_IMAGES}
      getAllImageApi={ADMIN_GET_ALL_CATEGORY_IMAGES}
      headersPage="عکس‌های دسته‌بندی"
    />
  );
}
