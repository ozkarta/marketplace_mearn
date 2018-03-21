const storageUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { role: 'visitor', user: null, isAuthenticated: false };


const AuthReducer = function (state = storageUser, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, action)
        case 'LOGOUT': {
            localStorage.removeItem('user');
            return Object.assign({}, state, {
                role: 'visitor',
                user: null,
                isAuthenticated: false

            });
        }
            
        default:
            return state;
    }
}

export default AuthReducer;