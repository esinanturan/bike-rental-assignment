import { jsonFetch } from "./config";

export const registerAccount = (values) =>
  jsonFetch("auth/register", { method: "POST", values });

export const loginAccount = (values) =>
  jsonFetch("auth/login", { method: "POST", values });
