import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import * as CategoryActions from '../../actions/category';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './account.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';

// <!--SOURCE   https://bootsnipp.com/snippets/featured/form-wizard-and-validation-->
class SellerAccount extends React.Component {
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
                placeholder: "Please choose categories.",
                labelKey: (option) => {
                    return option.categoryName.en;
                },
                filterBy: (option, text) => {
                    for (let i=0; i<this.state.sellerAccountModel.categories.length; i++) {
                        let categoryId = this.state.sellerAccountModel.categories[i]._id;
                        if (categoryId === option._id) {
                            return null;
                        }
                    }
                    return option;
                }
            },
            sellerAccountModel: {
                categories: [],
                registrationDate: moment(),
                businessName: '',
                identificationCode: '',
                registrationCode: '',

            },
            formStage: 1,
            formStageCount: 3
        }

        this.handleCategorySearch = this.handleCategorySearch.bind(this);
        this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
        this.typeHeadInputChangeHandler = this.typeHeadInputChangeHandler.bind(this);
        this.changeFormStage = this.changeFormStage.bind(this);
        this.handleRegistrationDateChange = this.handleRegistrationDateChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    typeHeadInputChangeHandler(values) {
        let sellerAccountModel = this.state.sellerAccountModel;
        sellerAccountModel.categories = values;
        this.setState({sellerAccountModel: sellerAccountModel});
    }
    
    handleCategorySearch(query) {

        let typeHeadOptions = this.state.typeHeadOptions;
        typeHeadOptions.isLoading = true;
        this.setState({typeHeadOptions: typeHeadOptions});

        CategoryActions.getCategoryList({categoryName: query, page: 0, size: 10})
            .then((categories) => {
                let typeHeadOptions = this.state.typeHeadOptions;
                typeHeadOptions.isLoading = false;
                typeHeadOptions.options = categories || [];

                this.setState({typeHeadOptions: typeHeadOptions});
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

    changeFormStage(value) {
        let currentStage = this.state.formStage;
        let formStageCount = this.state.formStageCount;
        if (value > 0) {
            if ((currentStage + value) <=  formStageCount) {
                this.setState({formStage: currentStage + value})
            }
        }

        if (value < 0) {
            if ((currentStage + value) >= 1) {
                this.setState({formStage: currentStage + value})
            }
        }

    }

    handleRegistrationDateChange(value, field) {
        let sellerAccountModel = this.state.sellerAccountModel;
        sellerAccountModel[field] = value;
        this.setState({sellerAccountModel: sellerAccountModel});
    }

    submitForm(event) {
        console.dir(this.state.sellerAccountModel);
        event.preventDefault();
    }

    render() {
        return (
            
            <div className="container">
                <div className="stepwizard">
                    <div className="stepwizard-row setup-panel">
                        <div className="stepwizard-step">
                            <a type="button" className={this.state.formStage === 1? 'btn btn-primary btn-circle': 'btn btn-default btn-circle'} >1</a>
                            <p>Step 1</p>

                        </div>
                        <div className="stepwizard-step">
                            <a type="button" className={this.state.formStage === 2? 'btn btn-primary btn-circle': 'btn btn-default btn-circle'} >2</a>
                            <p>Step 2</p>

                        </div>
                        <div className="stepwizard-step">
                            <a type="button" className={this.state.formStage === 3? 'btn btn-primary btn-circle': 'btn btn-default btn-circle'} >3</a>
                            <p>Step 3</p>

                        </div>
                    </div>
                </div>
                <form>

                    {   
                        this.state.formStage === 1 && 
                        <div className="row setup-content" id="step-1">
                            <div className="col-xs-12">
                                <div className="col-md-12">
                                    <h3> Choose Business Categories</h3>

                                    <AsyncTypeahead 
                                        {...this.state.typeHeadOptions}
                                        selected={this.state.sellerAccountModel.categories}
                                        onSearch={this.handleCategorySearch}
                                        renderMenuItemChildren={(options, props) => {
                                            return this.renderMenuItemChildren(options, props);
                                        }}
                                        onChange={this.typeHeadInputChangeHandler}
                                    />

                                    
                                    <button className="btn btn-primary nextBtn btn-lg" type="button" 
                                            onClick={(event) => this.changeFormStage(1)}
                                            disabled={!this.state.sellerAccountModel.categories.length}>
                                            Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        this.state.formStage === 2 &&
                        <div className="row setup-content" id="step-2">
                            <div className="col-xs-12">
                                <div className="col-md-12">
                                    <h3> Step 2</h3>
                                    <div className="form-group">
                                        <label className="control-label">Business Name</label>
                                        <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Business Name"
                                            value={this.state.sellerAccountModel.businessName}
                                            onChange={(event) => {
                                                this.handleRegistrationDateChange(event.target.value, 'businessName');
                                            }}
                                            name="businessDisplayName" />
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label">Identification Code</label>
                                        <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Identification Code"
                                            value={this.state.sellerAccountModel.identificationCode}
                                            onChange={(event) => {
                                                this.handleRegistrationDateChange(event.target.value, 'identificationCode');
                                            }}
                                            name="identificationCode" />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Registration Code</label>
                                        <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Registration Code"
                                        value={this.state.sellerAccountModel.registrationCode}
                                            onChange={(event) => {
                                                this.handleRegistrationDateChange(event.target.value, 'registrationCode');
                                            }}
                                            name="registrationCode" />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Registration Date</label>

                                        <div className="input-group">
                                            <DatePicker
                                                selected={this.state.sellerAccountModel.registrationDate}
                                                onChange={(date) => {
                                                    this.handleRegistrationDateChange(date, 'registrationDate');
                                                }}
                                            />
                                        </div>

                                    </div>


                                    <button className="btn btn-primary nextBtn btn-lg" type="button"
                                            onClick={(event) => this.changeFormStage(-1)}>
                                        Previous
                                    </button>
                                    <button className="btn btn-primary nextBtn btn-lg" type="button" 
                                            onClick={(event) => this.changeFormStage(1)}>
                                            Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        this.state.formStage === 3 &&
                        <div className="row setup-content" id="step-3">
                            <div className="col-xs-12">
                                <div className="col-md-12">
                                    <h3> Step 3</h3>

                                    <button className="btn btn-primary nextBtn btn-lg" type="button"
                                            onClick={(event) => this.changeFormStage(-1)}>
                                        Previous
                                    </button>
                                    <button className="btn btn-success btn-lg" type="submit" onClick={this.submitForm}>Finish!</button>
                                </div>
                            </div>
                        </div>
                    }

                </form>
            </div>
        );
    }
}

export default SellerAccount;