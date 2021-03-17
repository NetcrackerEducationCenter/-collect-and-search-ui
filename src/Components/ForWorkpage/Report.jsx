import React from 'react';
import { Container } from 'react-bootstrap';

function Report(props) {
    if (!!props.report) {
        return (
            <Container>
                {props.report.text}
            </Container>
        );
    } else return null;
}

export default Report;