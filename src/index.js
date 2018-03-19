import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import Routes from './shared/routes';

import VisitorMainComponent from './user/visitor/visitor';

import SellerMainComponent from './user/seller/seller';

import BuyerMainComponent from './user/buyer/buyer';

import ErrorModal from './shared/error-modal/error-modal';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: 'Something Wrong...',
                errorInfo: 'some info...',
                hasError: false,
            },
            user: {
                role: 'buyer',
                user: {},
                isAuthenticated: true
            }
        };
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
                            !this.state.user.isAuthenticated && <VisitorMainComponent/>                    
                        }
                        {
                            this.state.user.isAuthenticated && this.state.user.role === 'seller' && <SellerMainComponent/>
                        }
                        {
                            this.state.user.isAuthenticated && this.state.user.role === 'buyer' && <BuyerMainComponent/>
                        }

                       <Routes state={this.state}/>

                    </div>
                </Router>

                {this.state.error.hasError && <ErrorModal error={this.state.error.error} errorInfo={this.state.error.errorInfo} />}
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
