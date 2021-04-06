import React from 'react';
import {keycloak} from '../../index';

function UserInfo(props) {
    let roles = keycloak.tokenParsed.resource_access.ui.roles;

    return (
        <div className="userInfo-wrapper">
            <p>Username: {keycloak.tokenParsed.preferred_username}</p>
            <p>First name: {keycloak.tokenParsed.given_name}</p>
            <p>Last name: {keycloak.tokenParsed.family_name}</p>
            <p>Email: {keycloak.tokenParsed.email}</p>
            <p>Roles: {roles.map(v=> {return <p>{v}</p>})}</p>
        </div>
    );
}

export default UserInfo;