import { Content } from 'antd/lib/layout/layout';
import React from 'react'
import Report from '../Components/ForWorkpage/Report'
import StatusTable from '../Components/StatusTable';

export default function WorkPage(props) {

    return (
        <Content
            style={{
                padding: '0 20%',
                fontFamily: 'Geneva, Arial, Helvetica, sans-serif'
            }}
        >
            <StatusTable
                statuses={props.statuses}
                requestId={props.requestId}
                setRequestId={props.setRequestId}
            />
            <Report report={props.report} />
        </Content>
    );


}