import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {APP_COLOR} from '../../colors';
import Bike from './MenPhone'
import { showMessage, hideMessage } from "react-native-flash-message";
import globalStyles from '../Initializing/styles'

import { PLACEHOLDER_COLOR} from '../../colors'
import Layout from '../Layout';
import {CheckBox} from 'native-base';
import styles from './styles';

const LoginOTP = props => {
  LoginOTP.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    response: PropTypes.object,
    LoginActions: PropTypes.object.isRequired,
  };

  const {
    locale,
    LoginActions: {signInPhone},
    route: {params},
    t, navigation
  } = props;

  navigation.setOptions({
    title: "Login with OTP"
  })


  const {control, handleSubmit, errors} = useForm();
  const [termsAndConditions, updateTermsAndConditions] = useState(false)
  const [defualtMobile, updateDefaultMobile] = useState('')

  

  const [loading, updateLoading] = useState(false)

  const [emailExist, updateEmailExist] = useState('');

  const {
    navigation: {navigate},
  } = props;

  const callbackFunction = (response, status, data) => {
    console.log(response)
    updateLoading(false)
    if(status === 200 ) {
      showMessage({
        message: response.message,
        type: "success",
      });
      navigate('OTPVerify', {topBar: t('Enter Verification Code'), phoneNumber: data.mobile || params.mobile, response});
    } else {
      showMessage({
        message: response.error || '',
        type: "danger",
      });

    }
  }

  const onSubmit = data => {
    updateLoading(true)
    signInPhone({data, callbackFunction})
    // signInWithPhoneNumber(data.email, data.password);
  };
  console.log(params.disabled)

  return (  
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Layout style={{ marginBottom: 120, ...styles.container}}  >            
          <Text style={{fontSize: 21, color: 'black', fontWeight: 'bold', marginBottom: 10}}>{t('Get started')}</Text>
          <Text style={{fontSize: 10, color: 'black',paddingHorizontal: 100, textAlign: 'center'}}>{t('Enter your phone number and we will send an "OTP" to continue')}</Text>
          <View style={{marginTop: 60,}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Text style={styles.initials}>+91</Text>
              <View>
                <Text style={styles.placeholder}>{t('Phone Number')}</Text>
                <Controller
                  as={<TextInput placeholderTextColor = "#FFFFFF" keyboardType="number-pad" editable={params.disabled ? !params.disabled : true } />}
                  control={control}       
                  rules={{required: true, minLength: 8}}
                  style={[styles.input]}
                  name="mobile"
                  onChange={args => args[0].nativeEvent.text}
                  defaultValue={params && params.mobile}
                />
              </View>
              
            </View>
            
            {errors.mobile ? (
              <Text style={{color: 'black', marginBottom: 5}}>
                {t('This is required')}
              </Text> 
            ) : <Text style={{marginBottom: 5}} />}
          </View>
          <View style={{alignItems: 'center'}}>
            {loading ? 
            <ActivityIndicator style={globalStyles.fill_button} /> : 
            <TouchableOpacity
              style={globalStyles.fill_button}
              testID="language-chooser-en-btn"
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={globalStyles.fill_button_text}>
                {t('Send OTP')}
              </Text>
            </TouchableOpacity>
            }
        
        </View>        
        {!params.disabled &&
        <>
        <View style={{flexDirection: 'row', marginVertical: 30}}>
          <View style={{backgroundColor: PLACEHOLDER_COLOR, height: 2, flex: 1, alignSelf: 'center',marginLeft: 20,}} />
          <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 14, color: PLACEHOLDER_COLOR }}>OR</Text>
          <View style={{backgroundColor: PLACEHOLDER_COLOR, height: 2, flex: 1, alignSelf: 'center',marginRight: 20}} />
        </View>
        <TouchableOpacity
          style={[globalStyles.unfill_button,{
            width: "80%", 
            alignItems: 'flex-start',
            paddingLeft: 30,
            marginBottom: 40
            }] }
          testID="language-chooser-en-btn"
          onPress={() => {navigate('Login', {topBar: t('Sign Up')})}}
        >
          <View style={{flexDirection: 'row', alignItems: 'center', }}>
            <Icon name="envelope-o" size={30} style={{marginRight: 10, textAlign: 'center'}} />
            <Text style={{color: 'black',paddingLeft: 20}}>
              {t('Continue with Email')}
            </Text>
          </View>
        </TouchableOpacity>
        </>
        }
        
        <View style={{marginTop: 20, }}>
          <Bike width={197} height={166} />
        </View>
        
        </Layout>
        
      </ScrollView>
     
      
    </View>

);
};


const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  const response = state.auth.get('response');
  return {locale, response};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(LoginOTP));
