import { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

interface IProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  body: string | ReactNode;
  confirmBtnName?: string;
}

const ModalConfirm = (props: IProps) => {
  const { show, handleClose, handleConfirm, title, body, confirmBtnName } =
    props;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {confirmBtnName || "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
