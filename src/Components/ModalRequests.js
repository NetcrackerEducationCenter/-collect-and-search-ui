import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import '../css/ModalRequests.css';

export default class ModalRequests extends Component {

    requestHistoryTable = () => {
        return (
            <Table striped border hover>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Request</th>
                        <th>Date added</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.statuses.map(v => {
                        return (
                            <tr>
                                <td>{v.messages.requestId}</td>
                                <td>{v.messages.keyWords}</td>
                                <td>{v.messages.date}</td>
                                <td>{v.messages.status}</td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <td>1</td>
                        <td>REQUEST 1</td>
                        <td>12.12.2020</td>
                        <td>Done</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>REQUEST 2</td>
                        <td>12.12.2020</td>
                        <td>In process</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>REQUEST 3</td>
                        <td>12.12.2020</td>
                        <td>Faild</td>
                    </tr> */}
                </tbody>

            </Table>
        );
    }

    render() {
        if (this.props.statuses.length <= 0) {
            return (
                <div className={this.props.active ? "mymodalR active" : "mymodalR"} onClick={() => this.props.setActive(false)}>
                    <div className="modalR__content" onClick={e => e.stopPropagation()}>
                        Here will be requestes
                    </div>
                </div>
            )
        } else {
            return (
                <div className={this.props.active ? "mymodalR active" : "mymodalR"} onClick={() => this.props.setActive(false)}>
                    <div className="modalR__content" onClick={e => e.stopPropagation()}>
                        {this.requestHistoryTable()}
                    </div>
                </div>
            )
        }


    }
}
