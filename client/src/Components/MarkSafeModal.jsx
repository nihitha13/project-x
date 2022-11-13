import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { SendMarkSafe } from "../Services/SendMarkSafe";

export default function MarkSafeModal(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedOption, setSelectedOption] = useState("");

  const handleMarkSafe = async (e) => {
    let resp = await SendMarkSafe(
      props.incident_id,
      "abc@vt.edu",
      selectedOption
    );
    props.setSos();
    handleClose();
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mark yourself as SAFE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option>Open this select menu</option>
            <option value="Assault">Assault</option>
            <option value="Burglary">Burglary</option>
            <option value="Homicide">Homicide</option>
            <option value="Weapons">Weapons</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMarkSafe}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
