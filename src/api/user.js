import { jsonFetch } from "./config";

export const getUserList = () => jsonFetch("user/list", { method: "GET" });

export const createUser = (values) =>
  jsonFetch("user/create", { values, auth: true });

export const editUser = (values, id) =>
  jsonFetch(`user/update/${id}`, { method: "PUT", values, auth: true });

export const getUserById = (id) =>
  jsonFetch(`user/${id}`, { method: "GET", auth: true });

export const deleteUserById = (id) =>
  jsonFetch(`user/delete/${id}`, { method: "DELETE", auth: true });
