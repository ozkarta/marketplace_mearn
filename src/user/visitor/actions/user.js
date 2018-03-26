import axios from 'axios';

const apiBaseUrl = '/api/v1';
export async function authenticate(user) {
    try {
        const response =  await axios.post(`${apiBaseUrl}/users/sign-in`, user);
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

export async function register(user) {
    try {
        const response = await axios.post(`${apiBaseUrl}/users/register`, user);
        if (response && response.data && response.data.auth) {
            let usr = response.data.user;
            if (!usr) {
                return logInUser('visitor', null, null, false);
            }

            return logInUser(usr.role, usr, response.data.token, response.data.auth);
        } else {
            return logInUser('visitor', null, null, false);
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
    return Object.assign({type: 'LOGIN'}, userToSign);
}