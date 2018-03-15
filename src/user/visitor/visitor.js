import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";


import NavigationBar from '../../shared/navbar/navbar';
import Home from './home/home';
import LogIn from './login/login';
import Register from './register/register';
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
                <Router>
                    <div>
                        <NavigationBar {...this.navbarProps} />

                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={LogIn} />
                        <Route path="/register" component={Register} />
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

export default VisitorMainComponent;