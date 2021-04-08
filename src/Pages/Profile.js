import React, { Component, useState } from 'react';
import Avatar from '../Components/ForProfile/Avatar';
import UserInfo from '../Components/ForProfile/UserInfo';
import Users from '../Components/ForProfile/Users';

import { Col, Container, Row, Button } from 'react-bootstrap';
import AddSourceModal from '../Components/ForProfile/sources/AddSourceModal';
import Sources from '../Components/ForProfile/sources/Sources';

// function Profile(props) {

//     const [showModal, setShowModal] = useState(false);
//     let show = false;
//     const [type, settype] = useState('add');

//     const crud = (type)=>{
//         settype(type);
//         // setShowModal(true);
//         show=true;
//     }

//     return (
//         <Container fluid className='mt-sm-2 mt-lg-5'>
//             <Row className='mt-sm-5'></Row>
//             <Row className='mt-sm-5 mt-lg-5'>
//                 <Col ms={6} lg={4} className="">
//                     <Avatar />
//                 </Col>
//                 <Col ms={6} lg={4} className="">
//                     <UserInfo />
//                 </Col>
//                 <Col lg={4} className="">

//                     <Sources {...props} crud={crud}/>

//                 </Col>
//             </Row>
//             <Row>
//                 <Col className="">
//                     <Users />
//                 </Col>
//             </Row>

//             <AddSourceModal
//                 type={type}
//                 show={show}
//                 onHide={() => setShowModal(false)}

//             />
//         </Container>
//     );
// }


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            type: 'add'
        }
    }

    crud = (type) => {
        this.setState({type});
        // setShowModal(true);
        this.setState({showModal: true});
    }

    render() {
        return (
            <Container fluid className='mt-sm-2 mt-lg-5'>
                <Row className='mt-sm-5'></Row>
                <Row className='mt-sm-5 mt-lg-5'>
                    <Col ms={6} lg={4} className="">
                        <Avatar />
                    </Col>
                    <Col ms={6} lg={4} className="">
                        <UserInfo />
                    </Col>
                    <Col lg={4} className="">

                        <Sources {...this.props} crud={this.crud} />

                    </Col>
                </Row>
                <Row>
                    <Col className="">
                        <Users />
                    </Col>
                </Row>

                <AddSourceModal
                    type={this.state.type}
                    show={this.state.showModal}
                    onHide={() => this.setState({showModal: false})}

                />
            </Container>
        );
    }
}


export default Profile;
