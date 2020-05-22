import React from 'react';
import { Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawerComponent from './CustomDrawerComponent';
import {connect} from 'react-redux';
import Home from '../components/Home';
import SingleVideo from '../components/SingleVideo';
import Initializing from '../components/Initializing';
import styles from './styles';

const getRouteTitle = route => {
  return route;
};

const getRoute = navigation => {
  let route = navigation.state.routeName;
  let headingGiven = false;
  if (navigation.state.routes) {
    route = navigation.state.routes[navigation.state.index].routeName;
  }

  if (
    typeof navigation.state.params !== 'undefined' &&
    typeof navigation.state.params.topBar !== 'undefined'
  ) {
    route = navigation.state.params.topBar;
    headingGiven = true;
  }
  return {route, headingGiven};
};

const homeNavigator = createStackNavigator(
  {
    Home,
    SingleVideo
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const {route, headingGiven} = getRoute(navigation);
      return {
        headerTitle: headingGiven ? route : getRouteTitle(route),
        headerStyle: {
          backgroundColor: '#EAEAEA',
        },
        headerLeft: navigation.state.routeName === 'Home' && (
          <View style={styles.headerLeft}>
            <Icon
              onPress={() => navigation.toggleDrawer()}
              style={styles.padding10}
              name="bars"
              size={30}
            />
          </View>
        ),
      };
    },
  },
);

export const DrawerNavigation = createDrawerNavigator(
  {
    Home: {
      screen: homeNavigator,
    }
  },
  {
    contentComponent: props => <CustomDrawerComponent {...props} />,
    drawerWidth: Dimensions.get('window').width,
    drawerType: 'push-screen',
  },
);

export const AppNavigator = createStackNavigator(
  {
    Splash: {screen: Initializing},
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const {route, headingGiven} = getRoute(navigation);
      return {
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        },
        headerStyle: {
          backgroundColor: '#EAEAEA',
        },
        headerTitle: headingGiven ? route : getRouteTitle(route),
        fontWeight: 'bold',
      };
    },
  },
);

export const PrimaryNavigator = createStackNavigator(
  {
    Splash: {screen: AppNavigator},
    Home: DrawerNavigation,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

const ReduxAppNavigator = createAppContainer(PrimaryNavigator, 'root');
const ReduxNavigation = props => {
  const {dispatch, state} = props;

  return [<ReduxAppNavigator dispatch={dispatch} state={state} key="app" />];
};

const mapStateToProps = state => ({
  state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation);
export default AppWithNavigationState;
