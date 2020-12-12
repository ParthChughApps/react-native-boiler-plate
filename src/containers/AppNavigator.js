import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {NavigationContainer } from '@react-navigation/native';
import {connect} from 'react-redux';
import Home from '../components/Home';
import Account from '../components/Home/Account';
import AddAddress from '../components/Home/AddAddress';
import ShowPetrolPump from '../components/Home/ShowPetrolPump';
import SelectCart from '../components/Home/SelectCart';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Initializing from '../components/Initializing';
import Login from '../components/Login';
import ChooseScreen from '../components/Login/IntermediateScreen';
import ChooseSignUp from '../components/SignUp/ChooseSignUp';
import ChooseLogin from '../components/Login/ChooseLogin';
import LoginOTP from '../components/Login/LoginOTP';
import SignUp from '../components/SignUp';
import CustomDrawerComponent from './CustomDrawerComponent';

import SingleOrder from '../components/Orders/singleOrder';
// import Exam from '../components/Exam';
import ShowWeb from '../components/ShowWeb';
import Performance from '../components/ProfileDrawer/performance'
import Donate from '../components/ProfileDrawer/donate'
import ManageAccount from '../components/ProfileDrawer/manageAccount'
import ForgetPassword from '../components/Login/ForgetPassword'
import OTPVerify from '../components/Login/OTPVerify'
import UserPreferences from '../components/Initializing/UserPreferences'
import GooglePlacesInput from './CustomSearchPlaces'
import Seller from '../components/Initializing/Seller'
import Orders from '../components/Orders'
import Register from '../components/Login/Register'
import {APP_COLOR} from '../colors';
import PopupMenu from '../components/common/popUpMenu';


const Stack = createStackNavigator();

const ReduxNavigation = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const homeNavigator = () => (
    <Stack.Navigator>
      <>
      <Stack.Screen
        name="Home"
        component={Home}
        // options={options}
      />
      <Stack.Screen
        name="ShowWeb"
        component={ShowWeb}
        // options={options}
      />
      <Stack.Screen
        name="LoginOTP"
        component={LoginOTP}
        // options={options}
      />
      <Stack.Screen
        name="OTPVerify"
        component={OTPVerify}
        // options={options}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        // options={options}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        // options={options}
      />
      <Stack.Screen
        name="SingleOrder"
        component={SingleOrder}
        // options={options}
      />
      </>
    </Stack.Navigator>
  )

  const LoginNavigator = () => (
    <Stack.Navigator>
    <>
      <Stack.Screen
        name="Splash"
        component={Initializing}
        // options={options}
        options={{headerShown: false}} 
      />
      <Stack.Screen
        name="UserPreferences"
        component={UserPreferences}
        // options={options}
      />
      <Stack.Screen
        name="Seller"
        component={Seller}
        // options={options}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        // options={options}
      />
      <Stack.Screen
        name="ChooseScreen"
        component={ChooseScreen}
        // options={options}
      />
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
      <Stack.Screen
        name="ChooseSignUp"
        component={ChooseSignUp}
        // options={options}
      />
      <Stack.Screen
        name="ChooseLogin"
        component={ChooseLogin}
        // options={options}
      />
      <Stack.Screen
        name="LoginOTP"
        component={LoginOTP}
        // options={options}
      />
      <Stack.Screen
        name="OTPVerify"
        component={OTPVerify}
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
          options={{headerShown: false}} 
        />
      </>
    </Stack.Navigator>
  );

  // const ModalScreen = () => (
  //   <Stack.Navigator mode="modal">
  //     <>
  //       <Stack.Screen name="AddAddress" component={AddAddress} />
        
  //     </>
  //   </Stack.Navigator>
  // )
  
  const CustomDrawer = () => (
    <Stack.Navigator
      screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
          opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
      overlayStyle: {
            opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
      }}
      mode="modal">
      <>
        <Stack.Screen name="Home" component={homeNavigator} options={{headerShown: false}} />
        <Stack.Screen name="AddAddress" component={AddAddress}  options={{ headerShown: false }}/>
        <Stack.Screen name="SelectCart" component={SelectCart} options={{ headerShown: false }}/>
        <Stack.Screen name="ShowPetrolPump" component={ShowPetrolPump} />
        <Stack.Screen name="ProfileDrawer" component={CustomDrawerComponent} />
      </>
    </Stack.Navigator>
  )

  const PrimaryNavigator = () => (
    <Stack.Navigator>
      <>
        <Stack.Screen name="Splash" component={LoginNavigator} options={{headerShown: false}}  />
        <Stack.Screen name="Home" component={CustomDrawer} options={{ headerShown: false }}/>
        <Stack.Screen name="GooglePlacesInput" component={GooglePlacesInput} />
      </>
    </Stack.Navigator>
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
    >
      <PrimaryNavigator />
    </NavigationContainer>
  );
};

export default ReduxNavigation;
