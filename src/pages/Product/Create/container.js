import { hoc } from "@";
import { useCallback } from "react";
import { toaster } from "evergreen-ui";
import { useFormik } from "formik";
import { createProduct } from "@api";

const container = hoc((props) => {
  const formik = useFormik({
    initialValues: {
      model: "",
      location: "",
      color: "",
      isAvailable: 1,
      rating: 0,
    },
    onSubmit: (values) => {
      fetchCreateProduct(values);
    },
  });

  const fetchCreateProduct = useCallback(
    async (values) => {
      toaster.closeAll();

      const response = await createProduct(values);

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
