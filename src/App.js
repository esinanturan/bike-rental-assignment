import React from "react";
import { Spinner } from "evergreen-ui";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "@components/NotFound";
import Loading from "@components/Loading";
import routes from "./routes";
import container from "./AppContainer";

const SignOutLayout = React.lazy(() => import("@layout/SignOutLayout"));
const MainLayout = React.lazy(() => import("@layout/MainLayout"));

function App({ LOGGED_IN, auth }) {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          {!LOGGED_IN ? (
            <Route element={<SignOutLayout />}>
              {routes.signOut.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                >
                  {route.children}
                </Route>
              ))}
              <Route path="*" element={<Navigate to="/login" />}></Route>
            </Route>
          ) : (
            <Route element={<MainLayout />}>
              {routes.signIn
                .filter((item) =>
                  item.managerOnly ? (auth.role === 2 ? true : false) : true
                )
                .map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                  >
                    {route.children}
                  </Route>
                ))}
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          )}
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default container(App);
