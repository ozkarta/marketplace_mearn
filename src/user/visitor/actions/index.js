
export function logInUser(role, user, isAuthenticated) {
    return {
        type: 'LOGIN',
        role: role,
        user: user,
        isAuthenticated: isAuthenticated
    }
}

export function logOutUser() {
    return {
        type: 'LOGOUT',
        role: 'visitor',
        user: null,
        isAuthenticated: false
    }
}