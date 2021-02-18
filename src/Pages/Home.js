import React, { Component } from 'react';
import CarouselBox from '../Components/CarouselBox'
import axios from 'axios';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            shawIssues: false
        }
    }

    newRequest() {
       

        var data;
        axios.post("http://localhost:9090/tickets/find", {
            ticketSystem: "JIRA",
            login: "kakashka_am@mail.ru",
            password: 'IdBigXbJL2aIgrJhGGg2B1A8',
            url: "https://netcrackereducation.atlassian.net/"
        }).then(response => {
            data = response.data;
            console.log('data: ', data);
            this.setState(() => {return{ issues: data, shawIssues: true }});
        }).catch(error => {
            console.log("request error: ", error)
        });
        console.log('state.issues: ', this.state.issues);

    }

    render() {
        return (
            <div>
                <CarouselBox />
            </div>
        )
    }
}
