import React from 'react';

import * as User from '../../shared/actions/user';
import NavigationBar from '../../shared/components/navbar/navbar';
class SellerMainComponent extends React.Component {
    // Navbar Router Links on the left
    navbarProps = {
        leftLinks: [
            {path: '/seller', key: 'home', displayName: 'Home'},
            {path: '/seller/products', key: 'store', displayName: 'Products'}
        ],
        rightLinks: [
        ],
        dropDown: [            
            {path: '/seller/account', key: 'account', displayName: 'Account'},
            {path: '/seller/business-profile', key: 'business-profile', displayName: 'Business Profile'},
            {path: '/seller/store', key: 'store', displayName: 'Store'},
            {type: 'separator', key: 'sep1'},
            //{path: '/seller/logout', key: 'logout', displayName: 'Log Out'},
            {type: 'action', key: 'logout', displayName: 'Log Out',  onClick: this.logOutHandler, this: this}
        ],
        header: {path: '/seller', key: 'home', displayName: 'Seller Nav'}
    }
    constructor(props) {
        super(props);
        this.state = props;
        this.logOutHandler = this.logOutHandler.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    logOutHandler() {
        this.logOut();
    }

    logOut() {
        this.props.dispatch(User.logOutUser());
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar {...this.navbarProps} />
            </React.Fragment>
        );
    }
}



export default SellerMainComponent;