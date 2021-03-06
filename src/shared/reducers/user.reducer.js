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



const UserReducer = function (state = defaultReduxUserState, action) {
    switch (action.type) {
        case 'LOGIN': {
            let assignedObject = Object.assign({}, state, action);
            localStorage.setItem('token', JSON.stringify(assignedObject.token));
            localStorage.setItem('user', JSON.stringify(assignedObject.user));
            axios.defaults.headers.common['Authorization'] = assignedObject.token;

            return assignedObject;
        }

        case 'LOGIN_AFTER_USER_UPDATE': {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            
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

        case 'SELLER_BUSINESS_PROFILE_CREATED': {
            let assignedObject = Object.assign({}, state);
            assignedObject.user.business = action.business;
            localStorage.setItem('user', JSON.stringify(assignedObject.user));
            return assignedObject;
        }

        case 'SELLER_BUSINESS_PROFILE_UPDATED': {
            let assignedObject = Object.assign({}, state);
            assignedObject.user.business = action.business;
            localStorage.setItem('user', JSON.stringify(assignedObject.user));
            return assignedObject;
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

export default UserReducer;