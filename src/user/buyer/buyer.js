import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";


import NavigationBar from '../../shared/navbar/navbar';
import Home from './home/home';
import Account from './account/account';
import Profile from './profile/profile';
class BuyerMainComponent extends React.Component {
    // Navbar Router Links on the left
    navbarProps = {
        leftLinks: [
            {path: '/buyer', key: 'home', displayName: 'Home'}
        ],
        rightLinks: [
        ],
        dropDown: [            
            {path: '/buyer/account', key: 'account', displayName: 'Account'},
            {path: '/buyer/profile', key: 'profile', displayName: 'Profile'},
            {type: 'separator', key: 'sep1'},
            {path: '/buyer/logout', key: 'logout', displayName: 'Log Out'},
        ],
        header: {path: '/buyer', key: 'home', displayName: 'Buyer Nav'}
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

                        <Route exact path="/buyer" component={Home} />
                        <Route path="/buyer/account" component={Account} />
                        <Route path="/buyer/profile" component={Profile} />
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

export default BuyerMainComponent;