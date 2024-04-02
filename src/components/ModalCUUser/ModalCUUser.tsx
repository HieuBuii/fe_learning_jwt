import { Button, Modal, Spinner } from "react-bootstrap";
import FormCUUser from "../FormCUUser";
import { IRegisterData, IUpdateUserData } from "../../utils/schemas";
import { IUserData } from "../../types/user.type";

interface IProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (data: IRegisterData | IUpdateUserData) => Promise<boolean>;
  type: "CREATE" | "UPDATE";
  isLoading: boolean;
  initData: IUserData | null;
}
const ModalCUUser = (props: IProps) => {
  const { show, handleClose, handleConfirm, type, isLoading, initData } = props;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "CREATE" ? "Create user" : "Update user"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormCUUser
          formId="formCUUser"
          onSubmitForm={handleConfirm}
          initData={initData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          form="formCUUser"
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : type === "CREATE" ? (
            "Create"
          ) : (
            "Update"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCUUser;
