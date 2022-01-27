import { Pane } from "evergreen-ui";
import { Outlet } from "react-router-dom";

const SignOutLayout = () => {
  return (
    <Pane height="100vh">
      <Outlet />
    </Pane>
  );
};

export default SignOutLayout;
