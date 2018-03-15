import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <h1>Buyer Profile</h1>
        );
    }
}

export default Profile;