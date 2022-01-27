import { Button, Heading, Pane, Table, Badge, Spinner } from "evergreen-ui";
import ButtonLink from "@components/ButtonLink";
import Confirm from "@components/Confirm";
import container from "./container";

const UserListPage = ({
  users,
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
        <Heading>Users List</Heading>
      </Pane>
      <Pane
        paddingY="1rem"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <ButtonLink appearance="primary" to="/user/create" alignSelf="flex-end">
          Create User
        </ButtonLink>
      </Pane>
      <Pane>
        <Table width="100%">
          <Table.Head>
            <Table.TextHeaderCell flex={0.2}>#</Table.TextHeaderCell>
            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Email</Table.TextHeaderCell>
            <Table.TextHeaderCell>Role</Table.TextHeaderCell>
            <Table.SearchHeaderCell value={search} onChange={setSearch} />
          </Table.Head>
          <Table.Body height={450}>
            {users.map((user) => (
              <Table.Row key={user.id} isSelectable>
                <Table.TextCell flex={0.2}>{user.id}</Table.TextCell>
                <Table.TextCell>{user.name}</Table.TextCell>
                <Table.TextCell>{user.email}</Table.TextCell>
                <Table.TextCell>
                  <Badge color={replaceField(user.role).badge}>
                    {replaceField(user.role).role}
                  </Badge>
                </Table.TextCell>
                <Table.TextCell>
                  <Pane display="flex" flex={1} gap={"0.5rem"}>
                    <ButtonLink
                      to={`/user/edit/${user.id}`}
                      display="flex"
                      flex={1}
                      appearance="primary"
                      onClick={() => setEditUserAction(user)}
                    >
                      Edit
                    </ButtonLink>
                    <Confirm
                      confirmText="Are you sure you want to delete this item?"
                      onDelete={onDeleteConfirmed}
                      item={user}
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
            ) : !users?.length ? (
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

export default container(UserListPage);
