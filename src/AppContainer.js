import { hoc } from "@";
import { useSelector } from "react-redux";

const container = hoc((props) => {
  const LOGGED_IN = useSelector((state) => state.auth.LOGGED_IN);
  const auth = useSelector((state) => state.auth.auth);

  return {
    ...props,
    LOGGED_IN,
    auth,
  };
});

export default container;
