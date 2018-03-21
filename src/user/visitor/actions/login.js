
export function logInUser(role, user, isAuthenticated) {
    let userToSign = {
        role: role,
        user: user,
        isAuthenticated: isAuthenticated
    };

    localStorage.setItem('user', JSON.stringify(userToSign));
    
    return Object.assign({type: 'LOGIN'}, userToSign);
}
