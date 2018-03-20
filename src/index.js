import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import App from './app';
import './index.css';

import store from './shared/redux-store';



function render() {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();