import axios from 'axios';

const apiBaseUrl = '/api/v1';
export async function updateUser(user) {
    try {
        const response =  await axios.put(`${apiBaseUrl}/users`, user);
        if (response && response.data && response.data.auth) {
            let usr = response.data.user;
            if (!usr) {
                return logInUser('visitor', null, null, false);
            }

            return logInUser(usr.role, usr, response.data.token, response.data.auth)
        } else {
            return logInUser('visitor', null, null, false);
        }
    } catch (ex) {
        throw ex.response.data;
    }
}

export async function getUserById(userId) {
    try {
        const response = await axios.get(`${apiBaseUrl}/users/${userId}`);
        if (response && response.data) {
            return response.data;
            
        } else {
            return null;
        }
    } catch (ex) {
        throw ex.response.data;
    }
}

export function logInUser(role, user, token, isAuthenticated) {
    let userToSign = {
        role: role,
        user: user,
        isAuthenticated: isAuthenticated,
        token: token
    };
    return Object.assign({type: 'LOGIN_AFTER_USER_UPDATE'}, userToSign);
}