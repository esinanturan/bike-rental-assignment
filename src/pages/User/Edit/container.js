import { hoc } from "@";
import { useState, useCallback, useEffect } from "react";
import { toaster } from "evergreen-ui";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editUser, getUserById } from "@api";

const container = hoc((props) => {
  const params = useParams();

  const [currentUser, setCurrentUser] = useState(
    useSelector((state) => state.user.currentEditUser)
  );
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...currentUser,
    },
    onSubmit: (values) => {
      fetchEditUser(values);
    },
  });

  const fetchEditUser = useCallback(
    async (values) => {
      toaster.closeAll();
      setLoading(true);
      await editUser(values, params.id);
      setLoading(false);
    },
    [params.id]
  );

  const fetchCurrentUser = useCallback(async () => {
    if (currentUser) return;
    const response = await getUserById(params.id);
    if (response.data) setCurrentUser(response.data);
  }, [params.id, currentUser]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return {
    ...props,
    formik,
    loading,
  };
});

export default container;
