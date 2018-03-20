const AuthReducer = function (state = { role: 'visitor', user: null, isAuthenticated: false }, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                role: 'buyer',
                user: {
                    firstName: 'Oz',
                    lastName: 'kart'
                },
                isAuthenticated: true

            })
        case 'LOGOUT':
            return Object.assign({}, state, {
                role: 'visitor',
                user: null,
                isAuthenticated: false

            });
        default:
            return state;
    }
}

export default AuthReducer;