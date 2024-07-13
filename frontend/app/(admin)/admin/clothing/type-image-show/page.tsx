import React from "react";
import ShowImagesForAdmin from "@/components/admin/ShowImagesForAdmin";
import {
  ADMIN_GET_ALL_TYPE_IMAGES,
  ADMIN_DELETE_TYPE_IMAGES,
} from "@/routeApi/endpoints";

export default function page() {
  return (
    <ShowImagesForAdmin
      deleteImageApi={ADMIN_DELETE_TYPE_IMAGES}
      getAllImageApi={ADMIN_GET_ALL_TYPE_IMAGES}
      headersPage="عکس‌های تایپ‌های لباس"
    />
  );
}
