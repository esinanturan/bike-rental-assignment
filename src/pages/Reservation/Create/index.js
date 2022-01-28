import { formatDate } from "@";
import { Fragment } from "react";
import { Pane, Heading, Button, Paragraph } from "evergreen-ui";
import dayjs from "dayjs";
import RangePicker from "@components/RangePicker";
import Bike from "@components/Svgs/Bike";
import Confirm from "@components/Confirm";
import HiddenSubmit from "@components/HiddenSubmit";
import { Rating } from "@mui/material";
import container from "./container";
import "react-datepicker/dist/react-datepicker.css";

const CreateReservationPage = ({ formik, product, $submit, onConfirm }) => {
  return (
    <Pane flex={1} display="flex" flexDirection="column">
      <Pane>
        <Heading>Create Reservation</Heading>
      </Pane>
      <Pane
        marginY="2rem"
        paddingY="2rem"
        flex={1}
        display="flex"
        gap="3rem"
        justifyContent="center"
        background="tint2"
      >
        <Pane key={product?.id} display="flex" flexDirection="column" flex={0}>
          <Pane textAlign="center">
            <Heading>{product?.model}</Heading>
          </Pane>
          <Pane textAlign="center" paddingY="1rem">
            <Bike color={product?.color} />
          </Pane>
          <Pane textAlign="center" paddingBottom="1rem">
            <Pane paddingBottom="0.5rem">
              <Heading size={200}>Rating</Heading>
            </Pane>
            <Pane>
              <Rating name="rating" value={+product?.rating} disabled />
            </Pane>
          </Pane>
          <Pane textAlign="center">
            <Pane paddingBottom="0.5rem">
              <Heading size={200}>Location</Heading>
            </Pane>
            <Heading>{product?.location}</Heading>
          </Pane>
          {product?.isAvailable ? (
            <Fragment>
              <Pane textAlign="center" paddingY="1rem">
                <Pane paddingBottom="0.5rem">
                  <Heading size={200}>Available Date Range</Heading>
                </Pane>
                <Heading>{formatDate(product?.availabilityStartDate)}</Heading>
                <Heading>{formatDate(product?.availabilityEndDate)}</Heading>
              </Pane>
            </Fragment>
          ) : (
            <Pane textAlign="center" paddingY="1rem">
              <Heading>Not Available</Heading>
            </Pane>
          )}
        </Pane>
        <Pane>
          <form onSubmit={formik.handleSubmit}>
            <Pane paddingY="1rem">
              <Heading paddingBottom="0.5rem">Reservation Pick</Heading>
              <Paragraph>Please pick a range of available dates.</Paragraph>
            </Pane>
            {product ? (
              <RangePicker
                name="pickedRange"
                inline
                selectsRange
                setFieldValue={formik.setFieldValue}
                includeDateIntervals={[
                  {
                    start: dayjs().startOf().toDate(),
                    end: new Date(product.availabilityEndDate),
                  },
                ]}
              />
            ) : null}
            <Pane paddingY="1rem">
              <Confirm
                confirmLabel="Confirm"
                confirmText={`Would you like to confirm the reservation ?`}
                onConfirm={onConfirm}
              >
                <Button
                  width="100%"
                  disabled={!formik.values.pickedRange}
                  appearance="primary"
                  intent="danger"
                >
                  Save Reservation
                </Button>
              </Confirm>
            </Pane>
            <HiddenSubmit ref={$submit} />
          </form>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default container(CreateReservationPage);
