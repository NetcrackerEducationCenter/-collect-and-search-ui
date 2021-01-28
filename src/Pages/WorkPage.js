import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Modal from '../Components/Modal'
import axios from 'axios';
import Field from '../Field';

export default class WorkPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            issues: [],
            shawIssues: false
        }
    }

    setActive = (activeted) => {
        this.setState({ modalActive: activeted })
    }

    newRequest = (ts, lg, ps, ur) => {
        var data;
        axios.post("http://localhost:9090/tickets/find", {
            //body: {
            ticketSystem: ts, //"JIRA",
            login: lg, //"kakashka_am@mail.ru",
            password: ps, //'IdBigXbJL2aIgrJhGGg2B1A8',
            url: ur //"https://netcrackereducation.atlassian.net"
            //}
            //accept: "application/json"
        }).then(response => {
            data = response.data;
            console.log('data: ', data);
            console.log('responce.data: ', response.data);
            this.setState({ issues: data, shawIssues: true });
        }).catch(error => {
            console.log("request error: ", error)
        });
    }

    render() {
        return (
            <div>
                <Button className='btn-success   boto'
                    onClick={() => this.setState({ modalActive: true })}
                >
                    +
                </Button>

                <Modal active={this.state.modalActive}
                    setActive={this.setActive}
                    newRequest={this.newRequest}
                />

                <Field shawIssues={this.state.shawIssues} issues={this.state.issues} />

            </div>
        )
    }
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
