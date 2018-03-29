import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import './store.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
class SellerStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            store: {
                title: 'Ozkart Store',
                friendlyId: 'ozkart_store',
                shortDescription: 'Short Description of Ozkart Store: this is test trial store...',
                longDescription: 'Long Description of Ozkart Store: this is test trial store...',
                address: [],
                termsAndCondition: '',
                phones:[],
                emails: [],
                facebook: '',
                categories: [],
                keywords: []
            },
            filesToUpload: [],
            fileChangedHandler: (event) => {
                console.log('File change handler');
                this.state.filesToUpload.push(event.target.files[0]);
            },
            uploadHandler: (event) => {
                console.log('Upload Handler...');
                event.preventDefault();
            },
            formSubmitHandler: (event) => {
                console.log('Form Submitted.');
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
            }
        };

        this.state.fileChangedHandler = this.state.fileChangedHandler.bind(this);
        this.state.uploadHandler = this.state.uploadHandler.bind(this);
        this.state.formSubmitHandler = this.state.formSubmitHandler.bind(this);
        this.state.defaultFieldChangeHandler = this.state.defaultFieldChangeHandler.bind(this);
        this.state.storeNameChangeHandler = this.state.storeNameChangeHandler.bind(this);
        this.state.friendlyIdChangeHandler = this.state.friendlyIdChangeHandler.bind(this);
    }

    generateFriendlyId(stringValue) {
        let result = stringValue.toLowerCase();
        result = result.replace(/\ /g, '-');
        result = result.replace(/\./g, '-');
        result = result.replace(/\,/g, '-');

        return result;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <form onSubmit={this.state.formSubmitHandler}>
                        <StoreBaseInfoComponent {...this.state}/>
                        <StoreAddressComponent {...this.state}/>
                        <StoreTermsAndConditionsComponent {...this.state}/>
                        <StoreContactInfoComponent {...this.state}/>
                        <StoreClassificationComponent {...this.state}/>

                        <div className="col-sm-12">
                            <hr/>
                            <button type="submit" className="form-control" value="Create Store">Create/Update Store</button>
                        </div>
                    </form>
                </div>
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
                            onChange={(event) => {this.props.storeNameChangeHandler(event.target.value)}}
                            placeholder="Enter Store title." />

                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="friendlyId">Store Friendly ID</label>
                        <input type="text" className="form-control"
                            id="friendlyId"
                            value={this.props.store.friendlyId}          
                            onChange={(event) => {this.props.friendlyIdChangeHandler(event.target.value)}}                  
                            placeholder="Enter Friendly Id" />
                        <small id="emailHelp" className="form-text text-muted">Friendly ID will be automatically generated. Change it if needed.</small>
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="shortDescription">Short Description</label>
                        <textarea type="text" className="form-control"
                            id="shortDescription"
                            value={this.props.store.shortDescription}
                            onChange={(event) => {this.props.defaultFieldChangeHandler(event.target.value, 'shortDescription')}}
                            placeholder="Enter Short Description" >
                        </textarea>

                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="longDescription">Long Description</label>
                        <textarea type="text" className="form-control"
                            id="longDescription"
                            value={this.props.store.longDescription}
                            onChange={(event) => {this.props.defaultFieldChangeHandler(event.target.value, 'longDescription')}}
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
                    <label htmlFor="exampleInputEmail1">Terms and Conditions</label>
                    <textarea type="text" className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email" >
                    </textarea>
                </div>
            </div>
        );
    }
}

class StoreAddressComponent extends React.Component { // Array
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>Address</h3>
                <div className="raw">

                    <div className="form-group col-sm-12">
                        <label htmlFor="exampleInputEmail1">Country</label>
                        <input type="text" className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter email" />
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
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>Contact Info</h3>
                <div className="raw">
                    <div className="form-group col-sm-12">
                        <label htmlFor="exampleInputEmail1">Phones</label>
                        <input type="text" className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter email" />
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
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>Classification</h3>

                    <div className="form-group col-sm-12">
                        <label htmlFor="exampleInputEmail1">Categories</label>
                        <input type="text" className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group col-sm-12">
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
        return { user: state.user }
    }
)(SellerStore);