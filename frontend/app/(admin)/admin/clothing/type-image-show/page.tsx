import React from "react";
import ShowImagesForAdmin from "@/components/admin/ShowImagesForAdmin";

export default function page() {
  return (
    <ShowImagesForAdmin
      deleteImageApi="http://localhost:4000/admin/delete-type-image"
      getAllImageApi="http://localhost:4000/admin/get-all-type-images"
      headersPage="عکس‌های دسته‌بندی"
    />
  );
}
