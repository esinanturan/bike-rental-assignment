import { hoc } from "@";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navigation = [
  {
    name: "Products",
    children: [
      { label: "List", value: "/product/all" },
      { label: "Reservation", value: "/reservation/me" },
    ],
  },
  {
    name: "Management",
    children: [
      { label: "Users", value: "/user/list" },
      { label: "Products", value: "/product/list" },
      { label: "Reservations", value: "/reservation/list" },
    ],
  },
];

const container = hoc((props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentNav, setCurrentNav] = useState("/product/all");

  const onNavigationPressed = useCallback(
    (value) => {
      setCurrentNav(value);
      navigate(value);
    },
    [navigate]
  );

  const setPath = useCallback(() => {
    setCurrentNav(location.pathname);
  }, [location]);

  useEffect(() => {
    setPath();
  }, [setPath]);

  return {
    ...props,
    navigation,
    currentNav,
    onNavigationPressed,
  };
});

export default container;
