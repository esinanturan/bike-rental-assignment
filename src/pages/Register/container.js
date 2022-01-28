import { hoc } from "@";
import { useState } from "react";
import { useFormik } from "formik";
import { useCallback } from "react";
import { registerAccount } from "@api";

const container = hoc((props) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      fetchRegisterAccount(values);
    },
  });

  const fetchRegisterAccount = useCallback(
    async (values) => {
      setLoading(true);
      const response = await registerAccount(values);
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
