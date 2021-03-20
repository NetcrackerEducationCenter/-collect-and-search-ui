import React from 'react';
import { Modal } from 'react-bootstrap';

import StatusTable from './StatusTable';

function ModalRequests(props) {


    return (
        <Modal
            {...props}

        >
            <Modal.Header>
                <Modal.Title>
                    Request statuses
                    </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <StatusTable {...props} />
            </Modal.Body>
        </Modal>
    );
}

export default ModalRequests;