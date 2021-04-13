import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Keycloak from 'keycloak-js';
import { config } from './Config';

export let keycloak = Keycloak('./resources/keycloak.json');

// Get the keycloak configuration instance
keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
  if (!authenticated) {
    window.location.reload();
  } else {

    console.info('Authenticated');
  }


  // React Render on authentication
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

  // Store authentication tokens in sessionStorage for usage in app

  sessionStorage.setItem('keycloakAuthentication', keycloak.token);
  sessionStorage.setItem('keycloakAuthentication', keycloak.refreshToken);

  // To regenerate token on expiry
  setTimeout(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp
            + keycloak.timeSkew - new Date().getTime() / 1000)
          + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });
  }, 6000)
}).catch(() => {
  console.error('Authenticated Failed');
})


// // single websocket instance for the own application and constantly trying to reconnect.

// componentDidMount() {
//   connect();
// }

let timeout = 250; // Initial timeout duration as a class variable
export const webSocket = new WebSocket(config.ws);

/**
* @function connect
* This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
*/

let connectInterval;

// websocket onopen event listener
webSocket.onopen = () => {
  console.log("connected websocket main component");

  timeout = 250; // reset timer to 250 on open of websocket connection 
  clearTimeout(connectInterval); // clear Interval on on open of websocket connection
};

webSocket.onmessage = (msg) => {
  console.log('GET -> ' + msg.data);
  let data = JSON.parse(msg.data);
  if (data.type === 'status') {
    console.log('setReqStatuses(data.data.reverse())');
  }
}

// websocket onclose event listener
webSocket.onclose = e => {
  console.log(
    `Socket is closed. Reconnect will be attempted in ${Math.min(
      10000 / 1000,
      (timeout + timeout) / 1000
    )} second.`,
    e.reason
  );

  timeout = timeout + timeout; //increment retry interval
  connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
};

// websocket onerror event listener
webSocket.onerror = err => {
  console.error(
    "Socket encountered error: ",
    err.message,
    "Closing socket"
  );

  webSocket.close();
};

/**
* utilited by the @function connect to check if the connection is close, if so attempts to reconnect
*/
const check = () => {
  // const { ws } = this.state;
  if (!webSocket || webSocket.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);