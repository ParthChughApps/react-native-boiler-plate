import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import background from '../../../assets/background.png'
import {Button} from 'native-base';
import { withTranslation } from 'react-i18next';
import authFirebase from '@react-native-firebase/auth';
import AnimatedLoader from 'react-native-animated-loader';

import {CommonActions, StackActions} from '@react-navigation/native';
import * as LoginActionCreators from '../../actions/LoginActions';
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
    LoginActions: { isLoggedIn, updateResponse},
    navigation,
    t
  } = props;


  const updateUserDetails = (data, name) => {
    isLoggedIn(true);
    updateResponse(data);
    isLoggedIn(true);
    firestore()
      .collection('Users')
      .doc(data.user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          firestore()
            .collection('Users')
            .doc(data.user.uid)
            .update({
              client: 'excelegal-client-app',
              metaData: data.user.metadata,
              phoneNumber: data.user.phoneNumber,
              email: data.user.email,
              name: name,
              emailVerified: data.user.emailVerified,
              photoURL: data.user.photoURL,
              uid: data.user.uid,
              internships: []
            })
            .then(() => {
              updateVisible(false);
              
            });
        } else {
          firestore()
            .collection('Users')
            .doc(data.user.uid)
            .set({
              client: 'excelegal-client-app',
              metaData: data.user.metadata,
              phoneNumber: data.user.phoneNumber,
              name: name,
              email: data.user.email,
              emailVerified: data.user.emailVerified,
              photoURL: data.user.photoURL,
              uid: data.user.uid,
              internships: []
            })
            .then(() => {
              updateVisible(false);
            });
        }
        const resetAction = StackActions.reset({
          index: 0,
          key: null,
          actions: [CommonActions.navigate({routeName: 'Splash'})],
        });  
        navigation.dispatch(resetAction);
      });
  }


  const {control, handleSubmit, errors, watch} = useForm();

  const [visible, updateVisible] = useState(false);
  const [emailExist, updateEmailExist] = useState(false);

  const [confirm, setConfirm] = useState(null);

  // Handle the button press

  async function signInWithPhoneNumber(email, password, name) {
    updateVisible(true);
    
    authFirebase()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        updateUserDetails(data, name)
        
        // updateVisible(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          
          updateEmailExist(true)
        }

        if (error.code === 'auth/invalid-email') {
          
        }

        updateVisible(false);
      });
    
  }

  const {
    navigation: {navigate},
  } = props;

  const onSubmit = data => {
    updateEmailExist(false)
    signInWithPhoneNumber(data.email, data.password, data.name);
  };

  return (
    <Layout>
      <View>
        <AnimatedLoader
          visible={visible}
          source={require('../Initializing/loader.json')}
          animationStyle={styles.lottie}
          speed={1}
        />
      </View>
      
      <ImageBackground source={background} style={styles.imageBackground}>
        
          <ScrollView style={styles.overlay}>
            <View style={styles.container}>
            
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{marginTop: 100, marginBottom: 50, fontSize: 25, fontWeight: 'bold'}}>
                  {t('Create an account')}
                </Text>
              
                <View style={{alignItems: 'center'}}>
                  <View style={styles.mobileContainer}>
                    <Controller
                      as={<TextInput placeholderTextColor = "#FFFFFF" />}
                      control={control}
                      rules={{required: true}}
                      style={[styles.input]}
                      name="name"
                      placeholder={t('Name')}
                      onChange={args => args[0].nativeEvent.text}
                      defaultValue=""
                    />
                    {errors.name ? (
                        <Text style={{color: 'red', marginBottom: 5}}>
                          {t('This is required')}
                        </Text> 
                      ) : <Text style={{marginBottom: 5}} />}
                    <Controller
                      as={<TextInput placeholderTextColor = "#FFFFFF" />}
                      control={control}
                      rules={{required: true,  pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("Invalid email address")
                      }}}
                      style={[styles.input]}
                      name="email"
                      placeholder={t('Email')}
                      onChange={args => args[0].nativeEvent.text}
                      defaultValue=""
                    />
                    {emailExist && <Text style={{color: 'red'}}>{t('Email Already Exists')}</Text> }
                    {errors.email ? (
                        <Text style={{color: 'red', marginBottom: 5}}>
                          {errors.email.message || t('This is required') } 
                        </Text> 
                      ) : <Text style={{marginBottom: 5}} />}
                    <Controller                      
                      as={<TextInput  secureTextEntry={true} 
                      placeholderTextColor = "#FFFFFF" />}
                      control={control}
                      rules={{required: true, minLength: 6}}
                      style={[styles.input]}
                      name="password"
                      placeholder={t('Password')}
                      onChange={args => args[0].nativeEvent.text}
                      defaultValue=""
                    />
                    {errors.password ? (
                        <Text style={{color: 'red', marginBottom: 5}}>
                          {t('Password should be of 6 characters')}
                        </Text> 
                      ) : <Text style={{marginBottom: 5}} />}
                    <Controller
                      as={<TextInput  secureTextEntry={true} placeholderTextColor = "#FFFFFF" />}
                      control={control}
                      rules={{
                        required: true,
                        validate: value => value === watch('password')}}
                      style={[styles.input]}
                      name="confirmPassword"
                      
                      placeholder={t('Confirm Password')}
                      onChange={args => args[0].nativeEvent.text}
                      defaultValue=""
                    />
                    {errors.confirmPassword ? (
                      <Text style={{color: 'red', marginBottom: 5}}>
                        {t("Passwords didn't match")}
                      </Text> 
                    ) : <Text style={{marginBottom: 5}} />}
                  </View>
                  
                  <Button
                    style={styles.submit_btn}
                    testID="language-chooser-en-btn"
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.txt_sign_up}>
                      {t('Sign up')}
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
    </Layout>
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
