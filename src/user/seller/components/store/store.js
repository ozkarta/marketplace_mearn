import React from 'react';

class SellerStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <form>
                        <StoreBaseInfoComponent/>
                        <StoreTermsAndConditionsComponent/>
                        <StoreAddressComponent/>
                        <StoreContactInfoComponent/>
                        <StoreClassificationComponent/>
                        <StoreMediaComponent/>
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
                <h3>Base Info</h3>
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
            <div className="col-sm-6">
                <h3>Terms and Conditions</h3>
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
            <div className="col-sm-6">
                <h3>Media</h3>
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

export default SellerStore;