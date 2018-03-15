import React from 'react';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <h1>Buyer Account</h1>
        );
    }
}

export default Account;