import { formatDate } from "@";
import { Button, Heading, Pane, Table, Spinner, TextInput } from "evergreen-ui";
import Confirm from "@components/Confirm";
import container from "./container";

const ReservationListPage = ({
  reservations,
  replaceField,
  search,
  setSearch,
  setEditUserAction,
  onDeleteConfirmed,
  loading,
  loadingDelete,
}) => {
  return (
    <Pane display="flex" flexDirection="column" flex={1}>
      <Pane>
        <Heading>My Reservations</Heading>
      </Pane>

      <Pane paddingY="1rem">
        <Table width="100%">
          <Table.Head>
            <Table.TextHeaderCell flex={0.2}>#</Table.TextHeaderCell>
            <Table.TextHeaderCell>Model</Table.TextHeaderCell>
            <Table.TextHeaderCell>Color</Table.TextHeaderCell>
            <Table.TextHeaderCell flex={0.5}>Location</Table.TextHeaderCell>
            <Table.TextHeaderCell>Reservation Date</Table.TextHeaderCell>
            <Table.SearchHeaderCell value={search} onChange={setSearch} />
          </Table.Head>
          <Table.Body height={450}>
            {reservations.map((product) => (
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
                <Table.TextCell flex={0.5}>{product.location}</Table.TextCell>
                <Table.TextCell>
                  {formatDate(product.startTime)} -{" "}
                  {formatDate(product.endTime)}
                </Table.TextCell>
                <Table.TextCell>
                  <Pane display="flex" flex={1} gap={"0.5rem"}>
                    <Confirm
                      confirmText="Are you sure you want to cancel this reservation ?"
                      onConfirm={onDeleteConfirmed}
                      item={product}
                      confirmLabel="Yes"
                    >
                      <Button
                        display="flex"
                        flex={1}
                        appearance="primary"
                        intent="danger"
                        isLoading={loadingDelete}
                      >
                        Cancel
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
            ) : !reservations?.length ? (
              <Table.Row
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Heading>No Reservation</Heading>
              </Table.Row>
            ) : null}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>
  );
};

export default container(ReservationListPage);
