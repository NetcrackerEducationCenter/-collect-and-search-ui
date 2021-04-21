import React from 'react';
import Header from './Components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';

const App = (props) => {

  return (
    <Router>
      <Header {...props} />
    </Router>
  );
}

export default App;
