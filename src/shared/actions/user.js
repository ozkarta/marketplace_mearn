export function logOutUser() {
    return {
        type: 'LOGOUT',
        role: 'visitor',
        user: null,
        isAuthenticated: false
    }
}