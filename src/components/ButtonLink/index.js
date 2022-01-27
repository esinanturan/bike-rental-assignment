import { Link } from "react-router-dom";
import { Button } from "evergreen-ui";
import styled from "styled-components";

const ButtonLink = styled(Link)`
  display: flex;
  flex: 1;
  ${(p) => (p.alignSelf ? `align-self:${p.alignSelf};` : null)}
`;

const LinkComponent = ({ children, ...props }) => {
  return (
    <ButtonLink {...props}>
      <Button {...props}>{children}</Button>
    </ButtonLink>
  );
};

export default LinkComponent;
