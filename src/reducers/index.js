import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

import {AppNavigator} from '../containers/AppNavigator';

const navReducer = createNavigationReducer(AppNavigator);
export const rootReducer = combineReducers({
  nav: navReducer,
});
