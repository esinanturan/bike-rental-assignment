import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "@components/NotFound";
import routes from "./routes";

const SignOutLayout = React.lazy(() => import("@layout/SignOutLayout"));
const MainLayout = React.lazy(() => import("@layout/MainLayout"));

function App() {
  return (
    <Router>
      <React.Suspense fallback={null}>
        <Routes>
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
          </Route>
          <Route element={<MainLayout />}>
            {routes.signIn.map((route) => (
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
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
