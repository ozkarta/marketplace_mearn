import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";


import VisitorHome from '../user/visitor/components/home/home';
import VisitorLogIn from '../user/visitor/components/login/login';
import VisitorRegister from '../user/visitor/components/register/register';

import SellerHome from '../user/seller/components/home/home';
import SellerAccount from '../user/seller/components/account/account';
import SellerBusinessProfile from '../user/seller/components/business-profile/business-profile';

import BuyerHome from '../user/buyer/components/home/home';
import BuyerAccount from '../user/buyer/components/account/account';
import BuyerProfile from '../user/buyer/components/profile/profile';

import PageNotFound from './components/404-not-fount/404-not-found';

class Routes extends React.Component {
    routeConfig = [
        // Visitor Routes
        {
            route: { exact: true, path: '/', component: VisitorHome },
            routeUserRole: 'visitor',
            authRequired: false,
            accessFromAuthenticated: false
        },
        {
            route: { path: '/login', component: VisitorLogIn },
            routeUserRole: 'visitor',
            authRequired: false,
            accessFromAuthenticated: false
        },
        {
            route: { path: '/register', component: VisitorRegister },
            routeUserRole: 'visitor',
            authRequired: false,
            accessFromAuthenticated: false
        },

        // Buyer Routes
        {
            route: { exact: true, path: '/buyer', component: BuyerHome },
            routeUserRole: 'buyer',
            authRequired: true
        },
        {
            route: { path: '/buyer/account', component: BuyerAccount },
            routeUserRole: 'buyer',
            authRequired: true
        },
        {
            route: { path: '/buyer/profile', component: BuyerProfile },
            routeUserRole: 'buyer',
            authRequired: true
        },

        // Seller Routes
        {
            route: { exact: true, path: '/seller', component: SellerHome },
            routeUserRole: 'seller',
            authRequired: true
        },
        {
            route: { path: '/seller/account', component: SellerAccount },
            routeUserRole: 'seller',
            authRequired: true
        },
        {
            route: { path: '/seller/business-profile', component: SellerBusinessProfile },
            routeUserRole: 'seller',
            authRequired: true
        },
    ];
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <React.Fragment>
                <GenerateSwitch routeConfig={this.routeConfig} parentState={this.state.reduxState} />
            </React.Fragment>
        );
    }
}

class GenerateSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.renderHandler = this.renderHandler.bind(this);
    }

    renderHandler(props, routeItem, Component) {
        // Routes with authenticationonly
        // Redirect in other case
        if (routeItem.authRequired) {
            if (!this.state.parentState.user.isAuthenticated) {
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                );
            }

            if (this.state.parentState.user.role !== routeItem.routeUserRole) {
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                );
            }

        } else {
            // Route which require unauthenticated user access
            if (!routeItem.accessFromAuthenticated) {
                if (this.state.parentState.user.isAuthenticated) {
                    return (
                        <Redirect
                            to={{
                                pathname: `/${this.state.parentState.user.role}`,
                                state: { from: props.location }
                            }}
                        />
                    );
                }
            }
        }


        // Routes which don't require authentication
        // and can be accessed by authenticated users too
        return (<Component {...props} />);
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    {this.state.routeConfig.map((routeItem, i) => {
                        let route = Object.assign({}, routeItem.route);
                        delete route.component;

                        return (<Route key={`${routeItem.routeUserRole}_${i}_${routeItem.route.path}`}
                            {...route}
                            render={(props) => this.renderHandler(props, routeItem, routeItem.route.component)}
                        />);
                    })}

                    <Route component={PageNotFound} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Routes;