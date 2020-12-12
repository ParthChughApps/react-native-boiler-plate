import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '../Layout';
import Bike from './Girls';
import { withTranslation } from 'react-i18next';
import globalStyles from '../Initializing/styles';
import styles from './styles';

function ChooseScreen(props) {
  const {navigation: {navigate}, t, navigation} = props;

  navigation.setOptions({
    title: "Sign Up"
  })

  const buttons = [
    {title: t('Commercial'), onPress: () => navigate('SignUp', {topBar: t('Sign Up'), type: "Commercial"})}, 
    {title: t('Industry'), onPress: () => navigate('SignUp', {topBar: t('Sign Up'), type: "Industry"})},
    {title: t('Personal'), onPress: () => navigate('SignUp', {topBar: t('Sign Up'), type: "Personal"})},
  ]
  return(
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Layout style={{flex: 1}}>  
        <View style={{alignItems: 'center'}}>
          <Bike />
        </View>
        <Text style={{textAlign: 'center', marginBottom: 30}}>{t('User Preferences')}</Text>
        <View style={{alignItems: 'center'}}>
          {
            buttons.map((el, index) => (
              <View key={index} style={{marginBottom: 20}}>
                <TouchableOpacity 
                  style={[globalStyles.fill_button,{width: 166,
                    height: 60,} ] } 
                  onPress={el.onPress}
                >
                  <Text style={globalStyles.fill_button_text }>{el.title}</Text>
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