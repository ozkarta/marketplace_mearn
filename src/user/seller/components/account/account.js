import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import * as CategoryActions from '../../actions/category';
import './account.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

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
                categories: []
            },
            formStage: 1,
            formStageCount: 3
        }

        this.handleCategorySearch = this.handleCategorySearch.bind(this);
        this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
        this.typeHeadInputChangeHandler = this.typeHeadInputChangeHandler.bind(this);
        this.changeFormStage = this.changeFormStage.bind(this);
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

    render() {
        return (
            
            <div className="container">
                <div className="stepwizard">
                    <div className="stepwizard-row setup-panel">
                        <div className="stepwizard-step">
                            <a type="button" className="btn btn-primary btn-circle" >1</a>
                            <p>Step 1</p>

                        </div>
                        <div className="stepwizard-step">
                            <a type="button" className="btn btn-default btn-circle" >2</a>
                            <p>Step 2</p>

                        </div>
                        <div className="stepwizard-step">
                            <a type="button" className="btn btn-default btn-circle" >3</a>
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
                                            onClick={(event) => this.changeFormStage(1)}>
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

                                            name="businessDisplayName" />
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label">Identification Code</label>
                                        <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Identification Code"

                                            name="identificationCode" />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Registration Code</label>
                                        <input maxLength="200" type="text" required="required" className="form-control" placeholder="Enter Registration"

                                            name="registrationCode" />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Registration Date</label>

                                        <div className="input-group">
                                            <input className="form-control" placeholder="yyyy-mm-dd"
                                                name="registrationDateModel" />
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary" type="button">
                                                    <img src="img/calendar-icon.svg" alt="imagesas" style={{width: '1.2rem', height: '1rem', cursor: 'pointer'}} />
                                                </button>
                                            </div>
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
                                    <button className="btn btn-success btn-lg" type="submit">Finish!</button>
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