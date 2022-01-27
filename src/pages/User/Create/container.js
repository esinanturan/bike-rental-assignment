import { hoc } from "@";
import { useCallback } from "react";
import { toaster } from "evergreen-ui";
import { useFormik } from "formik";
import { createUser } from "@api";

const container = hoc((props) => {
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

      const response = await createUser(values);

      if (response?.success) formik.resetForm();
    },
    [formik]
  );

  return {
    ...props,
    formik,
  };
});

export default container;
