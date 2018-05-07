import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as CategoryActions from '../../actions/category';
import * as _ from 'lodash';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import * as StoreActions from '../../actions/store';
import './store.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
class SellerStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            // store: {
            //     title: 'Ozkart Store',
            //     friendlyId: 'ozkart_store',
            //     shortDescription: 'Short Description of Ozkart Store: this is test trial store...',
            //     longDescription: 'Long Description of Ozkart Store: this is test trial store...',
            //     address: [
            //         {
            //             country: { countryName: 'Georgia', countryCode: 'GE' },
            //             city: 'Tbilisi',
            //             street: 'Tashkenti st 25',
            //             province: '',
            //             zip: '0160'
            //         },
            //         {
            //             country: { countryName: 'Georgia', countryCode: 'GE' },
            //             city: 'Tbilisi',
            //             street: 'Tashkenti st 28',
            //             province: '',
            //             zip: '0160'
            //         }
            //     ],
            //     termsAndCondition: 'Terms and conditions for the store. :)))',
            //     phones: ['568208075', '598260802'],
            //     emails: ['ozbegi1@gmail.com', 'ozbegi2@gmail.com'],
            //     facebook: 'https://www.facebook.com/ozz.kart',
            //     keywords: ['oz', 'kart', 'oz_kart_store', 'ozkart_store'],
            //     categories: [
            //         {
            //             "_id": "5ab923111508535b9fc57b3c",
            //             "categoryName": {
            //                 "_id": "5ab923111508535b9fc57b3d",
            //                 "en": "kids toys and games",
            //                 "ge": "kids toys and games"
            //             },
            //             "friendlyId": {
            //                 "_id": "5ab923111508535b9fc57b3e",
            //                 "en": "kids_toys_and_games",
            //                 "ge": "kids_toys_and_games"
            //             },
            //             "parentCategory": "5ab923111508535b9fc57b39"
            //         },
            //         {
            //             "_id": "5ab923111508535b9fc57b3f",
            //             "categoryName": {
            //                 "_id": "5ab923111508535b9fc57b40",
            //                 "en": "baby kids",
            //                 "ge": "baby kids"
            //             },
            //             "friendlyId": {
            //                 "_id": "5ab923111508535b9fc57b41",
            //                 "en": "baby_kids",
            //                 "ge": "baby_kids"
            //             },
            //             "parentCategory": "5ab923111508535b9fc57b39"
            //         }
            //     ]
            // },

            store: {
                title: '',
                friendlyId: '',
                shortDescription: '',
                longDescription: '',
                address: [],
                termsAndCondition: '',
                phones: [],
                emails: [],
                facebook: '',
                keywords: [],
                categories: []
            },

            isCreateForm: true,
            filesToUpload: [],
            fileChangedHandler: (event) => {
                this.state.filesToUpload.push(event.target.files[0]);
            },
            uploadHandler: (event) => {
                event.preventDefault();
            },
            formSubmitHandler: (event) => {
                this.props.dispatch({ type: 'BUSY_INDICATOR', busy: true });
                StoreActions.createStore(this.state.store, this.props.user.user, this.props.user.user.business)
                    .then(result => {
                        this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                        this.afterFormSubmitAction();
                    })
                    .catch(error => {
                        console.dir(error);
                        this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                        this.setState({ globalError: error.msg });
                    });
                event.preventDefault();
            },
            defaultFieldChangeHandler: (value, address) => {
                let stateCP = Object.assign({}, this.state);
                _.set(stateCP, `store.${address}`, value);
                this.setState(stateCP);
            },
            storeNameChangeHandler: (value) => {
                let stateCP = Object.assign({}, this.state);
                stateCP.store.title = value;
                stateCP.store.friendlyId = this.generateFriendlyId(value);
                this.setState(stateCP);
            },
            friendlyIdChangeHandler: (value) => {
                let stateCP = Object.assign({}, this.state);
                stateCP.store.friendlyId = this.generateFriendlyId(value);
                this.setState(stateCP);
            },
            addAddressClickHandler: (address) => {
                let stateCP = Object.assign({}, this.state);
                stateCP.store.address.push(address);
                this.setState(stateCP);
            },
            categoryTypeHeadInputChangeHandler: (values) => {
                let stateCP = Object.assign({}, this.state);
                stateCP.store.categories = values;
                this.setState(stateCP);
            }
        };

        this.state.fileChangedHandler = this.state.fileChangedHandler.bind(this);
        this.state.uploadHandler = this.state.uploadHandler.bind(this);
        this.state.formSubmitHandler = this.state.formSubmitHandler.bind(this);
        this.state.defaultFieldChangeHandler = this.state.defaultFieldChangeHandler.bind(this);
        this.state.storeNameChangeHandler = this.state.storeNameChangeHandler.bind(this);
        this.state.friendlyIdChangeHandler = this.state.friendlyIdChangeHandler.bind(this);
        this.state.addAddressClickHandler = this.state.addAddressClickHandler.bind(this);
        this.state.categoryTypeHeadInputChangeHandler = this.state.categoryTypeHeadInputChangeHandler.bind(this);
        this.afterFormSubmitAction = this.afterFormSubmitAction.bind(this);
    }

    componentDidMount() {
        console.log('Mounting...');
        this.props.dispatch({ type: 'BUSY_INDICATOR', busy: true });
        StoreActions.getBusinessByUserId(this.props.user._id)
            .then(result => {
                if (result) {
                    this.setState(Object.assign(this.state, { 
                        isCreateForm: false,
                        store: result,
                        formSubmitHandler: (event) => {
                            this.props.dispatch({ type: 'BUSY_INDICATOR', busy: true });
                            StoreActions.updateStore(this.state.store)
                                .then(result => {
                                    this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                                    this.afterFormSubmitAction();
                                })
                                .catch(error => {
                                    console.dir(error);
                                    this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
                                    this.setState({ globalError: error.msg });
                                });
                            event.preventDefault();
                        }
                    }));
                }
                this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
            })
            .catch(error => {
                console.dir(error);
                this.props.dispatch({ type: 'BUSY_INDICATOR', busy: false });
            });
    }

    generateFriendlyId(stringValue) {
        let result = stringValue.toLowerCase();
        result = result.replace(/ /g, '-');
        result = result.replace(/\./g, '-');
        result = result.replace(/,/g, '-');

        return result;
    }

    afterFormSubmitAction() {
        let stateCP = Object.assign({}, this.state);
        stateCP.navigate = {
            to: '/seller',
            push: true
        };
        this.setState(stateCP);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <form onSubmit={this.state.formSubmitHandler}>
                        <StoreBaseInfoComponent {...this.state} />
                        <StoreAddressViewComponent {...this.state} />
                        <StoreTermsAndConditionsComponent {...this.state} />
                        <StoreContactInfoComponent {...this.state} />
                        <StoreClassificationComponent {...this.state} />

                        <div className="col-sm-12">
                            <hr />
                            <button type="submit" className="form-control" value="Create Store">{this.props.isCreateForm? 'Create' : 'Update'}</button>
                        </div>
                    </form>
                </div>

                {this.state.navigate && <Redirect {...this.state.navigate} />}
            </div>
        );
    }
}
// title, friendlyId ...
class StoreBaseInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>Basic Info</h3>
                <div className="raw">
                    <div className="form-group col-sm-6">
                        <label htmlFor="title">Store Title</label>
                        <input type="text" className="form-control"
                            id="title"
                            value={this.props.store.title}
                            onChange={(event) => { this.props.storeNameChangeHandler(event.target.value) }}
                            placeholder="Enter Store title." />

                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="friendlyId">Store Friendly ID</label>
                        <input type="text" className="form-control"
                            id="friendlyId"
                            value={this.props.store.friendlyId}
                            onChange={(event) => { this.props.friendlyIdChangeHandler(event.target.value) }}
                            placeholder="Enter Friendly Id" />
                        <small id="emailHelp" className="form-text text-muted">Friendly ID will be automatically generated. Change it if needed.</small>
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="shortDescription">Short Description</label>
                        <textarea type="text" className="form-control"
                            id="shortDescription"
                            value={this.props.store.shortDescription}
                            onChange={(event) => { this.props.defaultFieldChangeHandler(event.target.value, 'shortDescription') }}
                            placeholder="Enter Short Description" >
                        </textarea>

                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="longDescription">Long Description</label>
                        <textarea type="text" className="form-control"
                            id="longDescription"
                            value={this.props.store.longDescription}
                            onChange={(event) => { this.props.defaultFieldChangeHandler(event.target.value, 'longDescription') }}
                            placeholder="Enter Long Description" >
                        </textarea>

                    </div>
                </div>
            </div>
        );
    }
}

class StoreTermsAndConditionsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-12">

                <h3>Terms and Conditions</h3>
                <div className="form-group col-sm-12">
                    <label htmlFor="termsAndCondition">Terms and Conditions</label>
                    <textarea type="text" className="form-control"
                        id="termsAndCondition"
                        aria-describedby="emailHelp"
                        value={this.props.store.termsAndCondition}
                        onChange={(event) => { this.props.defaultFieldChangeHandler(event.target.value, 'termsAndCondition') }}
                        placeholder="Enter email" >
                    </textarea>
                </div>
            </div>
        );
    }
}

class StoreAddressViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            showAddScreen: false,
            stagingAddAddressClickHandler: (address) => {
                this.addNewAddressClickHandler();
                this.props.addAddressClickHandler(address);
            }
        }
        this.addNewAddressClickHandler = this.addNewAddressClickHandler.bind(this);
        this.state.stagingAddAddressClickHandler = this.state.stagingAddAddressClickHandler.bind(this);
    }

    addNewAddressClickHandler(event) {
        let stateCP = Object.assign({}, this.state);
        stateCP.showAddScreen = !stateCP.showAddScreen;
        this.setState(stateCP);
        // We want to use this function not only for button click!!!
        if (event) {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>Address Render</h3>
                {
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>City</th>
                                <th>Street</th>
                                <th>Province</th>
                                <th>ZIP</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.store.address.map((address, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{address.country.countryName}</td>
                                            <td>{address.city}</td>
                                            <td>{address.street}</td>
                                            <td>{address.province}</td>
                                            <td>{address.zip}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                }
                {
                    this.state.showAddScreen &&
                    <StoreAddressFormComponent {...this.state} />
                }

                {
                    !this.state.showAddScreen &&
                    <button onClick={this.addNewAddressClickHandler}> Add New Address</button>
                }

            </div>
        );
    }
}

class StoreAddressFormComponent extends React.Component { // Array
    _cityTypehead = null;
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            countries: [
                {
                    countryName: 'Georgia', countryCode: 'GE', cities: [
                        'Tbilisi', 'Kutaisi', 'Tchiatura', 'Bolnisi', 'Gori', 'Batumi', 'Kobuleti'
                    ]
                },
                { countryName: 'Armenia', countryCode: 'AR' },
                { countryName: 'Turky', countryCode: 'TK' },
            ],
            cityOptions: [],
            addressModel: {
                street: '',
                city: '',
                country: '',
                province: '',
                zip: ''
            }
        }

        this.countryTypeheadInputChange = this.countryTypeheadInputChange.bind(this);
        this.addAddressClickHandler = this.addAddressClickHandler.bind(this);
    }

    countryTypeheadInputChange(value, path) {
        let stateCP = Object.assign({}, this.state);
        let valueCP = value ? Object.assign({}, value) : '';
        if (valueCP) {
            delete valueCP.cities;
        }

        _.set(stateCP, path, valueCP);
        this._cityTypehead.getInstance().clear();

        if (value && value.cities) {
            stateCP.cityOptions = value.cities;
        } else {
            stateCP.cityOptions = [];
        }
        this.setState(stateCP);
    }

    defaultInputChangeHandler(value, path) {
        let stateCP = Object.assign({}, this.state);
        _.set(stateCP, path, value || '');
        this.setState(stateCP);
    }

    addAddressClickHandler(event) {
        this.props.stagingAddAddressClickHandler(this.state.addressModel);
        event.preventDefault();
    }

    render() {
        return (
            <div className="col-sm-12">
                <h3>Address</h3>
                <div className="raw">

                    <div className="form-group col-sm-12">
                        <label htmlFor="address-country">Country</label>

                        <Typeahead
                            id="address-country"
                            labelKey="countryName"
                            multiple={false}
                            options={this.state.countries}
                            placeholder="Choose a Country..."
                            onChange={(values) => this.countryTypeheadInputChange(values[0], 'addressModel.country')}
                        />
                    </div>

                    <div className="form-group col-sm-6">
                        <label htmlFor="city">City</label>

                        <Typeahead
                            id="city"
                            multiple={false}
                            value={this.state.addressModel.city}
                            options={this.state.cityOptions}
                            placeholder="Choose a Country..."
                            ref={(ref) => this._cityTypehead = ref}
                            onChange={(values) => this.defaultInputChangeHandler(values[0], 'addressModel.city')}
                        />
                    </div>

                    <div className="form-group col-sm-6">
                        <label htmlFor="street">Street</label>

                        <input type="text" className="form-control"
                            id="street"
                            value={this.state.addressModel.street}
                            onChange={(event) => this.defaultInputChangeHandler(event.target.value, 'addressModel.street')}
                            placeholder="Enter Street" />
                    </div>

                    <div className="form-group col-sm-6">
                        <label htmlFor="province">Province</label>

                        <input type="text" className="form-control"
                            id="province"
                            value={this.state.addressModel.province}
                            onChange={(event) => this.defaultInputChangeHandler(event.target.value, 'addressModel.province')}
                            placeholder="Enter Province" />
                    </div>

                    <div className="form-group col-sm-6">
                        <label htmlFor="zip">ZIP</label>

                        <input type="text" className="form-control"
                            id="zip"
                            value={this.state.addressModel.zip}
                            onChange={(event) => this.defaultInputChangeHandler(event.target.value, 'addressModel.zip')}
                            placeholder="Enter ZIP" />
                    </div>

                    <div className="form-group col-sm">
                        <button className="form-control" value="Add Address" onClick={this.addAddressClickHandler}>Add Address</button>
                    </div>

                </div>
            </div>
        );
    }
}

