import { useCallback, useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import {
  deleteUser,
  getListUser,
  register as createUser,
  updateUser,
} from "../../apis/user.api";
import { IQueryParams, IUserData } from "../../types/user.type";
import TablePagination from "../../components/TablePagination";
import ModalConfirm from "../../components/ModalConfirm";
import { toast } from "react-toastify";
import ModalCUUser from "../../components/ModalCUUser";
import { IRegisterData, IUpdateUserData } from "../../utils/schemas";

const Users = () => {
  const [params, setParams] = useState<IQueryParams>({ page: 1, limit: 2 });
  const [dataTable, setDataTable] = useState<IUserData[]>([]);
  const [total, setTotal] = useState(0);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalCUUser, setShowModalCUUser] = useState(false);
  const [userSelected, setUserSelected] = useState<IUserData | null>(null);
  const [loadingCUuser, setLoadingCUUser] = useState(false);
  const [typeModalCU, setTypeModalCU] = useState<"CREATE" | "UPDATE">("CREATE");

  const handleGetUsers = useCallback(async (params: IQueryParams) => {
    try {
      const res = await getListUser(params);
      if (res.data.code === 200) {
        const { total, users } = res.data.data;
        setDataTable(users);
        setTotal(total);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetUsers(params);
  }, [params, handleGetUsers]);

  const handleShowModalDelete = (user: IUserData) => {
    setShowModalDelete(true);
    setUserSelected(user);
  };

  const handleHideModalDelete = () => {
    setShowModalDelete(false);
    setTimeout(() => {
      setUserSelected(null);
    }, 500);
  };

  const handleDeleteUser = async () => {
    try {
      const res = await deleteUser({
        ids: userSelected?.id?.toString() as string,
      });
      const { code, message } = res.data;
      if (code === 200) {
        toast.success(message);
        const newPage =
          dataTable.length === 1 && params.page !== 1
            ? params.page - 1
            : params.page;
        setParams({ ...params, page: newPage });
      } else {
        toast.error(message);
      }
      handleHideModalDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModalCUUser = (
    type: "CREATE" | "UPDATE",
    user?: IUserData
  ) => {
    setTypeModalCU(type);
    setShowModalCUUser(true);
    user && setUserSelected(user);
  };

  const handleHideModalCUUser = () => {
    setShowModalCUUser(false);
    setTimeout(() => {
      setUserSelected(null);
    }, 500);
  };

  const handleCUUser = async (data: IRegisterData | IUpdateUserData) => {
    let isSuccess = false;
    try {
      setLoadingCUUser(true);
      const res =
        typeModalCU === "CREATE"
          ? await createUser(data as IRegisterData)
          : await updateUser(data);
      const { code, message } = res.data;
      if (code === 201 || code === 200) {
        handleGetUsers(params);
        isSuccess = true;
        setShowModalCUUser(false);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCUUser(false);
    }
    return isSuccess;
  };

  return (
    <Container>
      <Button
        className="my-3"
        onClick={() => {
          handleShowModalCUUser("CREATE");
        }}
      >
        Add user
      </Button>
      <Row className="w-100">
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>User name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Sex</th>
              <th>Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{+user.sex === 1 ? "Male" : "Female"}</td>
                <td>{user.Group?.name}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleShowModalCUUser("UPDATE", user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModalDelete(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination
          params={params}
          total={total}
          setParams={setParams}
          dataLength={dataTable.length}
        />
      </Row>
      <ModalConfirm
        handleClose={handleHideModalDelete}
        show={showModalDelete}
        title="Confirm delete"
        body={`Delete user ${userSelected?.userName}?`}
        handleConfirm={handleDeleteUser}
      />
      <ModalCUUser
        handleClose={handleHideModalCUUser}
        handleConfirm={handleCUUser}
        show={showModalCUUser}
        type={typeModalCU}
        isLoading={loadingCUuser}
        initData={userSelected}
      />
    </Container>
  );
};

export default Users;
