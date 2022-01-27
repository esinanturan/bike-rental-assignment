import {
  Button,
  Heading,
  Pane,
  Table,
  Badge,
  TextInput,
  Spinner,
} from "evergreen-ui";
import Rating from "@mui/material/Rating";
import ButtonLink from "@components/ButtonLink";
import Confirm from "@components/Confirm";
import container from "./container";

const ProductListPage = ({
  products,
  replaceField,
  search,
  setSearch,
  setEditProductAction,
  onDeleteConfirmed,
  loading,
  loadingDelete,
}) => {
  return (
    <Pane display="flex" flexDirection="column" flex={1}>
      <Pane>
        <Heading>Product List</Heading>
      </Pane>
      <Pane
        paddingY="1rem"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <ButtonLink
          appearance="primary"
          to="/product/create"
          alignSelf="flex-end"
        >
          Create Product
        </ButtonLink>
      </Pane>
      <Pane>
        <Table width="100%">
          <Table.Head>
            <Table.TextHeaderCell flex={0.2}>#</Table.TextHeaderCell>
            <Table.TextHeaderCell>Model</Table.TextHeaderCell>
            <Table.TextHeaderCell>Color</Table.TextHeaderCell>
            <Table.TextHeaderCell>Location</Table.TextHeaderCell>
            <Table.TextHeaderCell>Rating</Table.TextHeaderCell>
            <Table.TextHeaderCell>Availablity</Table.TextHeaderCell>
            <Table.SearchHeaderCell value={search} onChange={setSearch} />
          </Table.Head>
          <Table.Body height={450}>
            {products.map((product) => (
              <Table.Row key={product.id} isSelectable>
                <Table.TextCell flex={0.2}>{product.id}</Table.TextCell>
                <Table.TextCell>{product.model}</Table.TextCell>
                <Table.TextCell>
                  <TextInput
                    name="color"
                    type="color"
                    width={"100px"}
                    value={product.color}
                    disabled
                  />
                </Table.TextCell>
                <Table.TextCell>{product.location}</Table.TextCell>
                <Table.TextCell>
                  <Rating
                    name="rating"
                    value={parseInt(product.rating)}
                    disabled
                  />
                </Table.TextCell>
                <Table.TextCell>
                  <Badge color={replaceField(product.isAvailable).badge}>
                    {replaceField(product.isAvailable).availabilty}
                  </Badge>
                </Table.TextCell>
                <Table.TextCell>
                  <Pane display="flex" flex={1} gap={"0.5rem"}>
                    <ButtonLink
                      to={`/product/edit/${product.id}`}
                      display="flex"
                      flex={1}
                      appearance="primary"
                      onClick={() => setEditProductAction(product)}
                    >
                      Edit
                    </ButtonLink>
                    <Confirm
                      confirmText="Are you sure you want to delete this item?"
                      onDelete={onDeleteConfirmed}
                      item={product}
                    >
                      <Button
                        display="flex"
                        flex={1}
                        appearance="primary"
                        intent="danger"
                        isLoading={loadingDelete}
                      >
                        Delete
                      </Button>
                    </Confirm>
                  </Pane>
                </Table.TextCell>
              </Table.Row>
            ))}
            {loading ? (
              <Table.Row
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner />
              </Table.Row>
            ) : !products?.length ? (
              <Table.Row
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Heading>No Item</Heading>
              </Table.Row>
            ) : null}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>
  );
};

export default container(ProductListPage);
