import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../components/Home';
import SingleVideo from '../components/SingleVideo';
import Initializing from '../components/Initializing';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const ReduxAppNavigator = createAppContainer(PrimaryNavigator, 'root');
const ReduxNavigation = () => {
  const DrawerNavigation = () => (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );

  const AppNavigator = () => (
    <Stack.Navigator>
      <>
        <Stack.Screen
          name="Splash"
          component={Initializing}
          // options={options}
        />
      </>
    </Stack.Navigator>
  );

  const PrimaryNavigator = () => (
    <Stack.Navigator>
      <>
        <Stack.Screen name="Splash" component={AppNavigator} />
        <Stack.Screen name="Home" component={DrawerNavigation} />
        <Stack.Screen name="SingleVideo" component={SingleVideo} />
      </>
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <PrimaryNavigator />
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation);
export default AppWithNavigationState;
