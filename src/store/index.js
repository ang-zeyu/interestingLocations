import placesReducer from './reducers/places.js';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({ placesReducer }), composer(applyMiddleware(thunk)));
export default store;
