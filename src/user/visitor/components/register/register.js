import React from 'react';
import './register.css';

class VisitorRegister extends React.Component {
    switchRoleDefaultClasses = 'btn btn-default ng-not-empty ng-valid ng-valid-required ng-touched ng-pristine';
    constructor(props) {
        super(props);
        this.state = Object.assign(
            {
                userModel: {
                    type: 'buyer',
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                globalError: '',
                registrationType: {
                    seller: {
                        active: false
                    },
                    buyer: {
                        active: true
                    }
                }
            },
            props
        );
        this.inputValueChangeHandler = this.inputValueChangeHandler.bind(this);
        this.setUserType = this.setUserType.bind(this);
    }

    setUserType(type) {
        let oldUserModel = this.state.userModel;
        oldUserModel.type = type;
        
        this.setState({userModel: oldUserModel});
    }

    inputValueChangeHandler(model, value) {
        let userModel = this.state.userModel;
        userModel[model] = value;
        this.setState({ userModel: userModel });
    }

    render() {
        return (
            <form className="form-inline">
                <div className="text-center m-md-bottom">
                    <h4 className="text-center m-sm-bottom">I want to:</h4>
                    <div className="btn-group">
                        <button className={this.state.userModel.type === 'buyer'?  this.switchRoleDefaultClasses + ' active' : this.switchRoleDefaultClasses}
                                type="button" name="flowSwitchBtn"
                                onClick={() => this.setUserType('buyer')}>
                            <span className="hidden-xs">Buy Products</span>
                            <span className="hidden-lg hidden-md hidden-sm">Hire</span>
                        </button>
                        <button className={this.state.userModel.type === 'seller'?  this.switchRoleDefaultClasses + ' active' : this.switchRoleDefaultClasses} 
                                type="button"  name="flowSwitchBtn"
                                onClick={() => this.setUserType('seller')}>
                            <span className="hidden-xs">Sell Products</span>
                            <span className="hidden-lg hidden-md hidden-sm">Work</span>
                        </button>
                    </div>
                    <span className="o-signup-form-errors  text-left ng-hide">
                        <span className="ng-inactive">
                        </span>
                    </span>
                </div>

                <ul className="registration-inputs">
                    <li>
                        <p>Email</p>
                        <input className="form-control" type="text" placeholder="Email" name="email" required
                            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$"
                            value={this.state.userModel.email}
                            onChange={(event) => this.inputValueChangeHandler('email', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>

                    <li>

                    </li>

                    <li>
                        <p>First name</p>
                        <input className="form-control" type="text" placeholder="First Name" name="firstName" required
                            value={this.state.userModel.firstName}
                            onChange={(event) => this.inputValueChangeHandler('firstName', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>
                    <li>
                        <p>Last Name</p>
                        <input className="form-control" type="text" placeholder="Last Name" name="lastName" required
                            value={this.state.userModel.lastName}
                            onChange={(event) => this.inputValueChangeHandler('lastName', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>

                    <li>
                        <p>Password</p>
                        <input className="form-control" type="password" placeholder="Password" name="password" required minLength="6"
                            value={this.state.userModel.password}
                            onChange={(event) => this.inputValueChangeHandler('password', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>
                    <li>
                        <p>Confirm Password</p>
                        <input className="form-control" type="password" placeholder="Password" name="confirmPassword" required minLength="6"
                            value={this.state.userModel.confirmPassword}
                            onChange={(event) => this.inputValueChangeHandler('confirmPassword', event.target.value)} />
                        <div className="registration-error">

                        </div>
                    </li>
                </ul>
                <button className="btn btn-outline-success submit-registration" type="submit">Submit</button>
            </form>
        );
    }
}

export default VisitorRegister;