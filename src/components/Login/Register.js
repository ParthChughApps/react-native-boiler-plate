import React,{useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, ToastAndroid, Dimensions, Image, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import Layout from '../Layout';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconions from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import ImagePicker from 'react-native-image-picker';
import {CheckBox} from 'native-base';
import {connect} from 'react-redux';
import {  ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import {APP_COLOR} from '../../colors';

const Seller = props => {
  Seller.propTypes = {
    navigation: PropTypes.object.isRequired,
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const {auth, 
    LoginActions:{updateResponse, registerOrg}, 
    navigation: {navigate},
    t
  } = props; 
  const [emailExist, updateEmailExist] = useState(true);
  const [image, updateImage] = useState({})
  const [loading, updateLoading] = useState(false)
  const getImage = () => {
    const options = {
      title: 'Get Image from Gallery',
      storageOptions: {
        skipBackup: true,
        path: 'images',

      },
    };
    
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.launchImageLibrary(options, (response) => {
      if(response.didCancel) {
        updateImage(image);
      } else {
        console.log("image---", response);
        updateImage(response)
      }
    });
  }

  const [oils, updateOils] = useState([])
  const [termsAndConditions, updateTermsAndConditions] = useState(false)

  const {control, handleSubmit, errors} = useForm();

  const callbackFunction = (response, status) => {
    updateLoading(false)
    if(status === 200 ) {
      showMessage({
        message: "Please confirm your email to procced further",
        type: "success",
      });
      navigate('Login')  
    } else {
      showMessage({
        message: response.error,
        type: "danger",
      });
    }
  }

 
  const onSubmit = (data) => {
    if(termsAndConditions && oils.length >0) {
      const updatedData = {
        name: data.petrolpump_name,
        email: data.email,
        password: data.password,
        image: image,
        extra_fields: {
          gst_number: data.gst_number, 
          pincode: data.pincode
        },
        location: {
          longitude: auth.coordinates.longitude,
          latitude: auth.coordinates.latitude,
          description: data.location
        },
        client_type: "fuel_gadi_customer_app"
      }
      
      updateLoading(true)
      registerOrg({data: updatedData, callbackFunction})
    } else {
      ToastAndroid.showWithGravity(
        t('Please resolve all the errors'),
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  
  return (
    <View style={{flex: 1}}>
      <ScrollView>
      <Layout>  
      <View style={{ marginBottom: 100}}>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => getImage()}>
            {
              Object.values(image).length > 0 ?
                <Image source={{ uri: `data:image/png;base64,${image.data}` }} 
                style={{
                  width: 100, 
                  height: 100,
                  borderRadius: 200,
                }}/>
                :
                <Icon name="user-circle-o" size={100} style={{marginRight: 10, textAlign: 'center'}} />
            }
            <Text style={styles.addLogo}>{t('Add Logo')}</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <View style={styles.mobileContainer}>
              <Text style={styles.placeholder}>{t('Petrol Bunk Name')}</Text>
              <Controller
                as={<TextInput />}
                control={control}
                rules={{required: true}}
                style={[styles.input]}
                name="petrolpump_name"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
              />
              {errors.petrolpump_name ? (
                <Text style={[{color: 'black', marginBottom: 10}, styles.placeholder]}>
                  {t('This is required')}
                </Text> 
              ) : <Text style={{marginBottom: 5}} />}          
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
                {!emailExist && <Text style={{color: 'red'}}>{t("Your email already exists")}</Text> }
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
              <TouchableOpacity
                onPress={() => navigate('ProfileDrawer')}
              >
                <Text style={styles.placeholder}>{t('Location')}</Text>
                <View style={styles.searchSection}>
                  <Controller
                    as={<TextInput  />}
                    control={control}
                    rules={{required: true}}
                    style={[styles.input, {width: Dimensions.get('window').width - 150}]}
                    name="location"
                    type="location"
                    onChange={args => args[0].nativeEvent.text}
                    defaultValue=""
                  />
                  <Iconions style={styles.searchIcon} name="ios-locate" size={20} />
                </View>
                
              </TouchableOpacity>
              {Object.values(auth.coordinates).length > 0 && (
                <Text style={[{color: 'black'}, styles.placeholder]}>
                  latitude: {auth.coordinates.latitude.toFixed(2)}, longitude: {auth.coordinates.longitude.toFixed(2)} 
                </Text> 
              )}
              {/* <Text style={{textAlign: 'right'}}>{t("Forgot Password?")} <Text style={{fontWeight: 'bold'}} onPress={() => navigate('ForgetPassword')}>{t("Click here")}</Text></Text> */}
              {errors.location ? (
                <Text style={[{color: 'black', marginBottom: 10}, styles.placeholder]}>
                  {t('This is required')}
                </Text> 
              ) : <Text style={{marginBottom: 5}} />}
              
              <Text style={styles.placeholder}>{t('Pincode')}</Text>
              <Controller
                as={<TextInput keyboardType='numeric' />}
                control={control}
                rules={{required: true, minLength: 6, maxLength: 6}}
                style={[styles.input]}
                name="pincode"
                type="pincode"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
              />
              {/* <Text style={{textAlign: 'right'}}>{t("Forgot Password?")} <Text style={{fontWeight: 'bold'}} onPress={() => navigate('ForgetPassword')}>{t("Click here")}</Text></Text> */}
              {errors.pincode ? (
                <Text style={[{color: 'black', marginBottom: 10}, styles.placeholder]}>
                  {t('Length should be 6')}
                </Text> 
              ) : <Text style={{marginBottom: 5}} />}
              {/* <Text style={styles.placeholder}>{t('Brand')}</Text>
              <Controller
                as={<TextInput  />}
                control={control}
                rules={{required: true}}
                style={[styles.input]}
                name="brand"
                type="brand"
                
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
              /> */}
              {/* <Text style={{textAlign: 'right'}}>{t("Forgot Password?")} <Text style={{fontWeight: 'bold'}} onPress={() => navigate('ForgetPassword')}>{t("Click here")}</Text></Text> */}
              {/* {errors.brand ? (
                <Text style={[{color: 'black', marginBottom: 10}, styles.placeholder]}>
                  {t('This is required')}
                </Text> 
              ) : <Text style={{marginBottom: 5}} />} */}
              <Text style={[styles.placeholder, {marginBottom: 10}]}>{t('Types of fuel')}</Text>        
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox 
                    checked={oils.includes('Petrol')} 
                    color={APP_COLOR} 
                    style={{marginRight: 10}} 
                    onPress={() => {
                      if(!oils.includes('Petrol')) {
                        updateOils(oils.concat('Petrol'))
                      } else {
                        updateOils(oils.filter(el => el !== 'Petrol'))
                      }
                    }} 
                  />
                  <Text style={{paddingLeft: 10}}>{t('Petrol')}</Text>
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox checked={oils.includes('Disel')} 
                    color={APP_COLOR} 
                    style={{marginRight: 10}}
                    onPress={() => {
                      if(!oils.includes('Disel')) {
                        updateOils(oils.concat('Disel'))
                      } else {
                        updateOils(oils.filter(el => el !== 'Disel'))
                      }
                    }} 
                  />
                  <Text style={{paddingLeft: 10}}>{t('Disel')}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox 
                    checked={oils.includes('Oil')} 
                    color={APP_COLOR} 
                    style={{marginRight: 10}} 
                    onPress={() => {
                      if(!oils.includes('Oil')) {
                        updateOils(oils.concat('Oil'))
                      } else {
                        updateOils(oils.filter(el => el !== 'Oil'))
                      }
                    }} 
                  />
                  <Text style={{paddingLeft: 10}}>{t('Oil')}</Text>
                </View>
                
              </View>  
              {oils.length === 0 ? (
                  <Text style={[{color: 'black', marginBottom: 5}, styles.placeholder]}>
                    {t('This is required')}
                  </Text> 
                ) : <Text style={{marginBottom: 5}} />}
              {/* <Text style={{textAlign: 'right'}}>{t("Forgot Password?")} <Text style={{fontWeight: 'bold'}} onPress={() => navigate('ForgetPassword')}>{t("Click here")}</Text></Text> */}
              <Text style={styles.placeholder}>{t('GST number')}</Text>
              <Controller
                as={<TextInput  autoCapitalize="characters"/>}
                control={control}
                rules={{
                  required: true, 
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
              <View style={{flexDirection: 'row'}}>
                <CheckBox 
                  checked={termsAndConditions} 
                  color={APP_COLOR} 
                  style={{marginRight: 10}} 
                  onPress={() => {
                    updateTermsAndConditions(!termsAndConditions)
                  }} 
                />
                <Text style={{paddingLeft: 10}}>{t('By accepting all our agreements')}</Text>
              </View>
              {!termsAndConditions ? (
                <Text style={[{color: 'black', marginBottom: 10}, styles.placeholder]}>
                  {t('You need to accept the terms and conditions')}
                </Text> 
              ) : <Text style={{marginBottom: 5}} />}
            </View>
          </View>
      </View>
      </Layout>
    </ScrollView>
    { loading ? 
    <ActivityIndicator style={[styles.submit_btn, styles.submitButton]} /> : 
    <TouchableOpacity
      style={[styles.submit_btn, styles.submitButton]}
      testID="language-chooser-en-btn"
      onPress={handleSubmit(onSubmit)}
    >
      <Text style={styles.txt_sign_up}>
        {t('Register Now')}
      </Text>
    </TouchableOpacity>
    }

    </View>
  );
};

const mapStateToProps = state => {
  const {auth} = state;
  return {auth};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(withTranslation()(Seller)));
