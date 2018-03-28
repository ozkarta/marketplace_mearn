import React from 'react';
import { connect } from 'react-redux';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import * as CategoryActions from '../../actions/category';
import * as BusinessActions from '../../actions/business';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './business-profile.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';

// <!--SOURCE   https://bootsnipp.com/snippets/featured/form-wizard-and-validation-->
class SellerBusinessProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            sellerBusinessProfileModel: {
                businessCategories: [],
                registrationDate: moment(),
                businessDisplayName: '',
                identificationCode: '',
                registrationCode: '',
                address: {
                    street: '',
                    city: '',
                    province: '',
                    country: '',
                    zip: ''
                }
            },
            isCreateForm: true,
            globalError: '',
            formStage: 1,
            formStageCount: 4,
            changeFormStage: (value) => {
                let currentStage = this.state.formStage;
                this.setState({ formStage: currentStage + value });
            },
            submitForm: (event) => {
                this.props.dispatch({ type: 'BUSY_INDICATOR', busy: true });
                BusinessActions.createBusinessProfile(this.state.sellerBusinessProfileModel, this.props.user)
                    .then(
                        result => {
                            this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                            this.props.dispatch({ type: 'SELLER_BUSINESS_PROFILE_CREATED', business: result });
                            this.afterFormSubmitAction();
                        }
                    )
                    .catch(error => {
                        console.dir(error);
                        this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                        this.setState({ globalError: error.msg });
                    });
                event.preventDefault();
            },
            handleRegistrationDataChange: (value, field, parent) => {
                let sellerBusinessProfileModel = this.state.sellerBusinessProfileModel;
                if (parent) {
                    sellerBusinessProfileModel[parent][field] = value;
                } else {
                    sellerBusinessProfileModel[field] = value;
                }

                this.setState({ sellerBusinessProfileModel: sellerBusinessProfileModel });
            },
            typeHeadInputChangeHandler: (values) =>{
                let prevState = Object.assign({}, this.state);
                prevState.sellerBusinessProfileModel.businessCategories = values;
                this.setState(prevState);
            }
        }

        this.state.changeFormStage = this.state.changeFormStage.bind(this);
        this.state.submitForm = this.state.submitForm.bind(this);
        this.state.handleRegistrationDataChange = this.state.handleRegistrationDataChange.bind(this);
        this.state.typeHeadInputChangeHandler = this.state.typeHeadInputChangeHandler.bind(this);
        this.afterFormSubmitAction = this.afterFormSubmitAction.bind(this);
    }

    componentDidMount() {
        this.props.dispatch({ type: 'BUSY_INDICATOR', busy: true });
        BusinessActions.getBusinessByUserId(this.props.user._id)
            .then(
                result => {
                    let restoredSellerBusinessProfileModel = Object.assign({}, result);
                    restoredSellerBusinessProfileModel.registrationDate = moment(restoredSellerBusinessProfileModel.registrationDate);
                    this.setState(Object.assign(this.state, { 
                        isCreateForm: false,
                        sellerBusinessProfileModel: restoredSellerBusinessProfileModel,
                        submitForm: (event) => {
                            this.props.dispatch({ type: 'BUSY_INDICATOR', busy: true });
                            BusinessActions.updateBusinessProfile(this.state.sellerBusinessProfileModel)
                                .then(
                                    result => {
                                        this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                                        this.props.dispatch({ type: 'SELLER_BUSINESS_PROFILE_UPDATED', business: result });
                                        this.afterFormSubmitAction();
                                    }
                                )
                                .catch(error => {
                                    console.dir(error);
                                    this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                                    this.setState({ globalError: error.msg });
                                });
                            event.preventDefault();
                        }
                    }));
                    this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                }
            )
            .catch(error => {
                console.dir(error);
                this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
            });
    }

    afterFormSubmitAction() {
        console.log('After Form Submit...');
        let prevState = Object.assign({}, this.state);
        prevState.formStage = 1;
        this.setState(prevState);
    }

    render() {
        return (

            <div className="container">
                <StepWizard {...this.state} />
                <AccountFormComponent {...this.state} />
            </div>
        );
    }
}

class StepWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className="stepwizard">
                <div className="stepwizard-row setup-panel">
                    <div className="stepwizard-step">
                        <a type="button" className={this.props.formStage === 1 ? 'btn btn-primary btn-circle' : 'btn btn-default btn-circle'} >1</a>
                        <p>Step 1</p>

                    </div>
                    <div className="stepwizard-step">
                        <a type="button" className={this.props.formStage === 2 ? 'btn btn-primary btn-circle' : 'btn btn-default btn-circle'} >2</a>
                        <p>Step 2</p>

                    </div>
                    <div className="stepwizard-step">
                        <a type="button" className={this.props.formStage === 3 ? 'btn btn-primary btn-circle' : 'btn btn-default btn-circle'} >3</a>
                        <p>Step 3</p>

                    </div>
                    <div className="stepwizard-step">
                        <a type="button" className={this.props.formStage === 4 ? 'btn btn-primary btn-circle' : 'btn btn-default btn-circle'} >4</a>
                        <p>Step 4</p>

                    </div>
                </div>
            </div>
        );
    }
}

class AccountFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <form>

                {
                    this.props.formStage === 1 &&
                    <Stage1Component {...this.props} />
                }

                {
                    this.props.formStage === 2 &&
                    <Stage2Component {...this.props} />
                }

                {
                    this.props.formStage === 3 &&
                    <Stage3Component {...this.props} />
                }

                {
                    this.props.formStage === 4 &&
                    <FinalStage {...this.props} />
                }

            </form>
        );
    }
}


