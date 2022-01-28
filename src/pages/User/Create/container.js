import { hoc } from "@";
import { useState, useCallback } from "react";
import { toaster } from "evergreen-ui";
import { useFormik } from "formik";
import { createUser } from "@api";

const container = hoc((props) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: 1,
    },
    onSubmit: (values) => {
      fetchCreateUser(values);
    },
  });

  const fetchCreateUser = useCallback(
    async (values) => {
      toaster.closeAll();
      setLoading(true);
      const response = await createUser(values);
      setLoading(false);

      if (response?.success) formik.resetForm();
    },
    [formik]
  );

  return {
    ...props,
    formik,
    loading,
  };
});

export default container;
