import { forwardRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  display: none;
`;

const HiddenSubmit = forwardRef((props, ref) => {
  return <StyledInput type="submit" ref={ref} {...props} />;
});

export default HiddenSubmit;
