import {createStore, combineReducers} from 'redux';
import AuthReducer from './reducers/auth.reducer';


const combinedReducer = combineReducers({
    user: AuthReducer
})

const store = createStore(combinedReducer);

store.subscribe(() => {
    console.log('Fired');
});

export default store;