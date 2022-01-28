import React from "react";
import { Dialog } from "evergreen-ui";
import container from "./container";

const Confirm = ({
  isShown,
  setIsShown,
  children,
  confirmText,
  onConfirm,
  item,
  ...rest
}) => {
  const Button = () =>
    React.cloneElement(children, {
      onClick: () => setIsShown(true),
    });

  return (
    <>
      <Dialog
        isShown={isShown}
        title="Confirm"
        intent="danger"
        onCloseComplete={() => setIsShown(false)}
        onConfirm={() => {
          onConfirm(item);
          setIsShown(false);
        }}
        confirmLabel="Delete"
        {...rest}
      >
        {confirmText}
      </Dialog>
      <Button />
    </>
  );
};

export default container(Confirm);
