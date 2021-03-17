import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddSearch from './ForWorkpage/AddSearch';

function AddSearchModal(props) {



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new request
                    </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <AddSearch
          {...props}
        />

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSearchModal;