import React from 'react';
import ReactLoading from 'react-loading';
import {connect} from 'react-redux';

class BusyIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        console.dir(this.props);
    }

    render() {
        if (this.props.busyIndicator.isBusy) {
            return (
                <ReactLoading type={this.props.type} color={this.props.color} height={this.props.height} width={this.props.width} delay="0" />
            );
        } else {
            return null;
        }
        
    }
}

export default connect(
    (state) => {
        return {
            busyIndicator: state.busyIndicator
        };
    }
)(BusyIndicator)