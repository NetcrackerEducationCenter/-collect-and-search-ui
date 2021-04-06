import React, { Component } from 'react'
import AddSearch from '../Components/ForWorkpage/AddSearch';
import Report from '../Components/ForWorkpage/Report'
import StatusTable from '../Components/StatusTable';


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

    render() {
        return (
            <div >
                <StatusTable
                    statuses={this.props.statuses}
                    requestId={this.props.requestId}
                    setRequestId={this.props.setRequestId}
                />
                <Report
                    report={this.props.report}
                    requestId={this.props.requestId}
                />
                <AddSearch onHide={() => { }} />
            </div>
        );

    }
}