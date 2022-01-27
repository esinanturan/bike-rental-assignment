import { hoc } from "@";
import { useState, useCallback, useEffect } from "react";
import { toaster } from "evergreen-ui";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editProduct, getProductById } from "@api";

const container = hoc((props) => {
  const params = useParams();

  const [currentProduct, setCurrentProduct] = useState(
    useSelector((state) => state.product.currentEditProduct)
  );
  const [disabled, setDisabled] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...currentProduct,
    },
    onSubmit: (values) => {
      fetchEditProduct(values);
    },
  });

  const fetchEditProduct = useCallback(
    async (values) => {
      toaster.closeAll();
      setDisabled(true);
      await editProduct(values, params.id);
      setDisabled(false);
    },
    [params.id]
  );

  const fetchCurrentProduct = useCallback(async () => {
    if (currentProduct) return;
    const response = await getProductById(params.id);
    if (response.data) setCurrentProduct(response.data);
  }, [params.id, currentProduct]);

  useEffect(() => {
    fetchCurrentProduct();
  }, [fetchCurrentProduct]);

  return {
    ...props,
    formik,
    disabled,
  };
});

export default container;
