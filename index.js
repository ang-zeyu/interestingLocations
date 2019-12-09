import { Navigation } from "react-native-navigation";
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/index';

import Auth from './src/components/Auth.js';
import AddPlace from './src/components/AddPlace';
import PlaceList from './src/components/List';
import PlaceDetail from './src/components/PlaceDetail';
import LeftMenu from './src/components/LeftMenu';
import SignUp from './src/components/SignUp';

import { goToAuth } from './src/navigation.js';

Navigation.registerComponent('addPlace', () => (props) => <Provider store={store}><AddPlace {...props}/></Provider>);
Navigation.registerComponent('viewPlaces', () => (props) => <Provider store={store}><PlaceList {...props}/></Provider>);
Navigation.registerComponent('viewPlaceDetail', () => (props) => <Provider store={store}><PlaceDetail {...props}/></Provider>);
Navigation.registerComponent('authScreen', () => (props) => <Provider store={store}><Auth {...props} /></Provider>);
Navigation.registerComponent('signUpScreen', () => (props) => <SignUp {...props} />)
Navigation.registerComponent('leftMenu', () => LeftMenu);

Navigation.events().registerAppLaunchedListener(() => {
    goToAuth();
});
