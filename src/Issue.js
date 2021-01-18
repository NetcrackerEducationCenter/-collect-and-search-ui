import './App.css';
import axios from 'axios';
import React from 'react';

class Issue extends React.Component {
  constructor(props) {
    super(props);
    var commentsArr = this.props.getCommentsByKey(this.props.key);
    this.state = {
      comments: commentsArr
    }
    console.log(this.state.comments);
  }

  render() {
    return (
        <div className="issue">
          <h1>{this.props.children}</h1>
        </div>
    );
  }


}

export default Issue;
