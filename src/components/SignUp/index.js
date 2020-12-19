import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import AnimatedLoader from 'react-native-animated-loader';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';
import {APP_COLOR} from '../../colors';
import Layout from '../Layout';
import {CheckBox, Radio} from 'native-base';
import { showMessage, hideMessage } from "react-native-flash-message";
import styles from './styles';

const SignUp = props => {
  SignUp.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    response: PropTypes.object,
    LoginActions: PropTypes.object.isRequired,
  };

  const {
    locale,
    LoginActions: {updateResponse, isLoggedIn, signUpUser},
    route: {params},
    t,
    navigation
  } = props;

  navigation.setOptions({
    title: params.type
  })

  const {control, handleSubmit, errors} = useForm();
  const [termsAndConditions, updateTermsAndConditions] = useState(false)

  const [visible, updateVisible] = useState(false);
  
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const [message, updateMessage] = useState({bool: false, text: ''});

  const {
    navigation: {navigate},
  } = props;

  const callbackFunction = (json) => {
    updateVisible(false);
    if(json["error"]) {
      // updateMessage({bool: true, text: json["error"]});
      showMessage({
        message: json["error"],
        type: "danger",
      });
    } else {
      navigate('LoginOTP', {mobile: json.user.phone_number})
    }
  }
  const onSubmit = data => {
    // updateMessage({bool: false, text: ''});
    if(vehicleTypes.length > 0 && termsAndConditions) {
      updateVisible(true);
      data['type'] = params.type;
      data['vehicleTypes'] = vehicleTypes
      signUpUser({data, callbackFunction})
    }
    
  };

  const navigateToSignUp = () => {
    navigate('SignUp', {topBar: t('Sign up'),})
  }

  // useEffect(() => {
  //   signUpUser({data: {
  //     "email": "1newRAn2dom1@a1sdsa.com", 
  //     "gst_number": "22AABCU9603R1ZX", 
  //     "name": "Parth", 
  //     "password": "password", 
  //     "phone_number": "11221312232", 
  //     "vehicle": "2"
  //   },
  //   callbackFunction})
  // },[])

  const updateVehicleTypes = (data) => {
    if(vehicleTypes.includes(data)) {
      console.log(data);
      const index = vehicleTypes.indexOf(data);
      setVehicleTypes(vehicleTypes.filter((e, itemIndex) => itemIndex !== index))
    } else {
      setVehicleTypes(vehicleTypes.concat(data))
    }
  }

  const items = [
    {text: t('4 wheeler'), logo: require('./assets/car.png')},
    {text: t('2 wheeler'), logo: require('./assets/motorcycle.png')},
    {text: t('generator'), logo: require('./assets/generator.png')},
    {text: t('truck'), logo: require('./assets/truck.png')},
  ]

  return (  
    <View style={{flex: 1, backgroundColor: 'white'}}>
       <AnimatedLoader
        visible={visible}
        source={require('../Initializing/loader.json')}
        animationStyle={styles.lottie}
        speed={1}
      />
      <ScrollView  style={{flex: 1, marginTop: 50}}>
      <Layout style={{ flex: 1, ...styles.container, marginBottom: 40}}>
          <View style={{flex: 1}}>
            <Text style={styles.placeholder}>{t(params.type)} {t('Name')}</Text>
            <Controller
              as={<TextInput placeholderTextColor = "#FFFFFF" />}
              control={control}
              rules={{required: true}}
              style={[styles.input]}
              name="name"
              onChange={args => args[0].nativeEvent.text}
              defaultValue=""
            />
            {errors.name ? (
              <Text style={{color: 'black', marginBottom: 5}}>
                {t('This is required')}
              </Text> 
            ) : <Text style={{marginBottom: 5}} />}
          </View>
          <View>
            <Text style={styles.placeholder}>{t('Email-Id')}</Text>
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
              onChange={args => args[0].nativeEvent.text}
              defaultValue=""
            />
            {errors.password ? (
              <Text style={{color: 'black', marginBottom: 5}}>
                {t('This is required')}
              </Text> 
            ) : <Text style={{marginBottom: 5}} />}
        </View>
        <View>
          <Text style={styles.placeholder}>{t('Phone number')}</Text>
          <Controller
            as={<TextInput placeholderTextColor = "#FFFFFF"  />}
            control={control}
            rules={{required: true}}
            style={[styles.input]}
            name="phone_number"
            type="phone_number"
            onChange={args => args[0].nativeEvent.text}
            defaultValue=""
          />
          {errors.phone_number ? (
            <Text style={{color: 'black', marginBottom: 5}}>
              {t('This is required')}
            </Text> 
          ) : <Text style={{marginBottom: 5}} />}
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={styles.placeholder}>{t('Vehicle Type')}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {items.map((el, index) => (
              <TouchableOpacity key={index} onPress={() =>{
                updateVehicleTypes(el.text)
              }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={el.logo}
                    style={styles.logo}
                  />
                  <CheckBox 
                    color={APP_COLOR} 
                    onPress={() => updateVehicleTypes(el.text)}
                    checked={vehicleTypes.includes(el.text)}
                    style={{marginRight: 10, borderRadius: 5}} 
                  /> 
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {vehicleTypes.length === 0 ? (
            <Text style={{color: 'black', marginBottom: 5}}>
              {t('This is required')}
            </Text> 
          ) : <Text style={{marginBottom: 5}} />}
        </View>
        <View>
          <Text style={styles.placeholder}>{t('GST Number')}</Text>
          <Controller
              as={<TextInput  autoCapitalize="characters"/>}
              control={control}
              rules={{
                required: params.type !== 'Personal', 
                 pattern: {
                  value: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/i,
                } 
              }}
              style={[styles.input]}
              name="gst_number"
              type="gst_number"
              onChange={args => args[0].nativeEvent.text.replace(/\s/g, '')}
              defaultValue=""
            />
            {/* <Text style={{textAlign: 'right'}}>{t("Forgot Password?")} <Text style={{fontWeight: 'bold'}} onPress={() => navigate('ForgetPassword')}>{t("Click here")}</Text></Text> */}
            {errors.gst_number ? (
              <Text style={[{color: 'black', marginBottom: 10}, styles.placeholder]}>
                {t('Please type a valid GST number')}
              </Text> 
            ) : <Text style={{marginBottom: 5}} />}
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <CheckBox 
              checked={termsAndConditions} 
              color={APP_COLOR} 
              style={{marginRight: 10, borderRadius: 5}}
              onPress={() => {
                updateTermsAndConditions(!termsAndConditions)
              }}
              style={{marginRight: 10, borderRadius: 5}} 
            />
            <Text style={{paddingLeft: 10}}>{t('By accepting all our agreements')}</Text>
          </View>
          {!termsAndConditions ? (
            <Text style={[{color: 'black', marginBottom: 10}, styles.placeholder]}>
              {t('You need to accept the terms and conditions')}
            </Text> 
          ) : <Text style={{marginBottom: 5}} />}
        </Layout>
      </ScrollView>
      <TouchableOpacity
        style={[styles.submit_btn, styles.submitButton]}
        activeOpacity={.7}
        testID="language-chooser-en-btn"
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.txt_sign_up}>
          {t('Create Account')}
        </Text>
      </TouchableOpacity>
      
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
)(withTranslation()(SignUp));
