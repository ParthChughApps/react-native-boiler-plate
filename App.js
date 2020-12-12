import React from 'react';
// import {Platform, Text} from 'react-native';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/store';
// import auth from '@react-native-firebase/auth';
import FlashMessage from "react-native-flash-message";
import AppWithNavigationState from './src/containers/AppNavigator';
import { MenuProvider } from 'react-native-popup-menu';

// if (Platform.OS === 'android') {
//   const oldRender = Text.render;
//   Text.render = function(...args) {
//     const origin = oldRender.call(this, ...args);
//     return React.cloneElement(origin, {
//       style: [{fontFamily: 'Roboto'}, origin.props.style],
//     });
//   };
// }

const App = () => {
  return (
    <MenuProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </MenuProvider>
    
  );
};

export default App;
