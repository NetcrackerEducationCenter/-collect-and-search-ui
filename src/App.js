import React from 'react';
import Header from './Components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

const App = (props) => {

  return (
    <div>
      <Header {...props} />
    </div>
  );
}

export default App;
