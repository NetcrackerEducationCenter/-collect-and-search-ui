import React, { Component } from 'react'

export default class StatusButton extends Component {

    notRequest = () => {
        return <div className="right">• NO REQUESTS</div>
    }

    hasRequest = () => {
        return <div className="right">○ REQUESTS</div>
    }

    render() {
        if (this.props.isEmpty) {
            return this.notRequest();
        } else {
            return this.hasRequest();
        }

    }
}
