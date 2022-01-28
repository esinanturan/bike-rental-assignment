import { jsonFetch } from "./config";

export const createReservation = (values) =>
  jsonFetch("reservation/create", { method: "POST", values, auth: true });

export const getMyReservationList = () =>
  jsonFetch("reservation/me", { method: "GET", auth: true });

export const deleteReservationById = (id) =>
  jsonFetch(`reservation/delete/${id}`, { method: "DELETE", auth: true });
