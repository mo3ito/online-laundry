import {
  BASE_URL_CLOTHING_CATEGORY,
  BASE_URL_CUSTOMERS,
  BASE_URL_CLOTHING_TYPE,
  BASE_URL_ORDERS,
  BASE_URL_DRIVER,
  BASE_URL_DRYER,
} from "./baseUrlNextApi";

//-- clothing category
export const GET_CLOTHING_CATEGORY = `${BASE_URL_CLOTHING_CATEGORY}/get-category`;
export const CLOTHING_CATEGORY_UPLOAD_IMAGE = `${BASE_URL_CLOTHING_CATEGORY}/upload-image`;
export const CLOTHING_CATEGORY_ADD_CATEGORY = `${BASE_URL_CLOTHING_CATEGORY}/add-category`;

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
