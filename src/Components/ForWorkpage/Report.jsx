import React from 'react';
import { Button, Container, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';

function Report(props) {
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([props.report.text],
            { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = `Report_${props.report.requestId}.txt`;
        document.body.appendChild(element);
        element.click();
    }
    console.log(props.requestId);
    if (!!props.report) {
        return (
            <Container fluid>
                {props.report.dataModels.map(v => {
                    return (

                        <OverlayTrigger
                            trigger="click"
                            key='source'
                            placement='top'
                            overlay={
                                <Popover id={v.requestId}>
                                    <Popover.Title as="h3">Founded from</Popover.Title>
                                    <Popover.Content>
                                        {props.report.dataModels.dataSource}
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <p>
                                {v.dataModels.dataSource}
                            </p>

                        </OverlayTrigger>
                    );
                })}
                <Button onClick={downloadTxtFile} >Download text</Button>
            </Container>
        );
    } else if (!!props.requestId) {
        return (
            <div className="text-center" >
                <Spinner animation='border' role='status' variant='primary'>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    } else {
        return (
            null
        );
    }
}

export default Report;