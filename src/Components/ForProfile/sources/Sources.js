import axios from 'axios';
import React, { Component, useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { config } from '../../../Config';
import { keycloak } from '../../../index';
import { sources } from '../../Header';

// function Sources(props) {

//     // const [sources, setsources] = useState([]);
//     const [show, setShow] = useState(false);
//     const [currentid, setcurrentid] = useState(null);

//     let roles = keycloak.tokenParsed.resource_access.ui.roles;

//     const handleClose = () => setShow(false);
//     const handleShow = (id) => {
//         setShow(true);
//         setcurrentid(id);
//     }
//     const handleDelete = async () => {
//         await axios.post(config.url + '/api/sources/push', {
//             type: 'delete',
//             id: currentid
//         }).then(res => {
//             alert('Successfully deleted!');
//         });
//     }

//     console.log(roles.includes('UIadminROLE'));
//     if (Array.isArray(sources) && sources.length) {
//         return (
//             <div className="d-flex align-items-center">

//                 {sources.map(s => {
//                     if (roles.includes('UIadminROLE')) {
//                         return (
//                             <Dropdown.Menu >
//                                 <Dropdown.Toggle variant="success" id="dropdown-basic">
//                                     {s.credentials.id}
//                                 </Dropdown.Toggle>

//                                 <Dropdown.Menu>
//                                     <Dropdown.Item onClick={props.crud('update')}>Update</Dropdown.Item>
//                                     <Dropdown.Item onClick={handleShow(s.credentials.id)}>Delete</Dropdown.Item>
//                                 </Dropdown.Menu>
//                             </Dropdown.Menu>
//                         );
//                     } else {
//                         return (
//                             <Dropdown>
//                                 <Dropdown.Toggle variant="success" id="dropdown-basic">
//                                     {s.credentials.id}
//                                 </Dropdown.Toggle>
//                             </Dropdown>
//                         );
//                     }
//                 })
//                 }

//                 <Button
//                     variant='success'
//                     className='border border-darken-4'
//                     onClick={() => props.crud('add')}
//                 >
//                     + Add Source
//                 </Button>

//                 <Modal.Body
//                     show={show}
//                     onHide={handleClose}
//                     backdrop="static"
//                     keyboard={false}
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Delete source?</Modal.Title>
//                     </Modal.Header>

//                     <Modal.Body>
//                         Are you sure to delete this source? Current credentials will be forgotten
//                     </Modal.Body>

//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>
//                             Cancle
//                         </Button>
//                         <Button variant="primary" onClick={handleDelete}>Yes</Button>
//                     </Modal.Footer>
//                 </Modal.Body>
//             </div>
//         );
//     } else return (
//         <Button
//             variant='success'
//             className='border border-darken-4'
//             onClick={() => props.crud('add')}
//         >
//             + Add Source
//         </Button>
//     );

// }

class Sources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            currentId: null,
            roles: keycloak.tokenParsed.resource_access.ui.roles
        }
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = (id) => {
        this.setState({ show: true });
        this.setState({ currentId: id });
    }

    handleDelete = async () => {
        await axios.post(config.url + '/api/sources/push', {
            type: 'delete',
            id: this.state.currentid
        }).then(res => {
            alert('Successfully deleted!');
        });
    }

    render() {
        if (Array.isArray(sources) && sources.length) {
            return (
                <div className="d-flex align-items-center">

                    {sources.map(s => {
                        if (this.state.roles.includes('UIadminROLE')) {
                            return (
                                <Dropdown.Menu >
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {s.credentials.id}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=>this.props.crud('update')}>Update</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>this.handleShow(s.credentials.id)}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Menu>
                            );
                        } else {
                            return (
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {s.credentials.id}
                                    </Dropdown.Toggle>
                                </Dropdown>
                            );
                        }
                    })
                    }

                    <Button
                        variant='success'
                        className='border border-darken-4'
                        onClick={()=>this.props.crud('add')}
                    >
                        + Add Source
                    </Button>

                    <Modal.Body
                        show={this.state.show}
                        onHide={this.handleClose}
                        backdrop="static"
                        // keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Delete source?</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Are you sure to delete this source? Current credentials will be forgotten
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancle
                            </Button>
                            <Button variant="primary" onClick={this.handleDelete}>Yes</Button>
                        </Modal.Footer>
                    </Modal.Body>
                </div>
            );
        } else return (
            <Button
                variant='success'
                className='border border-darken-4'
                onClick={()=>this.props.crud('add')}
            >
                + Add Source
            </Button>
        );
    }
}


export default Sources;