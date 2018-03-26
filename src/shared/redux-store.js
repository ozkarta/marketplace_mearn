import {createStore, combineReducers} from 'redux';
import UserReducer from './reducers/user.reducer';

const combinedReducer = combineReducers({
    user: UserReducer
});

const store = createStore(combinedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log('Fired');
});

export default store;