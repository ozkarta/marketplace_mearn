import axios from 'axios';

export function authenticate(user) {
    axios.post('/api/v1/users/sign-in', user)
        .then(response => {
            if (response && response.data && response.data.auth) {
                let usr = response.data.user;
                if (!usr) {
                    return logInUser('visitor', null, null, false);
                }

                return logInUser(usr.role, usr, response.data.token, response.data.auth)
            } else {
                return logInUser('visitor', null, null, false);
            }
        })
        .catch(error => {
            console.dir(error);
            return logInUser('visitor', null, null, false);
        })
}


export function logInUser(role, user, token, isAuthenticated) {
    let userToSign = {
        role: role,
        user: user,
        isAuthenticated: isAuthenticated
    };

    localStorage.setItem('user', JSON.stringify(userToSign));
    
    return Object.assign({type: 'LOGIN'}, userToSign);
}
