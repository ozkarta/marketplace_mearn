import React from 'react';
import {Route, Switch} from "react-router-dom";


import VisitorHome from '../user/visitor/home/home';
import VisitorLogIn from '../user/visitor/login/login';
import VisitorRegister from '../user/visitor/register/register';

import SellerHome from '../user/seller/home/home';
import SellerAccount from '../user/seller/account/account';
import SellerBusinessProfile from '../user/seller/business-profile/business-profile';

import BuyerHome from '../user/buyer/home/home';
import BuyerAccount from '../user/buyer/account/account';
import BuyerProfile from '../user/buyer/profile/profile';

import PageNotFound from './404-not-fount/404-not-found';

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={VisitorHome} />
                    <Route path="/login" component={VisitorLogIn} />
                    <Route path="/register" component={VisitorRegister} />

                    <Route path="/seller" exact component={SellerHome} />
                    <Route path="/seller/account" component={SellerAccount} />
                    <Route path="/seller/business-profile" component={SellerBusinessProfile} />

                    <Route path="/buyer" exact component={BuyerHome} />
                    <Route path="/buyer/account" component={BuyerAccount} />
                    <Route path="/buyer/profile" component={BuyerProfile} />

                    <Route component={PageNotFound} />
                </Switch>                
            </React.Fragment>
        );
    }
}

export default Routes;