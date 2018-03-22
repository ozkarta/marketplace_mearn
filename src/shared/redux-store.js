import {createStore, combineReducers} from 'redux';
import AuthReducer from './reducers/auth.reducer';


const combinedReducer = combineReducers({
    user: AuthReducer
})

const store = createStore(combinedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log('Fired');
});

export default store;