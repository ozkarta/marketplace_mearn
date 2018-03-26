import axios from 'axios';

let token = localStorage.getItem('token');
const storageUser = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null;
const defaultReduxUserState = storageUser ? 
    {
        role: storageUser.role,
        user: storageUser,
        isAuthenticated: true,
        token: token
    } : { role: 'visitor', user: null, isAuthenticated: false, token: null };

    //? JSON.parse(localStorage.getItem('user')) : { role: 'visitor', user: null, isAuthenticated: false, token: null };



const AuthReducer = function (state = defaultReduxUserState, action) {
    switch (action.type) {
        case 'LOGIN': {
            let assignedObject = Object.assign({}, state, action);
            localStorage.setItem('token', JSON.stringify(assignedObject.token));
            localStorage.setItem('user', JSON.stringify(assignedObject.user));
            axios.defaults.headers.common['Authorization'] = assignedObject.token;

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
            
        default: {
            if (state.isAuthenticated) {
                axios.defaults.headers.common['Authorization'] = state.token;
            } else {
                delete axios.defaults.headers.common['Authorization'];
            }            
            return state;
        }
            
    }
}

export default AuthReducer;