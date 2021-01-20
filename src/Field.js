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
        console.log('data: ', data);
        console.log('responce.data: ', response.data);
        this.setState({issues: data});
      }).catch(error => {
          console.log("request error: ", error)
      });
    }

    eachIssue = (item, i) => {
      return (
        <Issue key={i} issue={item} index={i} />
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