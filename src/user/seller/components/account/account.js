import React from 'react';
import * as UserActions from '../../actions/user';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class SellerAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            updateUserModel: {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            navigate: null
        };
        
        this.inputValueChangeHandler = this.inputValueChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        this.props.dispatch({ type: 'BUSY_INDICATOR', busy: true });
        UserActions.getUserById(this.state.user._id)
            .then(user => {
                let st = Object.assign({}, this.state);
                st.updateUserModel = Object.assign(st.updateUserModel, user);
                this.setState(st);

                this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
            })
            .catch(error => {
                this.state.dispatch({type: 'BUSY_INDICATOR', busy: false});
                this.setState({globalError: error.msg});
            });
    }

    inputValueChangeHandler(model, value) {
        let userModel = this.state.updateUserModel;
        userModel[model] = value;
        this.setState({ userModel: userModel });
    }

    submitHandler(event) {
        this.state.dispatch({type: 'BUSY_INDICATOR', busy: true});
        UserActions.updateUser(this.state.updateUserModel)
            .then(
                action => {
                    this.state.dispatch({type: 'BUSY_INDICATOR', busy: false});
                    this.props.dispatch(action);
                    let stateCopy = Object.assign({}, this.state);
                    stateCopy.navigate = {
                        to: '/seller',
                        push: true
                    }
                    this.setState(stateCopy);
                }
            )
            .catch(error => {
                this.state.dispatch({type: 'BUSY_INDICATOR', busy: false});
                this.setState({globalError: error.msg});
            });
        event.preventDefault(); 
    }

    render() {
        if (!this.state.updateUserModel) {
            return null;
        }
        return (
            <form className="form-inline" onSubmit={this.submitHandler}>
                
                <ul className="registration-inputs">
                    <li>
                        <p>Email</p>
                        <input className="form-control" type="text" placeholder="Email" name="email" required
                            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$"
                            value={this.state.updateUserModel.email}
                            onChange={(event) => this.inputValueChangeHandler('email', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>

                    <li>
                        <p>Tpe your Password</p>
                        <input className="form-control" type="password" placeholder="Password" name="password" required minLength="6"
                            value={this.state.updateUserModel.password}
                            onChange={(event) => this.inputValueChangeHandler('password', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>

                    <li>
                        <p>First name</p>
                        <input className="form-control" type="text" placeholder="First Name" name="firstName" required
                            value={this.state.updateUserModel.firstName}
                            onChange={(event) => this.inputValueChangeHandler('firstName', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>
                    <li>
                        <p>Last Name</p>
                        <input className="form-control" type="text" placeholder="Last Name" name="lastName" required
                            value={this.state.updateUserModel.lastName}
                            onChange={(event) => this.inputValueChangeHandler('lastName', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>

                    
                    <li>
                        <p>Type new password</p>
                        <input className="form-control" type="password" placeholder="Password" name="newPassword"
                            value={this.state.updateUserModel.newPassword}
                            onChange={(event) => this.inputValueChangeHandler('newPassword', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>
                    <li>
                        <p>Confirm New Password</p>
                        <input className="form-control" type="password" placeholder="Password" name="confirmNewPassword"
                            value={this.state.updateUserModel.confirmNewPassword}
                            onChange={(event) => this.inputValueChangeHandler('confirmNewPassword', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>
                </ul>

                <ComponentErrorHandler errorMessage={this.state.globalError} />
                <button className="btn btn-outline-success submit-registration" type="submit">Update</button>

                {this.state.navigate && <Redirect {...this.state.navigate}/>}
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
            user: state.user.user
        };
    }
)(SellerAccount);