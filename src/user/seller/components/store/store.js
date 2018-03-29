import React from 'react';
import { connect } from 'react-redux';
import './store.css';

class SellerStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            store: {
                media: [
                    {
                        type: 'file', format: 'jpeg',
                        url: 'https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg'
                    },
                    {
                        type: 'file', format: 'jpeg',
                        url: 'https://i.pinimg.com/originals/d6/92/2f/d6922f02ad13b06356757499eae5831f.jpg'
                    }
                ]
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
            }
        };

        this.state.fileChangedHandler = this.state.fileChangedHandler.bind(this);
        this.state.uploadHandler = this.state.uploadHandler.bind(this);
        this.state.formSubmitHandler = this.state.formSubmitHandler.bind(this);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <form onSubmit={this.state.formSubmitHandler}>
                        <StoreBaseInfoComponent />
                        <StoreAddressComponent />
                        <StoreTermsAndConditionsComponent />
                        
                        <StoreContactInfoComponent />
                        <StoreClassificationComponent />
                        <StoreMediaComponent {...this.state}/>

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
                        <label htmlFor="exampleInputEmail1">Store Title</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />

                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="exampleInputEmail1">Store Friendly ID</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">Friendly ID will be automatically generated. Change it if needed.</small>
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="exampleInputEmail1">Short Description</label>
                        <textarea type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" >
                        </textarea>

                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="exampleInputEmail1">Long Description</label>
                        <textarea type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" >
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
                    <textarea type="email" className="form-control"
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
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="exampleInputEmail1">City</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group col-sm-6">
                        <label htmlFor="exampleInputEmail1">Street</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group col-sm-6">
                        <label htmlFor="exampleInputEmail1">Province</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group col-sm-6">
                        <label htmlFor="exampleInputEmail1">Zip</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
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
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="exampleInputEmail1">Emails</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="exampleInputEmail1">Facebook</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
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
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="exampleInputEmail1">Search Keywords</label>
                        <input type="email" className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group col-sm-12">
                    </div>
            </div>
        );
    }
}

class StoreMediaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }
    
    render() {
        return (
            <div className="col-sm-12">
                <h3>Upload Media</h3>
                <input type="file" className="form-control" onChange={this.props.fileChangedHandler}/>
                {/* <button onClick={this.props.uploadHandler} className="form-control">Upload</button> */}
                
                    {this.state.store.media.map((media, index) => {
                        return (
                            <div className="col-sm-2">
                                <img className="store-image-media" key={index} src={media.url}/>
                            </div>
                        )
                    })}
                
            </div>
        );
    }
}

//___________________________

class StoreProductsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>products</h3>
            </div>
        );
    }
}

class StoreRatingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>rating</h3>
            </div>
        );
    }
}

class StoreSalesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>sales</h3>
            </div>
        );
    }
}

class StoreFeedbackComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>feedback</h3>
            </div>
        );
    }
}

class StoreBusinessComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                <h3>Business(LTD)</h3>
            </div>
        );
    }
}

export default connect(
    state => {
        return { user: state.user }
    }
)(SellerStore);