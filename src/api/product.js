import { jsonFetch } from "./config";

export const getProductList = () =>
  jsonFetch("product/list", { method: "GET", auth: true });

export const createProduct = (values) =>
  jsonFetch("product/create", { values, auth: true });

export const editProduct = (values, id) =>
  jsonFetch(`product/update/${id}`, { method: "PUT", values, auth: true });

export const getProductById = (id) =>
  jsonFetch(`product/${id}`, { method: "GET", auth: true });

export const deleteProductById = (id) =>
  jsonFetch(`product/delete/${id}`, { method: "DELETE", auth: true });

export const getProductListByFilter = (filters) =>
  jsonFetch(`product/all${filters}`, { method: "GET", auth: true });