class Stage1Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            typeHeadOptions: {
                allowNew: false,
                isLoading: false,
                multiple: true,
                options: [],
                minLength: 1,
                placeholder: "Please choose businessCategories.",
                labelKey: (option) => {
                    if (option && option.categoryName && option.categoryName.en) {
                        return option.categoryName.en;
                    }
                    return option;
                },
                filterBy: (option, text) => {
                    for (let i = 0; i < this.state.sellerBusinessProfileModel.businessCategories.length; i++) {
                        let categoryId = this.state.sellerBusinessProfileModel.businessCategories[i]._id;
                        if (categoryId === option._id) {
                            return null;
                        }
                    }
                    return option;
                }
            }
        }

        this.handleCategorySearch = this.handleCategorySearch.bind(this);
        this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
        //this.typeHeadInputChangeHandler = this.typeHeadInputChangeHandler.bind(this);
        this.validatorFunction = this.validatorFunction.bind(this);
    }

    handleCategorySearch(query) {

        let typeHeadOptions = this.state.typeHeadOptions;
        typeHeadOptions.isLoading = true;
        this.setState({ typeHeadOptions: typeHeadOptions });

        CategoryActions.getCategoryList({ categoryName: query, page: 0, size: 10 })
            .then((businessCategories) => {
                let typeHeadOptions = this.state.typeHeadOptions;
                typeHeadOptions.isLoading = false;
                typeHeadOptions.options = businessCategories || [];

                this.setState({ typeHeadOptions: typeHeadOptions });
            })
            .catch((error) => {
                console.dir(error);
            });
    }

    renderMenuItemChildren(option, props) {
        return (
            <p>{option.categoryName.en}</p>
        );
    }

    validatorFunction() {
        return this.props.sellerBusinessProfileModel.businessCategories.length;
    }

    render() {
        return (
            <div className="row setup-content" id="step-1">
                <div className="col-xs-12">
                    <div className="col-md-12">
                        <h3> Choose Business businessCategories</h3>

                        <AsyncTypeahead
                            {...this.state.typeHeadOptions}
                            selected={this.props.sellerBusinessProfileModel.businessCategories}
                            onSearch={this.handleCategorySearch}
                            renderMenuItemChildren={(options, props) => {
                                return this.renderMenuItemChildren(options, props);
                            }}
                            onChange={this.props.typeHeadInputChangeHandler}
                        />

                        <NextButton validatorFunction={this.validatorFunction} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

class Stage2Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;

        this.validatorFunction = this.validatorFunction.bind(this);
    }

    validatorFunction() {
        return true;
    }

    render() {
        return (
            <div className="row setup-content" id="step-2">
                <div className="col-xs-12">
                    <div className="col-md-12">
                        <h3> Step 2</h3>
                        <div className="form-group">
                            <label className="control-label">Business Name</label>
                            <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Business Name"
                                value={this.props.sellerBusinessProfileModel.businessDisplayName}
                                onChange={(event) => {
                                    this.props.handleRegistrationDataChange(event.target.value, 'businessDisplayName');
                                }}
                                name="businessDisplayName" />
                        </div>


                        <div className="form-group">
                            <label className="control-label">Identification Code</label>
                            <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Identification Code"
                                value={this.props.sellerBusinessProfileModel.identificationCode}
                                onChange={(event) => {
                                    this.props.handleRegistrationDataChange(event.target.value, 'identificationCode');
                                }}
                                name="identificationCode" />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Registration Code</label>
                            <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Registration Code"
                                value={this.props.sellerBusinessProfileModel.registrationCode}
                                onChange={(event) => {
                                    this.props.handleRegistrationDataChange(event.target.value, 'registrationCode');
                                }}
                                name="registrationCode" />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Registration Date</label>

                            <div className="input-group">
                                <DatePicker
                                    selected={this.props.sellerBusinessProfileModel.registrationDate}
                                    onChange={(date) => {
                                        this.props.handleRegistrationDataChange(date, 'registrationDate');
                                    }}
                                />
                            </div>

                        </div>


                        <PrevButton {...this.props} />
                        <NextButton validatorFunction={this.validatorFunction} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

class Stage3Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;

        this.validatorFunction = this.validatorFunction.bind(this);
    }

    validatorFunction() {
        return true;
    }

    render() {
        return (
            <div className="row setup-content" id="step-2">
                <div className="col-xs-12">
                    <div className="col-md-12">
                        <h3> Step 3</h3>
                        <div className="form-group">
                            <label className="control-label">Street</label>
                            <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Business Name"
                                value={this.props.sellerBusinessProfileModel.address.street}
                                onChange={(event) => {
                                    this.props.handleRegistrationDataChange(event.target.value, 'street', 'address');
                                }}
                                name="street" />
                        </div>

                        <div className="form-group">
                            <label className="control-label">City</label>
                            <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Business Name"
                                value={this.props.sellerBusinessProfileModel.address.city}
                                onChange={(event) => {
                                    this.props.handleRegistrationDataChange(event.target.value, 'city', 'address');
                                }}
                                name="city" />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Province</label>
                            <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Business Name"
                                value={this.props.sellerBusinessProfileModel.address.province}
                                onChange={(event) => {
                                    this.props.handleRegistrationDataChange(event.target.value, 'province', 'address');
                                }}
                                name="province" />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Country</label>
                            <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Business Name"
                                value={this.props.sellerBusinessProfileModel.address.country}
                                onChange={(event) => {
                                    this.props.handleRegistrationDataChange(event.target.value, 'country', 'address');
                                }}
                                name="country" />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Zip Code</label>
                            <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Business Name"
                                value={this.props.sellerBusinessProfileModel.address.zip}
                                onChange={(event) => {
                                    this.props.handleRegistrationDataChange(event.target.value, 'zip', 'address');
                                }}
                                name="zip" />
                        </div>


                        <PrevButton {...this.props} />
                        <NextButton validatorFunction={this.validatorFunction} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

class FinalStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className="row setup-content" id="step-3">
                <div className="col-xs-12">
                    <div className="col-md-12">
                        <h3> Step 3</h3>

                        <PrevButton {...this.props} />
                        <FinishButton {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}


class PrevButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <button className="btn btn-primary nextBtn btn-lg" type="button"
                onClick={(event) => this.props.changeFormStage(-1)}>
                Previous
            </button>
        );
    }
}

class NextButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <button className="btn btn-primary nextBtn btn-lg" type="button"
                onClick={(event) => this.props.changeFormStage(1)}
                disabled={!this.props.validatorFunction()}>
                Next
            </button>
        );
    }
}

class FinishButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <button className="btn btn-success btn-lg" type="submit" onClick={this.props.submitForm}>{this.props.isCreateForm? 'Create': 'Update'}</button>
        );
    }
}

export default connect(
    (state) => {
        return state.user;
    }
)(SellerBusinessProfile);