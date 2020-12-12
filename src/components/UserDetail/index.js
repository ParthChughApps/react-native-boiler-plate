import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Button,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import Logo from '../../../assets/s-banner.png';
import authFirebase from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';
import background from '../../../assets/background.png';
import * as LoginActionCreators from '../../actions/LoginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../Layout';
import styles from './styles';
import { toJS } from '../to-js';

const Initialising = props => {
  Initialising.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  const {LoginActions: { updateUserDetails }, locale, auth} = props;
  const {control, handleSubmit, errors} = useForm();
  const [selected2, updatedSelected2] = useState(undefined)

  const onSubmit = (data) => {
    if(auth.universities.length > 0) {
      firestore()
      .collection('Users')
      .doc(auth.response.user.uid)
      .update({
        university: selected2 ? selected2 : Object.keys(auth.universities[0])[0],
      })
      .then(() => {
        firestore()
          .collection('Users')
          .doc(auth.response.user.uid)
          .get()
          .then(documentSnapshot => {
            console.log(documentSnapshot.data());
            updateUserDetails(documentSnapshot.data())
          })
      });
    }
  }
   
  const {
    navigation: {navigate},
  } = props;

  const changeUniversity = (key) => {
    console.log(key)
    updatedSelected2(key)
  }

  return (
    <View style={styles.mainContainer}>
      {/* <Text>Name</Text> */}
      <View style={styles.mobileContainer}>
        {/* <Controller
          as={<TextInput placeholderTextColor = "#FFFFFF" />}
          control={control}
          style={styles.input}
          name="name"
          placeholder={
            locale === 'en_IN'
              ? 'Enter your Name'
              : 'अपना नाम दर्ज करें'
          }
          onChange={args => args[0].nativeEvent.text}
          rules={{required: true}}
          defaultValue=""
        /> */}

      </View>
       {/* {errors.name && (
          <Text style={{color: 'red'}}>
            {locale === 'en_IN'
              ? 'This is required.'
              : 'यह आवश्यक है।'}
          </Text>
        )} */}
        
          <Item picker>
            <Picker
              mode="dropdown"
              itemTextStyle = {{ backgroundColor: '#000' }}
              // style={{backgroundColor: 'transparent'}}
              placeholder="Select your Univeristy"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={selected2}
              style={{ flex: 1, color: 'white',  }}
              onValueChange={(value) => changeUniversity(value) }
            >
              {
                auth.universities.map((university, index) => {
                  return(
                    <Picker.Item label="black" color="black"  key={index} label={university[Object.keys(university)].name[locale]} value={Object.keys(university)[0]} />
                  )
                })            
              }
              
            </Picker>
          </Item>
        <TouchableOpacity
          style={[styles.commonButton, {overlay: 0.5}]}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{color: 'white'}}>
            {locale === 'en_IN'
              ? 'Enter your Details'
              : 'अपना विवरण दर्ज करें'}
          </Text>
        </TouchableOpacity>
    </View>
  );
};

Initialising.navigationOptions = {
  header: null,
};

const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  const auth = state.auth
  return {locale, auth};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(Initialising) );
