import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { unsetAuth } from "@store/slices/auth";

const LogoutPage = () => {
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(unsetAuth());
  }, [dispatch]);

  useEffect(() => {
    logOut();
  }, [logOut]);
  return null;
};

export default LogoutPage;
