import React, { Component } from 'react';

import '../css/ModalRequests.css';

export default class ModalRequests extends Component {

    render() {
        return (
            <div className={this.props.active ? "mymodalR active" : "mymodalR"} onClick={() => this.props.setActive(false)}>
                <div className="modalR__content" onClick={e => e.stopPropagation()}>
                    Here will be requestes
                </div>
            </div>
        )

    }
}
