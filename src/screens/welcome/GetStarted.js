import React, { useContext } from 'react';
import { UserContext } from '../../contexts/user'
import {View, Text, Colors, Button, Typography} from 'react-native-ui-lib';

import {GetStarted} from '../../assets/svgs'

export default function GetStartedView(props) {
  const {navigation: {navigate}, route} = props;
  const { userDispatch } = useContext(UserContext)
  const buttons = [{id: 1, name: "Student"}, {id: 2, name: "Parent"}, {id: 3, name: "Demo"}]
  return (
    <View>
      <GetStarted />
      <View style={{alignItems: 'center'}}>
        {buttons.map((el) => (
          <Button
            id={el.id}      
            outline
            label={el.name}
            style={{width: 140}}
            outlineColor={Colors.baseColor}
            color={Colors.baseColor}
            margin-10
            onPress={() => {
              userDispatch({type: "LOGIN_TYPE", payload: el.name})
              navigate('authentication', {params: el.name})
            }}
          />
        ))}
      </View>
    </View>
  )
}