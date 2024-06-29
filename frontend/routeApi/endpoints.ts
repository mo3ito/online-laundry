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

//-- clothing type
export const GET_ALL_TYPE = `${BASE_URL_CLOTHING_TYPE}/get-all-type`;
export const GET_ONE_TYPE = `${BASE_URL_CLOTHING_TYPE}/get-one-type`;

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
export const DRIVER_GET_ALL_ORDERS_IS_NOT_DONE = `${BASE_URL_DRIVER}/get-all-orders-is-not-done`;
export const DRIVER_GET_ALL_ORDERS_IS_DONE = `${BASE_URL_DRIVER}/get-all-orders-is-done`;

//-- dryer
export const DRYER_REGISTER = `${BASE_URL_DRYER}/register`;
export const DRYER_LOGIN = `${BASE_URL_DRYER}/login`;
