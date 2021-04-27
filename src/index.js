import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Keycloak from 'keycloak-js';

import './css/index.css';

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
