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
        //this.newRequest();
    }

    newRequest() {
       

        var data;
        axios.post("http://localhost:9090/tickets/find", {
            //body: {
            ticketSystem: "JIRA",
            login: "kakashka_am@mail.ru",
            password: 'IdBigXbJL2aIgrJhGGg2B1A8',
            url: "https://netcrackereducation.atlassian.net/"
            //}
            //accept: "application/json"
        }).then(response => {
            data = response.data;
            console.log('data: ', data);
            this.setState(state => {return{ issues: data, shawIssues: true }});
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
