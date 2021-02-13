import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import NewModal from '../Components/Modal'
import Field from '../Field';
import logo from '../assets/logo512.png';


export default class WorkPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            issues: [],
            shawIssues: false,
            download: false
        }
    }

    shawModal = (activeted) => {
        this.setState(() => { return { modalActive: activeted } })
    }

    setIssuesActive = (activeted) => {
        this.setState({ shawIssues: activeted })
    }

    setIssues = (newIssues) => {
        this.setState({ issues: newIssues });
    }

    setDownload = (value) => {
        this.setState(() => { return { download: value } });
    }





    render() {
        return (
            <div>

                <Field shawIssues={this.state.shawIssues} issues={this.state.issues} setDownload={this.setDownload} />

                {/* <div className={this.state.download ? "logo active" : "logo"}>
                    <img className="App-logo" src={logo} alt="download" />
                </div> */}


                <Button className='btn-success   boto'
                    onClick={() => this.shawModal(true)}
                >
                    +
                </Button>

                <NewModal show={this.state.modalActive}
                    shawModal={this.shawModal}
                    setIssues={this.setIssues}
                    setIssuesActive={this.setIssuesActive}
                    setDownload={this.setDownload}
                    onHide={() => this.shawModal(false)}
                />

                {/* <MyVerticallyCenteredModal show={this.state.modalActive} onHide= {()=> this.shawModal(false)} /> */}

            </div>
        )
    }
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
          </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
// const styles = {
//     fixed_button: {
//         position: 'fixed', /*задаём тип позиции, в нашем случае - фиксированная*/
//         top: '100px',     /* отступ сверху*/
//         left: '0px',       /* отступ слева*/
//         width: '100px',    /* ширина кнопки*/
//         height: '35px',    /* высота кнопки*/
//         'z-index': '999'    /*позиция относительно дальности*/
//     }
// }
