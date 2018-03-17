import React from 'react';
import {Route} from "react-router-dom";

import VisitorHome from './home/home';
import VisitorLogIn from './login/login';
import VisitorRegister from './register/register';
class VisitorRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" component={VisitorHome} />
                <Route path="/login" component={VisitorLogIn} />
                <Route path="/register" component={VisitorRegister} />
            </React.Fragment>
        );
    }
}

export default VisitorRoutes;