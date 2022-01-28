import { hoc } from "@";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getProductById } from "@api";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { createReservation } from "@api";

const container = hoc((props) => {
  const params = useParams();

  const $submit = useRef();

  const [currentProduct, setCurrentProduct] = useState(
    useSelector((state) => state.reservation.currentReservationProduct)
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: (values) => {
      fetchCreateReservation(values);
    },
  });

  const fetchCreateReservation = useCallback(
    async (values) => {
      const response = await createReservation({
        ...values,
        productId: currentProduct?.id,
      });
      if (response?.success) formik.resetForm();
    },
    [currentProduct, formik]
  );

  const onConfirm = useCallback(() => {
    $submit.current.click();
  }, []);

  const fetchProductById = useCallback(async () => {
    if (currentProduct) return;
    const response = await getProductById(params.id);
    if (response?.success) setCurrentProduct(response.data);
  }, [params.id, currentProduct]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);

  return {
    ...props,
    product: currentProduct,
    formik,
    $submit,
    onConfirm,
  };
});

export default container;
