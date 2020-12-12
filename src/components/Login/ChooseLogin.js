import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '../Layout';
import Bike from './MenPhone';
import { withTranslation } from 'react-i18next';
import globalStyles from '../Initializing/styles';
import styles from './styles';

function ChooseScreen(props) {
  const {navigation: {navigate}, t, navigation} = props;

  const buttons = [
    {title: t('Phone'), onPress: () => navigate('LoginOTP', {topBar: t('Login')})}, 
    {title: t('Email-Id'), onPress: () => navigate('Login', {topBar: t('Login')})},
  ]

  navigation.setOptions({
    title: "Choose Login Type"
  })

  return(
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Layout style={{flex: 1}}>  
        <View style={{alignItems: 'center'}}>
          <Bike width={"70%"} height={500}/>
        </View>
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