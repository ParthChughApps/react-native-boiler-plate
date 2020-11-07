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
import {Button} from 'native-base';
import authFirebase from '@react-native-firebase/auth';
import AnimatedLoader from 'react-native-animated-loader';
import { withTranslation } from 'react-i18next';
import {CommonActions, StackActions} from '@react-navigation/native';
import * as LoginActionCreators from '../../actions/LoginActions';
import background from '../../../assets/background.png'
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
    LoginActions: {updateResponse, isLoggedIn},
    navigation,
    t
  } = props;

  const {control, handleSubmit, errors} = useForm();

  const [visible, updateVisible] = useState(false);

  const [emailExist, updateEmailExist] = useState(true);

  // Handle the button press
  const updateUserDetails = (data) => {
    isLoggedIn(true);
    updateResponse(data);
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
              emailVerified: data.user.emailVerified,
              photoURL: data.user.photoURL,
              uid: data.user.uid,
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
              email: data.user.email,
              emailVerified: data.user.emailVerified,
              photoURL: data.user.photoURL,
              uid: data.user.uid,
            })
            .then(() => {
              updateVisible(false);
            });
        }
      
        navigation.dispatch(
          StackActions.replace('Splash')
        );
      });
  }

  async function signInWithPhoneNumber(email, password) {
    updateVisible(true);
    authFirebase()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        updateUserDetails(data);
        updateVisible(false);
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          
          console.log('That email address is invalid!');
        }
        updateEmailExist(false)
        updateVisible(false);
      });
    
  }

  const {
    navigation: {navigate},
  } = props;

  const onSubmit = data => {
    updateEmailExist(true);
    signInWithPhoneNumber(data.email, data.password);
  };

  const navigateToSignUp = () => {
    navigate('SignUp', {topBar: t('Sign up')})
  }

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
                  {t('Login')}2
                </Text>
                
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.mobileContainer}>
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
                        <Text style={{color: 'red', marginBottom: 5}}>
                          {t('This is required')}
                        </Text> 
                      ) : <Text style={{marginBottom: 5}} />}
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
                      <Text style={{textAlign: 'right'}}>{t("Forgot Password?")} <Text style={{fontWeight: 'bold'}} onPress={() => navigate('ForgetPassword')}>{t("Click here")}</Text></Text>
                      {errors.password ? (
                        <Text style={{color: 'red', marginBottom: 5}}>
                          {t('This is required')}
                        </Text> 
                      ) : <Text style={{marginBottom: 5}} />}
                    </View>
                    
                    <Button
                      style={styles.submit_btn}
                      testID="language-chooser-en-btn"
                      onPress={handleSubmit(onSubmit)}>
                      <Text style={styles.txt_sign_up}>
                        {t('Login')}
                      </Text>
                    </Button>
                  </View>
              </View>
              <View style={{marginTop: 100}}>
                <Text style={{fontSize: 20}}>{t('New Here? ')}<Text style={{fontWeight: 'bold'}} onPress={navigateToSignUp}>{t('Create an account')}</Text></Text>
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
