import { Heading, Pane, TextInput, Button, Select } from "evergreen-ui";
import Rating from "@mui/material/Rating";
import container from "./container";

const Create = ({ formik }) => {
  return (
    <Pane display="flex" flexDirection="column" flex={1}>
      <Pane>
        <Heading>Create Product</Heading>
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
              <Pane paddingBottom="0.5rem">
                <Heading size={200}>Model:</Heading>
              </Pane>
              <TextInput
                name="model"
                placeholder="Model"
                width={"100%"}
                value={formik.values.model}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane paddingY="1rem">
              <Pane paddingBottom="0.5rem">
                <Heading size={200}>Color:</Heading>
              </Pane>
              <TextInput
                name="color"
                type="color"
                placeholder="Color"
                width={"10%"}
                value={formik.values.color}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane>
              <Pane paddingBottom="0.5rem">
                <Heading size={200}>Location:</Heading>
              </Pane>
              <TextInput
                type="text"
                name="location"
                placeholder="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                width={"100%"}
              />
            </Pane>
            <Pane paddingY="1rem">
              <Pane paddingBottom="0.5rem">
                <Heading size={200}>Rating:</Heading>
              </Pane>

              <Rating
                name="rating"
                value={parseInt(formik.values.rating)}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane>
              <Pane paddingBottom="0.5rem">
                <Heading size={200}>Availablity:</Heading>
              </Pane>
              <Select
                width="100%"
                value={formik.values.isAvailable}
                name="role"
                onChange={formik.handleChange}
              >
                <option value="1">Available</option>
                <option value="2">Not Available</option>
              </Select>
            </Pane>
            <Pane paddingY="1rem">
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
