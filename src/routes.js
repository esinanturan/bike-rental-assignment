import React from "react";

const LoginPage = React.lazy(() => import("@pages/Login"));
const RegisterPage = React.lazy(() => import("@pages/Register"));

const MainPage = React.lazy(() => import("@pages/Main"));

const ProductListPage = React.lazy(() => import("@pages/Product/List"));
const CreateProductPage = React.lazy(() => import("@pages/Product/Create"));
const EditProductPage = React.lazy(() => import("@pages/Product/Edit"));

const UserListPage = React.lazy(() => import("@pages/User/List"));
const CreateUserPage = React.lazy(() => import("@pages/User/Create"));
const EditUserPage = React.lazy(() => import("@pages/User/Edit"));

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
      element: MainPage,
    },
    {
      path: "/product/list",
      element: ProductListPage,
    },
    {
      path: "/product/create",
      element: CreateProductPage,
    },
    {
      path: "/product/edit/:id",
      element: EditProductPage,
    },
    {
      path: "/user/list",
      element: UserListPage,
    },
    {
      path: "/user/create",
      element: CreateUserPage,
    },
    {
      path: "/user/edit/:id",
      element: EditUserPage,
    },
  ],
};

export default routes;
