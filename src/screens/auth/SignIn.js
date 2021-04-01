import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { UserContext } from '../../contexts/user'

export default function SignIn(props) {
  const { navigation: { navigate } } = props;
  const { userState: { isLoggedIn }, userDispatch } = useContext(UserContext)

  return (
    <View>
      <Text>Sign In Screen</Text>
      <Text onPress={() => navigate('Home')}>Go to Home</Text>
      <Button
        title={isLoggedIn ? 'Logout' : 'Login'}
        onPress={() => { userDispatch({ type: 'IS_LOGGED_IN', payload: !isLoggedIn }) }}
      />
    </View>
  )
}