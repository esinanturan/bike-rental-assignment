import React from "react";

const LoginPage = React.lazy(() => import("@pages/Login"));
const RegisterPage = React.lazy(() => import("@pages/Register"));

const ProductListPage = React.lazy(() => import("@pages/Product/List"));
const CreateProductPage = React.lazy(() => import("@pages/Product/Create"));
const EditProductPage = React.lazy(() => import("@pages/Product/Edit"));

const ShowCasePage = React.lazy(() => import("@pages/Product/ShowCase"));

const CreateReservationPage = React.lazy(() =>
  import("@pages/Reservation/Create")
);
const ReservationListPage = React.lazy(() => import("@pages/Reservation/List"));

const UserListPage = React.lazy(() => import("@pages/User/List"));
const CreateUserPage = React.lazy(() => import("@pages/User/Create"));
const EditUserPage = React.lazy(() => import("@pages/User/Edit"));

const LogoutPage = React.lazy(() => import("@pages/Logout"));

const routes = {
  signOut: [
    {
      path: "/login",
      element: LoginPage,
    },
    {
      path: "/register",
      element: RegisterPage,
    },
  ],
  signIn: [
    {
      path: "/",
      element: ShowCasePage,
    },
    {
      path: "/product/list",
      element: ProductListPage,
    },
    {
      path: "/product/create",
      element: CreateProductPage,
      managerOnly: true,
    },
    {
      path: "/product/edit/:id",
      element: EditProductPage,
      managerOnly: true,
    },
    {
      path: "/reservation/create/:id",
      element: CreateReservationPage,
    },
    {
      path: "/reservation/me",
      element: ReservationListPage,
    },
    {
      path: "/user/list",
      element: UserListPage,
      managerOnly: true,
    },
    {
      path: "/user/create",
      element: CreateUserPage,
      managerOnly: true,
    },
    {
      path: "/user/edit/:id",
      element: EditUserPage,
      managerOnly: true,
    },
    {
      path: "/logout",
      element: LogoutPage,
    },
  ],
};

export default routes;
