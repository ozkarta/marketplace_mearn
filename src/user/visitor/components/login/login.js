import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import * as UserActions from '../../actions/user';
import './login.css';


class VisitorLogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
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
        this.state = Object.assign(
                {
                userModel: {
                    email: 'ozbegi1@gmail.com',
                    password: '12qwert12'
                },
                globalError: ''
            }, 
            props
        );
        this.logInButtonHandler = this.logInButtonHandler.bind(this);
        this.inputValueChangeHandler = this.inputValueChangeHandler.bind(this);
    }

    logInButtonHandler(event) {
        this.state.dispatch({type: 'BUSY_INDICATOR', busy: true});
        UserActions.authenticate(this.state.userModel)
            .then(
                action => {
                    this.state.dispatch({type: 'BUSY_INDICATOR', busy: false});
                    this.props.dispatch(action);
                }
            )
            .catch(error => {
                this.setState({globalError: error.msg});
                this.state.dispatch({type: 'BUSY_INDICATOR', busy: false});
            });
        event.preventDefault();    
    }
    
    inputValueChangeHandler(model, value) {
        let userModel = this.state.userModel;
        userModel[model] = value;
        this.setState({userModel: userModel});
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.logInButtonHandler}>
                <div className="login-input-box">
                    <input className="form-control" type="text" placeholder="Email" name="email" 
                            value={this.state.userModel.email}  
                            onChange={(event) => this.inputValueChangeHandler('email', event.target.value)}
                            required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$"/>
                    <div className="login-error-message">

                    </div>
                </div>
                <div className="login-input-box">
                    <input className="form-control" type="password" placeholder="Password" name="password" 
                            value={this.state.userModel.password}  
                            onChange={(event) => this.inputValueChangeHandler('password', event.target.value)}
                            minLength="6" required/>
                    <div className="login-error-message" >

                    </div>
                </div>
                
                <ComponentErrorHandler errorMessage={this.state.globalError}/>
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
                {this.props.errorMessage}
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