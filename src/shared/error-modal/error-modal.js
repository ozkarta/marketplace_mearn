import React from 'react';

class ErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                error: props.error,
                errorInfo: props.errorInfo
        }
    }

    render() {
        return (
            <h1>Error Happend</h1>
        );
    }
}

export default ErrorModal;