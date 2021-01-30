import React from 'react';
import Issue from './Issue';


class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: []
    }
    //this.newRequest();
  }



  

  eachIssue = (item, i) => {
    return (
      <Issue key={i} issue={item} index={i} />
    );
  }

  render() {
    if (this.props.shawIssues) {
      return (
        <div className="field">
          {this.props.issues.map(this.eachIssue)}
        </div>
      );
    }
    return (<div></div>);
  }
}

export default Field;