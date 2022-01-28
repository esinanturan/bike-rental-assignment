import { Pane, Paragraph, Heading, TextInput, Button } from "evergreen-ui";
import ButtonLink from "@components/ButtonLink";
import container from "./container";

const RegisterPage = ({ formik, loading }) => {
  return (
    <Pane
      elevation={4}
      width="25rem"
      marginX="auto"
      transform="translateY(-10rem)"
      position="relative"
      top="50%"
    >
      <Pane padding="1rem" paddingBottom="2rem">
        <Heading size={800} paddingY="1rem">
          Register
        </Heading>
        <Heading size={500} textAlign="center" paddingBottom="0.5rem">
          Bike Rental
        </Heading>
        <Paragraph textAlign="center" paddingBottom="1rem">
          Please create an account by filling the form out.
        </Paragraph>
        <form onSubmit={formik.handleSubmit}>
          <Pane display="flex" flexDirection="column" paddingX="1rem">
            <Pane display="flex" justifyContent="center">
              <TextInput
                name="name"
                type="text"
                placeholder="Name"
                width={"100%"}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane display="flex" justifyContent="center" paddingY="1rem">
              <TextInput
                name="email"
                type="text"
                placeholder="Email"
                width={"100%"}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane display="flex" justifyContent="center" paddingBottom="1rem">
              <TextInput
                name="password"
                type="password"
                placeholder="Password"
                width={"100%"}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane display="flex" gap="1rem">
              <Button
                type="submit"
                display="flex"
                flex="1"
                appearance="default"
                isLoading={loading}
              >
                Register
              </Button>

              <ButtonLink
                to="/login"
                display="flex"
                flex="1"
                appearance="primary"
              >
                Login
              </ButtonLink>
            </Pane>
          </Pane>
        </form>
      </Pane>
    </Pane>
  );
};

export default container(RegisterPage);
