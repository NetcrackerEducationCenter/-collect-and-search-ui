import axios from 'axios';
import React from 'react';
import Issue from './Issue';


class Field extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        issues: []
      }
      this.newRequest();
    }
  
    getCommentsByKey = (i) => {
      return this.state.issues[i].comments;
    }
  
    newRequest = () => {
      var data; 
      axios.post("http://localhost:9090/tickets/find", {
        //body: {
          ticketSystem: "JIRA",
          login: "kakashka_am@mail.ru",
          password: 'IdBigXbJL2aIgrJhGGg2B1A8',
          url: "https://netcrackereducation.atlassian.net"
        //}
        //accept: "application/json"
      }).then(response => {
        data = response.data;
        console.log('data: ', data); //тут он выводиться
        console.log('responce.data: ', response.data);
        this.setState({issues: data});
      }).catch(error => {
          console.log("request error: ", error)
      });
      console.log('issues data: ', this.state.issues); //тут он НЕ выводиться
    }

    eachIssue = (item, i) => {
      return (
        <div key={i} >
          <h1><p>{item.issueKey}</p></h1>
          <h2><p>{item.title}</p></h2>
          <h3><p>{item.body}</p></h3>
          <p></p>
          <p>{item.comments.map((comment, i) => <p key={i}>{comment.description}</p>)}</p>
        </div>
      );
    }
  
    render() {
      return (
          <div className="field">
            {this.state.issues.map (this.eachIssue)}
          </div>
      );
    }
  }

  export default Field;