import React from 'react';

import NavigationBar from '../../shared/components/navbar/navbar';
class VisitorMainComponent extends React.Component {
    // Navbar Router Links on the left
    navbarProps = {
        leftLinks: [
            {path: '/', key: 'home', displayName: 'Home'},
            {path: '/login', key: 'login', displayName: 'Log In'},
            {path: '/register', key: 'register', displayName: 'Register'}
        ],
        header: {path: '/', key: 'home', displayName: 'Visitor'}
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
export default VisitorMainComponent;