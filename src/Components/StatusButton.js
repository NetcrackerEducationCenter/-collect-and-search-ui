import React, { Component } from 'react'

export default class StatusButton extends Component {
   
    notRequest = () => {
        return <div className="right">• NO REQUESTS</div>
    }

    render() {
        if (this.props.isEmpty) {
            return this.notRequest();
        }

    }
}
