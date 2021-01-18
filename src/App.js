import logo from './logo.svg';
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

function App() {

  return (
    <div className="App">
    <div className="root">
    
      
    </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
