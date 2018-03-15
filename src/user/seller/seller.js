import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";


import NavigationBar from '../../shared/navbar/navbar';
import Home from './home/home';
import Account from './account/account';
import BusinessProfile from './business-profile/business-profile';
class SellerMainComponent extends React.Component {
    // Navbar Router Links on the left
    navbarProps = {
        leftLinks: [
            {path: '/seller', key: 'home', displayName: 'Home'}
        ],
        rightLinks: [
        ],
        dropDown: [            
            {path: '/seller/account', key: 'account', displayName: 'Account'},
            {path: '/seller/business-profile', key: 'business-profile', displayName: 'Business Profile'},
            {type: 'separator', key: 'sep1'},
            {path: '/seller/logout', key: 'logout', displayName: 'Log Out'},
        ],
        header: {path: '/seller', key: 'home', displayName: 'Seller Nav'}
    }
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <div>
                        <NavigationBar {...this.navbarProps} />

                        <Route exact path="/seller" component={Home} />
                        <Route path="/seller/account" component={Account} />
                        <Route path="/seller/business-profile" component={BusinessProfile} />
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

export default SellerMainComponent;