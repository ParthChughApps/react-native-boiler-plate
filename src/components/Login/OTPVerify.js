import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import { showMessage, hideMessage } from "react-native-flash-message";
// import {NavigationActions, StackActions} from 'react-navigation';
import {CommonActions, StackActions} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {bindActionCreators} from 'redux';
import {APP_COLOR} from '../../colors'

import {connect} from 'react-redux';
import Layout from '../Layout';
import styles from './styles';

const LoginOTP = props => {
  LoginOTP.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    response: PropTypes.object,
    LoginActions: PropTypes.object.isRequired,
  };

  const [code, updateCode] = useState('');
  const [loading, updateLoading] = useState(false)
  const {
    locale,
    LoginActions: {verifyOtp, signInPhone},
    route: {params: {phoneNumber, response}},
    navigation,
    t
  } = props;

  navigation.setOptions({
    title: "Enter OTP"
  })

  const callbackFunction = (response, status, data) => {
    updateLoading(false)
    if(status === 200 ) {
      showMessage({
        message: response.message,
        type: "success",
      });
      navigation.dispatch(
        StackActions.replace('Home')
      );
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   key: null,
      //   actions: [
      //     NavigationActions.navigate({
      //       routeName: 'Home',
      //     }),
      //   ],
      // });
      
      // navigation.dispatch(resetAction);
      
    } else {
      showMessage({
        message: response.error || '',
        type: "danger",
      });
      updateCode('')
    }
  }

  useEffect(() => {
    if(code.split('').length === 6) {
      updateLoading(true);
      verifyOtp({data: {
        otp: code,
        otp_secret: response.user.otp_secret
      }, callbackFunction})
    }
  },[code])



  const resendOtp = (response, status,) => {
    if(status === 200 ) {
      showMessage({
        message: response.message,
        type: "success",
      });
      updateCode('')
    } else {
      showMessage({
        message: response.error || '',
        type: "danger",
      });
      updateCode('')
    }
  }
  return (  
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Layout style={{ marginBottom: 120, ...styles.container}}  >            
          <Text style={{color: 'black'}}>{`We Have Sent an OTP to +91 ${phoneNumber}`}</Text>
          <OTPInputView
              style={{width: '80%', height: 200,}}
              pinCount={6}
              code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged = {code1 => { updateCode(code1)}}
              autoFocusOnLoad
              codeInputFieldStyle={{...styles.underlineStyleBase, color: 'black' }}
              codeInputHighlightStyle={{...styles.underlineStyleHighLighted,color: 'black'}}
              // onCodeFilled = {(code1 => {
              //   updateCode(code1)
              //   // navigate('ProfileDrawer')
              // })}
          />
          <Text 
          onPress={() => signInPhone({data: {mobile: phoneNumber}, callbackFunction: resendOtp}) }
          style={{color: 'black'}}>
            {`Didn't receive the code?`} <Text style={{color: APP_COLOR, fontWeight: 'bold'}} 
          >{t('Resend Now')}</Text></Text>
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
