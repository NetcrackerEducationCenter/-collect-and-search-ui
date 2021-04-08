import React from 'react';
import { keycloak } from '../../index';

function UserInfo(props) {
    let roles = keycloak.tokenParsed.resource_access.ui.roles;

    return (
        <div className="userInfo-wrapper">
            <p>Username: {keycloak.tokenParsed.preferred_username}</p>
            <p>First name: {keycloak.tokenParsed.given_name}</p>
            <p>Last name: {keycloak.tokenParsed.family_name}</p>
            <p>Email: {keycloak.tokenParsed.email}</p>
            <div>Roles: {roles.map(v => {
                return  <div key={v}>
                            <p>{v}</p>
                        </div>
            })}
            </div>
        </div>
    );
}

export default UserInfo;