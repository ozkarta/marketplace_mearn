import React from 'react';

import NavigationBar from '../../shared/components/navbar/navbar';

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
                <NavigationBar {...this.navbarProps} />
            </React.Fragment>
        );
    }
}

export default BuyerMainComponent;