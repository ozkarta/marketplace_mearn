import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './app';
import BusyIndicator from './shared/components/busy-indicator/busy-indicator';
import './index.css';

import store from './shared/redux-store';
import axios from 'axios';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <React.Fragment>
                <App/>
                <BusyIndicator color="#000000" type="spin"/>
            </React.Fragment>
        </Provider>,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();