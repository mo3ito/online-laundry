import ShowOrdersForadmin from '@/components/admin/ShowOrdersForAdmin'
import { ADMIN_DELETE_ORDERS } from '@/routeApi/endpoints'
import React from 'react'

export default function page() {
  return (
    <ShowOrdersForadmin
    ordersApi={"http://localhost:4000/admin/get-all-orders"}
    isDeleteButton={true}
    dleteOrderApi={ADMIN_DELETE_ORDERS}
    headersPage="سفارشات تحویل گرفته شده"
    emptyMessage="هیچ سفارشی وجود ندارد"
  />
  )
}
