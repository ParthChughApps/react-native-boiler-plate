import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '../Layout';
import Bike from './Bike';
import { withTranslation } from 'react-i18next';
import globalStyles from '../Initializing/styles';
import styles from './styles';

function ChooseScreen(props) {
  const {navigation: {navigate}, t, navigation} = props;
  // 
  navigation.setOptions({
    title: "Welcome to Fuel Gadi"
  })

  const buttons = [
    {title: t('Sign Up'), onPress: () => navigate('ChooseSignUp', {topBar: t('Join Us')})}, 
    {title: t('Login'), onPress: () => navigate('ChooseLogin', {topBar: t('Login')})}]
  return(
    
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Layout style={{flex: 1}}>  
        <View style={{alignItems: 'center'}}>
          <Bike />
        </View>
        <View style={{alignItems: 'center'}}>
          {
            buttons.map((el, index) => (
              <View key={index} style={{marginBottom: 40}}>
                <TouchableOpacity 
                  style={index % 2 === 0 ? globalStyles.fill_button : globalStyles.unfill_button} 
                  onPress={el.onPress}
                >
                  <Text style={index % 2 === 0 ? globalStyles.fill_button_text : globalStyles.unfill_button_text}>{el.title}</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </Layout>
    </ScrollView>
    
  )
}

export default withTranslation()(ChooseScreen)