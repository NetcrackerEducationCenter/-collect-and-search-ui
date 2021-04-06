import React from 'react'
import AddSearch from '../Components/ForWorkpage/AddSearch';
import Report from '../Components/ForWorkpage/Report'
import StatusTable from '../Components/StatusTable';

export default function WorkPage(props) {

    return (
        <div >
            <StatusTable
                statuses={props.statuses}
                requestId={props.requestId}
                setRequestId={props.setRequestId}
            />
            <Report report={props.report} />
            <AddSearch />
        </div>
    );


}