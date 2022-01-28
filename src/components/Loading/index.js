import { Pane, Heading } from "evergreen-ui";
import { Spinner } from "evergreen-ui";

const Loading = () => {
  return (
    <Pane
      display="flex"
      flex={1}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
    >
      <Heading>Loading</Heading>
      <Spinner />
    </Pane>
  );
};

export default Loading;
