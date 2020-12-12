import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage, hideMessage } from "react-native-flash-message";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import globalStyles from '../Initializing/styles';
import Layout from '../Layout';
import styles from './styles';
import {APP_COLOR} from '../../colors';

// functional component 
const Account = props => {
  Account.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    response: PropTypes.object,
    addresses: PropTypes.object,
    LoginActions: PropTypes.object.isRequired,
  };

  const [addAddress, updateAddAddress] = useState(false);
  const [homeWork, setHomeWork] = useState('Home');
  const [loading, updateLoading] = useState(false)

  const {
    locale,
    LoginActions: {updateResponse, createAddress, getUserAddresses},
    navigation,
    t,
    addresses
  } = props;

  const button = useRef();

  const {
    route: {params: {selectAddress, addressSelect}},
  } = props;
  
  const {control, handleSubmit, errors} = useForm();

  const callbackFunction = (response, status, data) => {
    updateLoading(false)
    if(status === 200 ) {
      getUserAddresses()
      showMessage({
        message: response.message,
        type: "success",
      });
      updateAddAddress(false)
    } else {
      showMessage({
        message: response.error || '',
        type: "danger",
      });
    }
  }

  const onSubmit = (data) => {
    updateLoading(true);
    createAddress({data, callbackFunction});
    
  }

  if(addAddress){
    return (
      <View style={{backgroundColor: 'white', position: 'absolute', bottom: 0, width: "75%", marginBottom: 120, marginLeft: 20, elevation: 5, borderRadius: 20}}>  
        <TouchableOpacity style={{padding: 10,}} onPress={() => updateAddAddress(false) }>
          <Icon name="chevron-left" size={22} style={{elevation: 5,}}/>
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Text style={{color: 'black', marginLeft: 5}}>{t('Address')}</Text>
          <Controller
            as={<TextInput />}
            control={control}
            rules={{required: true}}
            style={[globalStyles.input, {width: "90%", backgroundColor: '#EBEBEB', borderColor: '#EBEBEB', }]}
            name="description"
            placeholder={t('Address')}
            onChange={args => args[0].nativeEvent.text}
            defaultValue=""
          />
          {errors.description ? (
            <Text style={{color: 'black', marginBottom: 5}}>
              {t('This is required')}
            </Text> 
          ) : <Text style={{marginBottom: 5}} />}
          <Text style={{color: 'black', marginLeft: 5}}>{t('Pincode')}</Text>
          <Controller
            ref={button}
            as={<TextInput keyboardType="number-pad" />}
            control={control}
            rules={{required: true, minLength: 6, maxLength: 6}}
            style={[globalStyles.input, {width: "50%", backgroundColor: '#EBEBEB', borderColor: '#EBEBEB', }]}
            name="pincode"
            placeholder={t('Pincode')}
            onChange={args => args[0].nativeEvent.text}
            defaultValue=""
          />
          {errors.pincode ? (
            <Text style={{color: 'black', marginBottom: 5}}>
              {t('Length should be 6')}
            </Text> 
          ) : <Text style={{marginBottom: 5}} />}
          
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, padding: 5}}>
            <TouchableOpacity 
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setHomeWork('Home')}
            >
              <Icon name="home" size={20} style={{elevation: 5, color: homeWork === 'Home' ? APP_COLOR : 'gray' }}/>
              <Text style={{marginLeft: 5, color: homeWork === 'Home' ? APP_COLOR : 'gray' }}>{t('Home')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}
              onPress={() => setHomeWork('Office')}
            >
            <Icon name="building" size={15} style={{elevation: 5, marginLeft: 10, color: homeWork === 'Office' ? APP_COLOR : 'gray'}}/>
            <Text style={{marginLeft: 5, color: homeWork === 'Office' ? APP_COLOR : 'gray'}}>{t('Office')}</Text>
            </TouchableOpacity>
          </View>
          <View>
          {loading ? 
            <ActivityIndicator style={globalStyles.fill_button} /> : 
            <TouchableOpacity
              style={[globalStyles.fill_button, { borderRadius: 0,borderBottomRightRadius: 20, height: 45}]}
              testID="language-chooser-en-btn"
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={globalStyles.fill_button_text}>
                {t('Add Now')}
              </Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      </View>  
    )
  }
  return (  
    <View style={{backgroundColor: 'white', position: 'absolute', bottom: 0, width: "75%", marginBottom: 120, marginLeft: 20, elevation: 5, borderRadius: 20}}>  
      <Text style={{color: 'black', marginBottom: 5,marginTop: 10,marginLeft: 20}}>{t('Locations')}</Text>
      <View style={{marginLeft: 20, marginRight: 20, marginBottom: 10}}>
        {Object.values(addresses).map(el => {
          console.log("data", el)
          return (
            <TouchableOpacity
              disabled={!selectAddress}
              onPress={() => {
                if(selectAddress) {
                  addressSelect(el)
                }
              }}
            >
              <View style={{borderColor: '#FF4747', borderRadius: 5, borderWidth: 1, height: 40, justifyContent: 'center', marginBottom: 5}}>
                <Text>{el.street_number && `${el.street_number},`} {el.street_name && `${el.street_name}, `} {el.formatted_address && `${el.formatted_address} `} {el.zip_code && `${el.zip_code}`}</Text>
              </View>
            </TouchableOpacity>
          
        )})}
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={[globalStyles.fill_button, {width: '90%', margin: 5, marginBottom: 10}]}
          onPress={() => updateAddAddress(!addAddress)}
        >
          <Text style={globalStyles.fill_button_text}>{t('Add Location')}</Text>
        </TouchableOpacity>
        <View>
      </View>
    </View>
    <View style={{alignItems: 'flex-end'}}>
      <TouchableOpacity
        style={[globalStyles.fill_button, {borderRadius: 0,borderBottomRightRadius: 20, width: 70, height: 45  }]}
        testID="language-chooser-en-btn"
        onPress={() => {navigation.pop()}}
      >
        <Text style={globalStyles.fill_button_text}>
        <Icon name="chevron-right" size={20} style={{elevation: 5}}/>
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};


const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  const response = state.auth.get('response');
  const addresses = state.auth.get('addresses').toJS();
  return {locale, response, addresses};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Account));
