import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import AddSource from './AddSource';
import Sources from './Sources'

function AddSourceModal(props) {


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title >
                    Add new source
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <AddSource
                    {...props}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddSourceModal;