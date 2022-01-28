import { jsonFetch } from "./config";

export const rateProduct = (values, id) =>
  jsonFetch(`rating/${id}`, { method: "POST", values, auth: true });
