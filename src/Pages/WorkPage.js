import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap'
import AddSearchModal from '../Components/AddSearchModal'
import Field from '../Components/Field';


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

    shawIssuesActive = (activeted) => {
        this.setState({ shawIssues: activeted })
    }

    setIssues = (newIssues) => {
        this.setState({ issues: newIssues });
    }

    shawDownload = (value) => {
        this.setState(() => { return { download: value } });
    }


    requestHistoryTable = () => {
        return (
            <Table striped border hover>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Request</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>REQUEST 1</td>
                        <td>Done</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>REQUEST 2</td>
                        <td>In process</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>REQUEST 3</td>
                        <td>Faild</td>
                    </tr>
                </tbody>

            </Table>
        );
    }



    render() {
        return (
            <div>

                <Field shawIssues={this.state.shawIssues} issues={this.state.issues} setDownload={this.setDownload} />

                <Button className='btn-success   boto'
                    onClick={() => this.shawModal(true)}
                >
                    +
                </Button>

                <AddSearchModal show={this.state.modalActive}
                    setIssues={this.setIssues}
                    shawIssuesActive={this.shawIssuesActive}
                    shawDownload={this.shawDownload}
                    onHide={() => this.shawModal(false)}
                />
                
            </div>
        )
    }
}
