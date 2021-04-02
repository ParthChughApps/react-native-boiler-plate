import React, { useContext, createRef } from 'react';
import { StatusBar, TextInput, StyleSheet } from 'react-native';
import {View, Text, Colors, Button, Incubator, Typography} from 'react-native-ui-lib';
import { UserContext } from '../../contexts/user'
import { Login } from '../../assets/svgs'

const {TextField} = Incubator;

export default function SignIn(props) {
  const { navigation: { navigate }, route, navigation } = props;
  const phoneNumber = React.createRef(<TextInput />)
  const { userState: { isLoggedIn, loginType }, userDispatch } = useContext(UserContext)
  navigation.setOptions({
    title: loginType + ' Login'
  });
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor="#25385d" />
      <View style={styles.container}>
        <TextField 
          ref={phoneNumber} 
          label={`${loginType} Number`} 
          placeholder="Enter phone number" 
          floatingPlaceholder
          floatingPlaceholderColor={{
            focus: Colors.baseColor,
            default: Colors.baseColor
          }}
          floatingPlaceholderStyle={Typography.text70}
          style={Typography.text70}
          containerStyle={styles.input}
          fieldStyle={styles.withUnderline}
        />
        <Button
          backgroundColor={Colors.baseColor}
          label={isLoggedIn ? 'Logout' : 'Login'}
          color={Colors.white}
          margin-10
          onPress={() => {
            userDispatch({ type: 'IS_LOGGED_IN', payload: !isLoggedIn })
            navigate('Home')
          }}
        />
      </View>
      <View style={{justifyContent: 'flex-end', flex: 1 }}>
        <Login width={250} height={250}  />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.grey40,
    paddingBottom: 4
  },
  input: {
    // flex: 1, 
    marginHorizontal: 15, 
    marginBottom: 10
  },
  container: {
    justifyContent: 'center', 
    flex: 1, 
    marginTop:20
  }
});