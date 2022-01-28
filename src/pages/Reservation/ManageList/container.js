import { hoc } from "@";
import { useCallback, useEffect, useState, useMemo } from "react";
import { getAllReservations } from "@api";

const container = hoc((props) => {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllReservations = useCallback(async () => {
    const response = await getAllReservations();
    if (response?.success) setReservations(response.data);
  }, []);

  const filterFields = useCallback(
    (user) => {
      const regExp = new RegExp(search, "ig");
      return regExp.test(user.model) || regExp.test(user.email);
    },
    [search]
  );

  const filteredReservations = useMemo(
    () => reservations.filter((user) => filterFields(user)),
    [filterFields, reservations]
  );

  useEffect(() => {
    fetchAllReservations();
  }, [fetchAllReservations]);

  return {
    ...props,
    reservations: filteredReservations,
    setSearch,
  };
});

export default container;
