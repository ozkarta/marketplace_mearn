import React from 'react';

import NavigationBar from '../../shared/navbar/navbar';
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
                <NavigationBar {...this.navbarProps} />
            </React.Fragment>
        );
    }
}



export default SellerMainComponent;