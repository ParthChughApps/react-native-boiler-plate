import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';

import {NavigationContainer, DarkTheme, DrawerActions } from '@react-navigation/native';
import Home from '../components/Home';
import Solution from '../components/Solution';
import Initializing from '../components/Initializing';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import CustomDrawerComponent from './CustomDrawerComponent';
import ExamPortal from '../components/Exam/ExamPortal';
import AddTest from '../components/Exam/AddTest';
import AddOptions from '../components/Exam/AddOptions';
import Exam from '../components/Exam';
import ShowWeb from '../components/ShowWeb';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import Performance from '../components/ProfileDrawer/performance'
import Donate from '../components/ProfileDrawer/donate'
import ManageAccount from '../components/ProfileDrawer/manageAccount'
import ForgetPassword from '../components/Login/ForgetPassword'
import {TouchableOpacity} from 'react-native-gesture-handler'
import LanguageChooser from '../components/LanguageChooser/LanguageChooser';
import HomeIcon from './Home';
import HomeFocused from './HomeFocused';
import TestsFocused from './TestsFocused';
import TestsIcon from './Tests';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// const ReduxAppNavigator = createAppContainer(PrimaryNavigator, 'root');
const ReduxNavigation = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(255, 45, 85)',
      
      text: 'rgb(255, 255, 255)',
      
    },
  };

  const TabNavigatorStack = ({navigation}) => {
    return (
      <Stack.Navigator>
        <>
          <Stack.Screen
            options={{ headerLeft: () => (
              <Ionicons
                name="navicon"
                size={25}
                style={{padding: 10, color: 'gray'}}
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            ),}}
            name="Home"
            component={TabNavigation}
          />
        </>
      </Stack.Navigator>
    )
  }

  const TabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if(route.name === 'Home') {
              iconName = focused ? <HomeFocused /> : <HomeIcon />
            } else if(route.name === 'Tests') {
              iconName = focused ? <TestsFocused />: <TestsIcon />
            } 
            // You can return any component that you like here!
            return iconName;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'rgb(255, 45, 85)',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Tests" component={ExamPortal} />
      </Tab.Navigator>
    )
  }

  const options = (props) => {
    const {navigation} = props;
    return {
      headerLeft: () => (
        <Ionicons
          name="menu-outline"
          size={25}
          style={{padding: 10, color: 'gray'}}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
            // Do something
          }}
        />
      ),
    }
  }

  const DrawerNavigation = () => (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerComponent {...props} />} >
      <Drawer.Screen name="Home" component={TabNavigatorStack} />
    </Drawer.Navigator>
  );


  const LoginNavigator = () => (
    <Stack.Navigator>
    <>
      <Stack.Screen
        name="Login"
        component={Login}
        // options={options}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        // options={options}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        // options={options}
      />
    </>
  </Stack.Navigator>
    
  )

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
        <Stack.Screen name="Home" component={DrawerNavigation} options={{headerShown: false}} />
        <Stack.Screen name="ShowWeb" component={ShowWeb} />
        <Stack.Screen name="Exam" component={Exam} options={{
          gestureEnabled: false,
        }}/>
        <Stack.Screen name="Donate" component={Donate} />
        <Stack.Screen name="Performance" component={Performance} />
        <Stack.Screen name="ManageAccount" component={ManageAccount} />
        <Stack.Screen name="AddTest" component={AddTest} />
        <Stack.Screen name="AddOptions" component={AddOptions} />
        {/* <Stack.Screen name="CustomDrawerComponent" component={CustomDrawerComponent} /> */}
        <Stack.Screen name="Login" component={LoginNavigator} />
        <Stack.Screen name="Solution" component={Solution} options={{gestureEnabled: false,}} />
      </>
    </Stack.Navigator>
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyTheme}
      onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
    >
      <PrimaryNavigator />
    </NavigationContainer>
  );
};

export default ReduxNavigation;
