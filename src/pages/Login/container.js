import { hoc } from "@";
import { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAccount } from "@api";
import { setAuth } from "@store/slices/auth";

const container = hoc((props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      fetchLoginAccount(values);
    },
  });

  const fetchLoginAccount = useCallback(
    async (values) => {
      const response = await loginAccount(values);
      if (response?.success) {
        dispatch(setAuth({ auth: response.data, token: response.data.token }));
        navigate("/");
      }
    },
    [dispatch, navigate]
  );

  return {
    ...props,
    formik,
  };
});

export default container;
