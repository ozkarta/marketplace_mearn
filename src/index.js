import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {createStore} from 'redux'

import Routes from './shared/routes';

import VisitorMainComponent from './user/visitor/visitor';
import SellerMainComponent from './user/seller/seller';
import BuyerMainComponent from './user/buyer/buyer';
import ErrorModal from './shared/error-modal/error-modal';
import './index.css';

const auth = function (state = {user: { role: 'visitor', user: null, isAuthenticated: false }}, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, { 
                user: {
                    role: 'buyer', 
                    user: {
                        firstName: 'Oz',
                        lastName: 'kart'
                    }, 
                    isAuthenticated: true 
                }
            })
        case 'LOGOUT':
            return Object.assign({}, state, { 
                user: {
                    role: 'visitor', 
                    user: null, 
                    isAuthenticated: false 
                }
            });
        default:
            return state;
    }
}
const store = createStore(auth);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign(
            {},
            props
        );
    }

    componentDidCatch(error, info) {
        this.setState({ error: error, errorInfo: info, hasError: true });
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <div>
                        {
                            !this.state.reduxState.user.isAuthenticated && <VisitorMainComponent/>                    
                        }
                        {
                            this.state.reduxState.user.isAuthenticated && this.state.reduxState.user.role === 'seller' && <SellerMainComponent/>
                        }
                        {
                            this.state.reduxState.user.isAuthenticated && this.state.reduxState.user.role === 'buyer' && <BuyerMainComponent/>
                        }

                       <Routes {...this.state}/>

                    </div>
                </Router>

                {this.state.error && this.state.error.hasError && <ErrorModal error={this.state.error.error} errorInfo={this.state.error.errorInfo} />}
            </React.Fragment>
        );
    }
}

function render() {
    ReactDOM.render(
        <App reduxState={store.getState()} store={store}/>,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();