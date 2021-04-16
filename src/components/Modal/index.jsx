import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalComponent({
  show, toggle, children, title, onSubmit,
}) {
  return (

    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

  );
}
