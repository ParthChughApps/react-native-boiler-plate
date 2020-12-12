import React, {useEffect, useRef, useState} from 'react';
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
import { showMessage, hideMessage } from "react-native-flash-message";
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
// import {NavigationActions, StackActions} from 'react-navigation';
import {CommonActions, StackActions} from '@react-navigation/native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../Layout';
import styles from './styles';

const Initialising = props => {
  Initialising.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    response: PropTypes.object,
    LoginActions: PropTypes.object.isRequired,
  };

  const {
    locale,
    LoginActions: {signInUser},
    navigation: {navigate}, 
    navigation,
    t
  } = props;

  const {control, handleSubmit, errors} = useForm();

  const [visible, updateVisible] = useState(false);
  const [loading, updateLoading] = useState(false)

  const [emailExist, updateEmailExist] = useState(true);

  const callbackFunction = (response, status) => {
    updateLoading(false)
    console.log(response)
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
    }
  }

  const onSubmit = data => {
    updateEmailExist(true);
    updateLoading(true);
    signInUser({data, callbackFunction});
  };

  const navigateToSignUp = () => {
    navigate('SignUp', {topBar: t('Sign up')})
  }

  return (  
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Layout style={{ flex: 1, ...styles.container}}  >            
          <View>
            <Text style={styles.placeholder}>{t('Email Id')}</Text>
            <Controller
              as={<TextInput placeholderTextColor = "#FFFFFF" />}
              control={control}
              rules={{required: true}}
              style={[styles.input]}
              name="email"
              placeholder={t('Email')}
              onChange={args => args[0].nativeEvent.text}
              defaultValue=""
            />
            {!emailExist && <Text style={{color: 'red'}}>{t("Your email or password is Incorrect")}</Text> }
            {errors.email ? (
              <Text style={{color: 'black', marginBottom: 5}}>
                {t('This is required')}
              </Text> 
            ) : <Text style={{marginBottom: 5}} />}
          </View>
          
          <View>
          <Text style={styles.placeholder}>{t('Password')}</Text>
          <Controller
            as={<TextInput placeholderTextColor = "#FFFFFF" secureTextEntry={true} />}
            control={control}
            rules={{required: true}}
            style={[styles.input]}
            name="password"
            type="password"
            placeholder={t('Password')}
            onChange={args => args[0].nativeEvent.text}
            defaultValue=""
          />
          {errors.password ? (
            <Text style={{color: 'black', marginBottom: 5}}>
              {t('This is required')}
            </Text> 
          ) : <Text style={{marginBottom: 5}} />}
          {/* <Text style={{textAlign: 'center', marginTop: 40}}><Text style={{color: 'black'}}>{t("Forgot Password?")} </Text><Text style={{fontWeight: 'bold'}} onPress={() => navigate('ForgetPassword')}>{t("Click here")}</Text></Text> */}
        </View>
          
        </Layout>
      </ScrollView>
      {loading ? 
      <ActivityIndicator style={[styles.submit_btn, styles.submitButton]} />
      :
      <TouchableOpacity
        style={[styles.submit_btn, styles.submitButton]}
        testID="language-chooser-en-btn"
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.txt_sign_up}>
          {t('Login')}
        </Text>
      </TouchableOpacity>
      }
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
)(withTranslation()(Initialising));
