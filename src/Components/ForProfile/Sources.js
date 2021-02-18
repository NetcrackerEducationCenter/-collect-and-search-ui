import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Sources extends Component {
    render() {
        return (
            <div className="d-flex align-items-center">
                 
                <Button variant='success' className='border border-darken-4' > + Add Source </Button> 
            </div>
        )
    }
}
