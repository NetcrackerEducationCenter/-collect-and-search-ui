import React from 'react'
import { Container, Table } from 'react-bootstrap';

function StatusTable(props) {

    const statusList = ['NOT_STARTED', 'IN_PROCESS', 'COMPLETED'];

    const getContent = (v) => {
        return (
            <>
                <td>{v.requestId}</td>
                <td>{v.keywords}</td>
                <td>{v.date}</td>
                <td>{v.status}</td>
            </>
        )
    }

    return (
        <Container>

            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Request</th>
                        <th>Date added</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {props.statuses.map(v => {
                        if (v.messages.status === statusList[2]) {

                            if (props.requestId === v.messages.requestId) {
                                return (
                                    <tr className='active' style={{ border: 4, borderColor: 'blue' }} key={v.messages.requestId}
                                        onClick={() => { props.setRequestId(v.messages.requestId) }} >
                                        {getContent(v.messages)}
                                    </tr>
                                );
                            }

                            else {
                                return (
                                    <tr style={{ backgroundColor: 'RGB(191, 253, 252)' }} key={v.messages.requestId}
                                        onClick={() => { props.setRequestId(v.messages.requestId) }} >
                                        {getContent(v.messages)}
                                    </tr>
                                );
                            }

                        } else {
                            return (
                                <tr className='table-borderless' key={v.messages.requestId} >
                                    {getContent(v.messages)}
                                </tr>
                            );
                        }
                    })}
                </tbody>

            </Table>
        </Container>
    );
}

export default StatusTable;
