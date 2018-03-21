import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import * as LoginActions from '../../actions/login';
import './login.css';


class VisitorLogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="log-in">
                <div className="login-container">
                    <h4>Log In</h4>
                    
                    <InputForm {...this.props}/>

                    <span>or</span>
                    
                    <Link className="registration" to="/register" >Register</Link>

                </div>
            </div>

        );
    }
}

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.logInButtonHandler = this.logInButtonHandler.bind(this);
    }

    logInButtonHandler(event) {
        let action = LoginActions.logInUser('seller', {}, true);
        this.props.dispatch(action);
        event.preventDefault();
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.logInButtonHandler}>
                <div className="login-input-box">
                    <input className="form-control" type="text" placeholder="Email" name="email"  required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$"/>
                    <div className="login-error-message">

                    </div>
                </div>
                <div className="login-input-box">
                    <input className="form-control" type="password" placeholder="Password" name="password"  minLength="6" required/>
                    <div className="login-error-message" >

                    </div>
                </div>
                
                <ComponentErrorHandler/>
                <button className="signin-button" type="submit" name="button"> Sign In</button>
            </form>
        );
    }
}

class ComponentErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div >
                {this.state.errorMessage}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            user: state.user
        };
    }
)(VisitorLogIn)