import React from 'react';
import { Button, Container } from 'react-bootstrap';

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
    if (!!props.report) {
        return (
            <Container fluid>
                {props.report.text}
                <Button onClick={downloadTxtFile} >Download text</Button>
            </Container>
        );
    } else return (
        <Container className='mb-3' fluid id='p'>
        </Container>
    );
}

export default Report;