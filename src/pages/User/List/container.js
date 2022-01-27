import { hoc } from "@";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserList, deleteUserById } from "@api";
import { setEditUser } from "@store/slices/user";

const container = hoc((props) => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const setEditUserAction = useCallback(
    (user) => {
      dispatch(setEditUser(user));
    },
    [dispatch]
  );

  const fetchUserList = useCallback(async () => {
    setLoading(true);
    const response = await getUserList();
    setLoading(false);
    if (response.success) {
      setUsers(response.data);
    }
  }, []);

  const onDeleteConfirmed = useCallback(async (user) => {
    setLoadingDelete(true);
    const response = await deleteUserById(user.id);
    setLoadingDelete(false);

    if (response.success)
      setUsers((state) => state.filter((item) => item.id !== user.id));
  }, []);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  const filterFields = useCallback(
    (user) => {
      const regExp = new RegExp(search, "ig");
      return (
        regExp.test(user.name) ||
        regExp.test(user.email) ||
        regExp.test(user.role === 1 ? "user" : "manager")
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

  const filteredUsers = useMemo(
    () => users.filter((user) => filterFields(user)),
    [filterFields, users]
  );

  return {
    ...props,
    users: filteredUsers,
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
