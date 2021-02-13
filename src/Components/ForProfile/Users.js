import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Users extends Component {
    render() {
        return (
            <div className="justify-content-center align-content-center">
                <Button variant='success' className='border border-darken-4' > + Add User </Button> 
            </div>
        )
    }
}
