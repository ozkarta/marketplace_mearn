import React from 'react';
import {Route} from "react-router-dom";

import BuyerHome from './home/home';
import BuyerAccount from './account/account';
import BuyerProfile from './profile/profile';

class BuyerRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/buyer" component={BuyerHome} />
                <Route path="/buyer/account" component={BuyerAccount} />
                <Route path="/buyer/profile" component={BuyerProfile} />
            </React.Fragment>
        );
    }
}
export default BuyerRoutes;