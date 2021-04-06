import axios from 'axios';
import React, { useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { config } from '../../../Config';
import { keycloak } from '../../../index';

function Sources(props) {

    const [sources, setsources] = useState([]);
    const [show, setShow] = useState(false);
    const [currentid, setcurrentid] = useState(null);

    let roles = keycloak.tokenParsed.resource_access.ui.roles;

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setcurrentid(id);
    }
    const handleDelete = async () => {
        await axios.post(config.url + '/api/sources/push', {
            type: 'delete',
            id: currentid
        }).then(res => {
            alert('Successfully deleted!');
        });
    }


    axios.post(config.url + '/api/sources/get', {

    }).then(res => {
        setsources(res.data);
    });


    return (
        <div className="d-flex align-items-center">

            {sources.map(s => {
                if (roles.includes('UIadminROLE')) {
                    return (
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {s.id}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={props.crud('update')}>Update</Dropdown.Item>
                                <Dropdown.Item onClick={handleShow(s.id)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    );
                } else {
                    return (
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {s.id}
                            </Dropdown.Toggle>
                        </Dropdown>
                    );
                }
            })}

            <Button
                variant='success'
                className='border border-darken-4'
                onClick={() => props.crud('add')}
            >
                + Add Source
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete source?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure to delete this source? Current credentials will be forgotten
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Sources;