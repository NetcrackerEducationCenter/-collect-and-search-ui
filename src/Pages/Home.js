import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

//Pictures
import project_structure from '../assets/project-structure.png';
import AddSearchModal from '../Components/AddSearchModal';

//CSS
import '../css/Form.css';

function Home(props) {

    const [shawModal, setShowModal] = useState(false);

    return (

        <Container fluid>
            <Col>

                <div className='text-center text-monospace font-weight-bold fs'
                    style={{ fontSize: 36 }}
                >

                    <h1>Collect and Search</h1>
                </div>

                <Row>

                    <Col style={{ fontSize: 20, textAlign: 'center' }}>


                        <br />
                            Collect and Search it's a project for Netcracker education center.
                            This project will help agile commands to find any information from the sources like JIRA or FTP.
                        <br />

                        <br />
                            This project is created with a micro service architecture.
                            Microservices are shown in the picture below.
                        <br />
                        <br />

                        <img src={project_structure}
                            className='img-fluid img-thumbnail shadow mx-auto d-block'
                            alt='project structure'
                            xs='auto'
                        />

                        {/* <CarouselBox /> */}
                        <br />
                        <Button block onClick={() => setShowModal(true)}>
                            Try to add new request
                        </Button>
                        <br />
                        <br />

                    </Col>

                </Row>
            </Col>
            <AddSearchModal show={shawModal}
                onHide={() => setShowModal(false)}
            />

        </Container>

    );

}

export default Home;