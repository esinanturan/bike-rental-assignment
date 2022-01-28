import { formatDate } from "@";
import { Heading, Pane, Table, Spinner, TextInput } from "evergreen-ui";
import container from "./container";

const ManageReservationList = ({
  reservations,
  search,
  setSearch,
  loading,
}) => {
  return (
    <Pane display="flex" flexDirection="column" flex={1}>
      <Pane>
        <Heading>Reservation List</Heading>
      </Pane>
      <Pane paddingTop="1rem">
        <Table width="100%">
          <Table.Head>
            <Table.TextHeaderCell flex={0.2}>#</Table.TextHeaderCell>
            <Table.TextHeaderCell flex={0.3}>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell flex={0.4}>Color</Table.TextHeaderCell>
            <Table.TextHeaderCell flex={0.4}>Location</Table.TextHeaderCell>
            <Table.TextHeaderCell>Email</Table.TextHeaderCell>
            <Table.TextHeaderCell>Scheduled Dates</Table.TextHeaderCell>
            <Table.SearchHeaderCell value={search} onChange={setSearch} />
          </Table.Head>
          <Table.Body height={450}>
            {reservations.map((reservation) => (
              <Table.Row key={reservation.id} isSelectable>
                <Table.TextCell flex={0.2}>{reservation.id}</Table.TextCell>
                <Table.TextCell flex={0.3}>{reservation.model}</Table.TextCell>
                <Table.TextCell flex={0.4}>
                  <TextInput
                    type="color"
                    disabled
                    width={"100px"}
                    value={reservation.color}
                  />
                </Table.TextCell>
                <Table.TextCell flex={0.4}>
                  {reservation.location}
                </Table.TextCell>
                <Table.TextCell>{reservation.email}</Table.TextCell>
                <Table.TextCell>
                  {formatDate(reservation.startTime)} -
                  {formatDate(reservation.endTime)}
                </Table.TextCell>
                <Table.Cell></Table.Cell>
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
                <Heading>No Reservations</Heading>
              </Table.Row>
            ) : null}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>
  );
};

export default container(ManageReservationList);
