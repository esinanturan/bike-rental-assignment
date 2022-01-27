import { Heading, Pane, TextInput, Button, Select } from "evergreen-ui";
import RangePicker from "@components/RangePicker";
import Rating from "@mui/material/Rating";
import container from "./container";
import "react-datepicker/dist/react-datepicker.css";

const Edit = ({ formik }) => {
  return (
    <Pane display="flex" flexDirection="column" flex={1}>
      <Pane>
        <Heading>Edit Product</Heading>
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
                value={formik.values.model || ""}
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
                value={formik.values.color || ""}
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
                value={formik.values.location || ""}
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
                value={parseInt(formik.values.rating) || 1}
                onChange={formik.handleChange}
              />
            </Pane>
            <Pane paddingBottom="1rem">
              <Pane paddingBottom="0.5rem">
                <Heading size={200}>Availablity:</Heading>
              </Pane>
              <Select
                width="100%"
                value={formik.values.isAvailable}
                name="isAvailable"
                onChange={formik.handleChange}
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </Select>
            </Pane>
            {formik.values.isAvailable?.toString() === "true" ? (
              <Pane>
                <Pane paddingBottom="0.5rem">
                  <Heading size={200}>Available Date Range:</Heading>
                </Pane>
                <Pane>
                  <RangePicker
                    name="availableRange"
                    setFieldValue={formik.setFieldValue}
                    selectsRange
                    defaultValue={formik.values.availableRange}
                  />
                </Pane>
              </Pane>
            ) : null}
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

export default container(Edit);
