import { Heading, Pane, TextInput, Button, Select } from "evergreen-ui";
import container from "./container";

const Create = ({ formik }) => {
  return (
    <Pane display="flex" flexDirection="column" flex={1}>
      <Pane>
        <Heading>Create User</Heading>
      </Pane>
      <Pane
        marginY="1rem"
        padding={16}
        borderRadius={3}
        background="tint2"
        display="flex"
        justifyContent="center"
      >
        <Pane display="flex" flexDirection="column" width="50%">
          <form onSubmit={formik.handleSubmit}>
            <Pane>
              <TextInput
                name="name"
                placeholder="Name"
                width={"100%"}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane paddingY="1rem">
              <TextInput
                name="email"
                placeholder="Email"
                width={"100%"}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane>
              <TextInput
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                width={"100%"}
              />
            </Pane>
            <Pane paddingY="1rem">
              <Select
                width="100%"
                value={formik.values.role}
                name="role"
                onChange={formik.handleChange}
              >
                <option value="1">User</option>
                <option value="2">Manager</option>
              </Select>
            </Pane>
            <Pane>
              <Button type="submit" appearance="primary" width="10rem">
                Save
              </Button>
            </Pane>
          </form>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default container(Create);