// email, phone, facebook ...
class StoreContactInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
        this.phoneTypeheadChangeHandler = this.phoneTypeheadChangeHandler.bind(this);
        this.emailTypeheadChangeHandler = this.emailTypeheadChangeHandler.bind(this);
    }

    phoneTypeheadChangeHandler(values) {
        let parsed = values.map(val => val ? (val.label && (typeof val.label === 'string') ? val.label : val) : null);
        this.props.defaultFieldChangeHandler(parsed, 'phones')
    }

    emailTypeheadChangeHandler(values) {
        let parsed = values.map(val => val ? (val.label && (typeof val.label === 'string') ? val.label : val) : null);
        this.props.defaultFieldChangeHandler(parsed, 'emails')
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>Contact Info</h3>
                <div className="raw">
                    <div className="form-group col-sm-12">
                        <label htmlFor="phones">Phones</label>
                        <Typeahead
                            id="phones"
                            selected={this.props.store.phones}
                            multiple={true}
                            allowNew={true}
                            options={[]}
                            newSelectionPrefix="New Phone: "
                            placeholder="Add Phone..."
                            selectHintOnEnter={true}
                            onChange={(values) => { this.phoneTypeheadChangeHandler(values) }}
                        />
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="emails">Emails</label>
                        <Typeahead
                            id="emails"
                            selected={this.props.store.emails}
                            multiple={true}
                            allowNew={true}
                            options={[]}
                            newSelectionPrefix="New EMAIL: "
                            placeholder="Add EMAIL..."
                            onChange={(values) => { this.emailTypeheadChangeHandler(values) }}
                        />
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="facebook">Facebook</label>
                        <input type="text" className="form-control"
                            id="facebook"
                            value={this.props.store.facebook}
                            onChange={(event) => { this.props.defaultFieldChangeHandler(event.target.value, 'facebook') }}
                            placeholder="Enter Store Facebook." />

                    </div>
                </div>
            </div>
        );
    }
}

