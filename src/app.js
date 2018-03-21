import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {connect} from 'react-redux'

import Routes from './shared/routes';
import VisitorMainComponent from './user/visitor/visitor';
import SellerMainComponent from './user/seller/seller';
import BuyerMainComponent from './user/buyer/buyer';
import ErrorModal from './shared/components/error-modal/error-modal';

class App extends React.Component {

    componentDidCatch(error, info) {
        this.setState({ error: error, errorInfo: info, hasError: true });
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <div>
                        {
                            !this.props.user.isAuthenticated && <VisitorMainComponent {...this.props}/>                    
                        }
                        {
                            this.props.user.isAuthenticated && this.props.user.role === 'seller' && <SellerMainComponent {...this.props}/>
                        }
                        {
                            this.props.user.isAuthenticated && this.props.user.role === 'buyer' && <BuyerMainComponent {...this.props}/>
                        }

                       <Routes {...this.props}/>

                    </div>
                </Router>

                {this.props.error && this.state.error.hasError && <ErrorModal error={this.props.error.error} errorInfo={this.props.error.errorInfo} />}
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => {
        return {
            user: state.user
        };
    }
)(App)