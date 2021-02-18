import '../App.css';
import '../css/Main.css';
import '../css/List.css';
import React from 'react';

class Issue extends React.Component {
  constructor(props) {
    super(props);
    var commentsArr = this.props.issue.comments;
    this.state = {
      comments: commentsArr
    }
  }

  renderComments = () => {
    return (
      <ul className="list3b">
        {this.props.issue.comments.map((comment, i)=> <li key={i}>{comment.description}</li>)}
      </ul>
    )
  }

  render() {
    return (
      <fieldset>
       
          <div className="text">
            <p /><h2>{this.props.issue.issueKey}: {this.props.issue.title} </h2>
            <p />{this.props.issue.body}
            {this.renderComments()}
          </div>
        
      </fieldset>
    );
  }


}

export default Issue;
