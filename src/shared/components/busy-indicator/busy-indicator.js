import React from 'react';
import ReactLoading from 'react-loading';
import {connect} from 'react-redux';
import './busy-indicator.css';

class BusyIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        if (this.props.busyIndicator.isBusy) {
            return (
                <div className="busy-indicator">
                    <ReactLoading type={this.props.type} color={this.props.color} height={this.props.height} width={this.props.width} delay={0} />
                </div>
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