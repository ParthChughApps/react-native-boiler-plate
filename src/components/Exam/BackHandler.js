import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Dialog from '../CustomDialog';
import useAndroidHardwareBackDisabled from '../../useAndroidHardwareBackDisabled';
import Ionicons from 'react-native-vector-icons/FontAwesome';


export default function BackHandler({navigation}) {
  const [backButtonDialogVisible, setBackButtonDialogVisible] = useState(false);
  
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={()=> setBackButtonDialogVisible(true)}>
        <Ionicons name={"arrow-circle-left"} size={30} color={"white"} style={{paddingLeft: 20}} />
      </TouchableOpacity>
    )
  })

  useAndroidHardwareBackDisabled(() => {
    setBackButtonDialogVisible(true);
    return true;
  })

  return (
    <Dialog
      heading={"Oops"}
      title={'Back action is disabled here'}
      negativeButtonVisible={false}
      buttonText={'Ok'}
      negativeButtonVisible={false}
      isVisible={backButtonDialogVisible}
      onReject={()=> setBackButtonDialogVisible(false)}
      onAccept={() => {
        setBackButtonDialogVisible(false);
      }
      }
    />
  )

}