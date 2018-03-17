import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import ErrorModal from './shared/error-modal/error-modal';

import VisitorMainComponent from './user/visitor/visitor';
import VisitorRoutes from './user/visitor/visitor-routes';

import SellerMainComponent from './user/seller/seller';
import SellerRoutes from './user/seller/seller-routes';

import BuyerMainComponent from './user/buyer/buyer';
import BuyerRoutes from './user/buyer/buyer-routes';
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
                isSignedIn: true
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
                            !this.state.user.isSignedIn && <VisitorMainComponent/>                    
                        }
                        {
                            this.state.user.isSignedIn && this.state.user.role === 'seller' && <SellerMainComponent/>
                        }
                        {
                            this.state.user.isSignedIn && this.state.user.role === 'buyer' && <BuyerMainComponent/>
                        }

                        <VisitorRoutes/>
                        <SellerRoutes/>
                        <BuyerRoutes/>
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
