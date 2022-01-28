import { hoc } from "@";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getMyReservationList, deleteReservationById } from "@api";
import { setEditUser } from "@store/slices/user";

const container = hoc((props) => {
  const dispatch = useDispatch();

  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const setEditUserAction = useCallback(
    (user) => {
      dispatch(setEditUser(user));
    },
    [dispatch]
  );

  const fetchMyReservationList = useCallback(async () => {
    setLoading(true);
    const response = await getMyReservationList();
    setLoading(false);
    if (response.success) {
      setReservations(response.data);
    }
  }, []);

  const onDeleteConfirmed = useCallback(async (reservation) => {
    setLoadingDelete(true);
    const response = await deleteReservationById(reservation.id);
    setLoadingDelete(false);

    if (response.success)
      setReservations((state) =>
        state.filter((item) => item.id !== reservation.id)
      );
  }, []);

  useEffect(() => {
    fetchMyReservationList();
  }, [fetchMyReservationList]);

  const filterFields = useCallback(
    (reservation) => {
      const regExp = new RegExp(search, "ig");
      return (
        regExp.test(reservation.model) || regExp.test(reservation.location)
      );
    },
    [search]
  );

  const replaceField = useCallback(
    (field) =>
      field === 1
        ? { badge: "neutral", role: "User" }
        : { badge: "red", role: "Manager" },
    []
  );

  const filteredReservations = useMemo(
    () => reservations.filter((user) => filterFields(user)),
    [filterFields, reservations]
  );

  return {
    ...props,
    reservations: filteredReservations,
    search,
    loading,
    loadingDelete,
    setSearch,
    replaceField,
    filterFields,
    setEditUserAction,
    onDeleteConfirmed,
  };
});

export default container;
