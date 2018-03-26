let token = localStorage.getItem('token');
const storageUser = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) : { role: 'visitor', user: null, isAuthenticated: false, token: null };
storageUser.token = token;

const AuthReducer = function (state = storageUser, action) {
    switch (action.type) {
        case 'LOGIN': {
            let assignedObject = Object.assign({}, state, action);
            localStorage.setItem('token', JSON.stringify(assignedObject.token));
            localStorage.setItem('user', JSON.stringify(assignedObject.user));
            return assignedObject;
        }
            
        case 'LOGOUT': {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return Object.assign({}, state, {
                role: 'visitor',
                user: null,
                isAuthenticated: false,
                token: null
            });
        }
            
        default:
            return state;
    }
}

export default AuthReducer;