// Categories, keywords...
class StoreClassificationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            categoryTypeHeadOptions: {
                allowNew: false,
                isLoading: false,
                multiple: true,
                options: [],
                minLength: 1,
                placeholder: "Please choose Store Categories.",
                labelKey: (option) => {
                    if (option && option.categoryName && option.categoryName.en) {
                        return option.categoryName.en;
                    }
                    return option;
                },
                filterBy: (option, text) => {
                    for (let i = 0; i < this.props.store.categories.length; i++) {
                        let categoryId = this.props.store.categories[i]._id;
                        if (categoryId === option._id) {
                            return null;
                        }
                    }
                    return option;
                }
            }
        }

        this.handleCategorySearch = this.handleCategorySearch.bind(this);

        this.state.categoryTypeHeadOptions.filterBy = this.state.categoryTypeHeadOptions.filterBy.bind(this);
        this.state.categoryTypeHeadOptions.labelKey = this.state.categoryTypeHeadOptions.labelKey.bind(this);
        this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
        this.keywordsTypeheadChangeHandler = this.keywordsTypeheadChangeHandler.bind(this);
    }

    handleCategorySearch(query) {

        let categoryTypeHeadOptions = this.state.categoryTypeHeadOptions;
        categoryTypeHeadOptions.isLoading = true;
        this.setState({ categoryTypeHeadOptions: categoryTypeHeadOptions });

        CategoryActions.getCategoryList({ categoryName: query, page: 0, size: 10 })
            .then((categories) => {
                let categoryTypeHeadOptions = this.state.categoryTypeHeadOptions;
                categoryTypeHeadOptions.isLoading = false;
                categoryTypeHeadOptions.options = categories || [];

                this.setState({ categoryTypeHeadOptions: categoryTypeHeadOptions });
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

    keywordsTypeheadChangeHandler(values) {
        let parsed = values.map(val => val ? (val.label && (typeof val.label === 'string') ? val.label : val) : null);
        this.props.defaultFieldChangeHandler(parsed, 'keywords')
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>Classification</h3>

                <div className="form-group col-sm-12">
                    <label htmlFor="exampleInputEmail1">Categories</label>
                    <AsyncTypeahead
                        {...this.state.categoryTypeHeadOptions}
                        selected={this.props.store.categories}
                        onSearch={this.handleCategorySearch}
                        renderMenuItemChildren={(options, props) => {
                            return this.renderMenuItemChildren(options, props);
                        }}
                        onChange={this.props.categoryTypeHeadInputChangeHandler}
                    />
                </div>

                <div className="form-group col-sm-12">
                    <label htmlFor="emails">Keywords</label>
                    <Typeahead
                        id="emails"
                        selected={this.props.store.keywords}
                        multiple={true}
                        allowNew={true}
                        options={[]}
                        newSelectionPrefix="Keywords: "
                        placeholder="Add keyword..."
                        onChange={(values) => { this.keywordsTypeheadChangeHandler(values) }}
                    />
                </div>
            </div>
        );
    }
}

// class StoreMediaComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ...props
//         }
//     }

//     render() {
//         return (
//             <div className="col-sm-12">
//                 <h3>Upload Store Logo</h3>
//                 <input type="file" className="form-control" onChange={this.props.fileChangedHandler} multiple/>
//                 {/* <button onClick={this.props.uploadHandler} className="form-control">Upload</button> */}

//                     {this.state.store.media.map((media, index) => {
//                         return (
//                             <div className="col-sm-2">
//                                 <img className="store-image-media" key={index} src={media.url}/>
//                             </div>
//                         )
//                     })}

//             </div>
//         );
//     }
// }

//___________________________

// class StoreProductsComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ...props
//         }
//     }

//     render() {
//         return (
//             <div className="col-sm-6">
//                 <h3>products</h3>
//             </div>
//         );
//     }
// }

// class StoreRatingComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ...props
//         }
//     }

//     render() {
//         return (
//             <div className="col-sm-6">
//                 <h3>rating</h3>
//             </div>
//         );
//     }
// }

// class StoreSalesComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ...props
//         }
//     }

//     render() {
//         return (
//             <div className="col-sm-6">
//                 <h3>sales</h3>
//             </div>
//         );
//     }
// }

// class StoreFeedbackComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ...props
//         }
//     }

//     render() {
//         return (
//             <div className="col-sm-6">
//                 <h3>feedback</h3>
//             </div>
//         );
//     }
// }

// class StoreBusinessComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ...props
//         }
//     }

//     render() {
//         return (
//             <div className="col-sm-6">
//                 <h3>Business(LTD)</h3>
//             </div>
//         );
//     }
// }

export default connect(
    state => {
        return state.user;
    }
)(SellerStore);