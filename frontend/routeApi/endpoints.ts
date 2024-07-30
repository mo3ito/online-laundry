import {
  BASE_URL_CLOTHING_CATEGORY,
  BASE_URL_CUSTOMERS,
  BASE_URL_CLOTHING_TYPE,
  BASE_URL_ORDERS,
  BASE_URL_DRIVER,
  BASE_URL_DRYER,
  BASE_URL_ADMIN,
} from "./baseUrlNextApi";

//-- clothing category
export const GET_CLOTHING_CATEGORY = `${BASE_URL_CLOTHING_CATEGORY}/get-category`;
export const CLOTHING_CATEGORY_UPLOAD_IMAGE = `${BASE_URL_CLOTHING_CATEGORY}/upload-image`;
export const CLOTHING_CATEGORY_ADD_CATEGORY = `${BASE_URL_CLOTHING_CATEGORY}/add-category`;
export const CLOTHING_CATEGORY_DELETE_CATEGORY = `${BASE_URL_CLOTHING_CATEGORY}/delete-category`;

//-- clothing type
export const GET_ALL_TYPE = `${BASE_URL_CLOTHING_TYPE}/get-all-type`;
export const GET_ONE_TYPE = `${BASE_URL_CLOTHING_TYPE}/get-one-type`;
export const ADD_TYPE = `${BASE_URL_CLOTHING_TYPE}/add-type`;
export const ADD_IMAGE_TYPE = `${BASE_URL_CLOTHING_TYPE}/add-image`;
export const DELETE_TYPE = `${BASE_URL_CLOTHING_TYPE}/delete-type-clothing`;

//-- customers
export const VALIDATION_PHONE_NUMBER = `${BASE_URL_CUSTOMERS}/validation`;
export const VERIFY_CODE = `${BASE_URL_CUSTOMERS}/vrify-code`;
export const CUSTOMER_REGISTER = `${BASE_URL_CUSTOMERS}/register`;
export const CUSTOMER_EDIT_INFORMATION = `${BASE_URL_CUSTOMERS}/edit-information`;

//-- orders
export const SEND_ORDERS = `${BASE_URL_ORDERS}/send-orders`;
export const GET_ORDERS_CUSTOER = `${BASE_URL_ORDERS}/get-orders-customer`;
export const DELETE_ORDER = `${BASE_URL_ORDERS}/delete-order`;

//-- driver
export const DRIVER_REGISTER = `${BASE_URL_DRIVER}/register`;
export const DRIVER_LOGIN = `${BASE_URL_DRIVER}/login`;
export const DRIVER_EDIT_INFORMATION = `${BASE_URL_DRIVER}/edit-information`;
export const DRIVER_GET_ALL_ORDERS_IS_NOT_DONE = `${BASE_URL_DRIVER}/get-all-orders-is-not-done`;
export const DRIVER_GET_ALL_ORDERS_IS_DONE = `${BASE_URL_DRIVER}/get-all-orders-is-done`;
export const DRIVER_GET_ALL_ORDERS_FROM_CUSTOMER = `${BASE_URL_DRIVER}/get-orders-from-customer`;
export const DRIVER_PAY_ORDERS_MONEY = `${BASE_URL_DRIVER}/pay-orders-money`;

//-- dryer
export const DRYER_REGISTER = `${BASE_URL_DRYER}/register`;
export const DRYER_LOGIN = `${BASE_URL_DRYER}/login`;
export const DONE_ORDER = `${BASE_URL_DRYER}/done-order`;
export const DRYER_ORDERS = `${BASE_URL_DRYER}/orders-for-dryer`;
export const DRYER_EDIT_INFORMATION = `${BASE_URL_DRYER}/edit-information`;
export const DRYER_DONE_ORDERS_BY_DRYER = `${BASE_URL_DRYER}/done-orders-by-dryer`;

//-- admin
export const ADMIN_VERIFY_DRIVER = `${BASE_URL_ADMIN}/verify-driver`;
export const ADMIN_REGISTER = `${BASE_URL_ADMIN}/register`;
export const ADMIN_LOGIN = `${BASE_URL_ADMIN}/login`;
export const ADMIN_DELETE_DRIVER = `${BASE_URL_ADMIN}/delete-driver`;
export const ADMIN_GET_ALL_CUSTOMERS = `${BASE_URL_ADMIN}/get-all-customers`;
export const ADMIN_DELETE_CUSTOMER = `${BASE_URL_ADMIN}/delete-customer`;
export const ADMIN_GET_ALL_DRIVER = `${BASE_URL_ADMIN}/get-all-drivers`;
export const ADMIN_GET_ALL_PAID_ORDERS = `${BASE_URL_ADMIN}/paid-orders`;
export const ADMIN_GOT_ORDERS = `${BASE_URL_ADMIN}/got-orders`;
export const ADMIN_DELETE_ORDERS = `${BASE_URL_ADMIN}/delete-order`;
export const ADMIN_DELETE_PAID_ORDERS = `${BASE_URL_ADMIN}/delete-paid-order`;
export const ADMIN_ALL_PAID_ORDERS = `${BASE_URL_ADMIN}/paid-orders`;
export const ADMIN_GET_ALL_ORDERS = `${BASE_URL_ADMIN}/get-all-orders`;
export const ADMIN_GET_ALL_CATEGORY_IMAGES = `${BASE_URL_ADMIN}/get-all-category-images`;
export const ADMIN_DELETE_CATEGORY_IMAGES = `${BASE_URL_ADMIN}/delete-category-image`;
export const ADMIN_GET_ALL_TYPE_IMAGES = `${BASE_URL_ADMIN}/get-all-type-images`;
export const ADMIN_DELETE_TYPE_IMAGES = `${BASE_URL_ADMIN}/delete-type-image`;
export const ADMIN_GET_ALL_UNVERIFY_DRYER = `${BASE_URL_ADMIN}/unverified-dryer-by-admin`;
export const ADMIN_CONFIRM_VERIFY_DRYER = `${BASE_URL_ADMIN}/confirm-verified-dryer-by-admin`;
export const ADMIN_DELETE_UNVERIFY_DRYER = `${BASE_URL_ADMIN}/delete-unverified-dryer`;
export const ADMIN_GET_ALL_VERIFY_DRYERS = `${BASE_URL_ADMIN}/get-all-verify-dryers`;
export const ADMIN_DELETE_VERIFY_DRYER = `${BASE_URL_ADMIN}/delete-verified-dryer`;
export const ADMIN_ENTER_COORDINATES_DRYER = `${BASE_URL_ADMIN}/enter-coordinates-dryer`;
export const ADMIN_UNPAID_DRYER_ORDERS = `${BASE_URL_ADMIN}/unpaid-dryer-orders`;
