import React from 'react';
import {Route} from "react-router-dom";

import SellerHome from './home/home';
import SellerAccount from './account/account';
import SellerBusinessProfile from './business-profile/business-profile';
class SellerRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/seller" component={SellerHome} />
                <Route path="/seller/account" component={SellerAccount} />
                <Route path="/seller/business-profile" component={SellerBusinessProfile} />
            </React.Fragment>
        )
    }
}

export default SellerRoutes;