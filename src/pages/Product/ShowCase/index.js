import { Fragment } from "react";
import {
  Heading,
  Pane,
  SelectMenu,
  Button,
  FilterListIcon,
  Option,
  Spinner,
} from "evergreen-ui";
import Rating from "@mui/material/Rating";
import Bike from "@components/Svgs/Bike";
import { formatDate } from "@";
import ButtonLink from "@components/ButtonLink";
import container from "./container";

const ShowCasePage = ({
  products,
  selectedFilters,
  onFilterSelected,
  onFilterDeselected,
  mappedFilters,
  renderCustomItem,
  onReservationAction,
  onRateAction,
  getRating,
  loading,
}) => {
  return (
    <Pane display="flex" flex={1} flexDirection="column">
      <Heading>Products</Heading>
      <Pane
        display="flex"
        justifyContent="flex-end"
        flexDirection="column"
        alignSelf="flex-end"
      >
        <Pane>
          <SelectMenu
            isMultiSelect
            title="Filter Products"
            options={mappedFilters}
            selected={selectedFilters}
            onSelect={onFilterSelected}
            onDeselect={onFilterDeselected}
            itemRenderer={(props) => (
              <Option {...props}>{renderCustomItem(props.item)}</Option>
            )}
          >
            <Button
              appearance="primary"
              intent={selectedFilters?.length ? "danger" : "none"}
            >
              <FilterListIcon marginRight="1rem" />
              {selectedFilters?.length
                ? `${selectedFilters?.length} Selected`
                : "Filter By"}
            </Button>
          </SelectMenu>
        </Pane>
      </Pane>
      <Pane
        display="flex"
        flex={1}
        background="tint2"
        marginY="1rem"
        padding="1rem"
        flexWrap="wrap"
        justifyContent="center"
        gap={"1rem"}
      >
        {products.map((product) => (
          <Pane key={product.id} display="flex" flexDirection="column" flex={0}>
            <Pane textAlign="center">
              <Heading>{product.model}</Heading>
            </Pane>
            <Pane textAlign="center" paddingY="1rem">
              <Bike color={product.color} />
            </Pane>
            <Pane textAlign="center" paddingBottom="1rem">
              <Pane paddingBottom="0.5rem">
                <Heading size={200}>Rating</Heading>
              </Pane>
              <Pane>
                <Rating
                  name="rating"
                  onChange={(value) => onRateAction(product, value)}
                  value={getRating(product.id) || +product.rating}
                />
              </Pane>
            </Pane>
            <Pane textAlign="center">
              <Pane paddingBottom="0.5rem">
                <Heading size={200}>Location</Heading>
              </Pane>
              <Heading>{product.location}</Heading>
            </Pane>
            {product.isAvailable ? (
              <Fragment>
                <Pane textAlign="center" paddingY="1rem">
                  <Pane paddingBottom="0.5rem">
                    <Heading size={200}>Available Date Range</Heading>
                  </Pane>
                  <Heading>{formatDate(product.availabilityStartDate)}</Heading>
                  <Heading>{formatDate(product.availabilityEndDate)}</Heading>
                </Pane>
                <Pane paddingY="1rem" display="flex" justifyContent="center">
                  <ButtonLink
                    appearance="default"
                    intent="success"
                    to={`reservation/create/${product.id}`}
                    width="100%"
                    onClick={() => onReservationAction(product)}
                  >
                    Reservation
                  </ButtonLink>
                </Pane>
              </Fragment>
            ) : (
              <Pane textAlign="center" paddingY="1rem">
                <Heading>Not Available</Heading>
              </Pane>
            )}
          </Pane>
        ))}

        {loading ? (
          <Pane>
            <Spinner />
          </Pane>
        ) : !products?.length ? (
          <Pane>
            <Heading>No Product</Heading>
          </Pane>
        ) : null}
      </Pane>
    </Pane>
  );
};

export default container(ShowCasePage);
