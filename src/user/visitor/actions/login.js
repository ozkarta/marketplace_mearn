
export function logInUser(role, user, isAuthenticated) {
    let userToSign = {
        role: role,
        user: user,
        isAuthenticated: isAuthenticated
    };

    localStorage.setItem('user', JSON.stringify(userToSign));
    
    return Object.assign({type: 'LOGIN'}, userToSign);
}

export function logOutUser() {
    return {
        type: 'LOGOUT',
        role: 'visitor',
        user: null,
        isAuthenticated: false
    }
}