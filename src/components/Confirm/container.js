import { hoc } from "@";
import { useState } from "react";

const container = hoc((props) => {
  const [isShown, setIsShown] = useState(false);

  return {
    ...props,
    isShown,
    setIsShown,
  };
});

export default container;
