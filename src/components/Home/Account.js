import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/FontAwesome5';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../Layout';
import styles from './styles';

const Account = props => {
  Account.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    response: PropTypes.object,
    userDetails: PropTypes.object,
    LoginActions: PropTypes.object.isRequired,
  };

  const {
    locale,
    LoginActions: {updateResponse, isLoggedIn},
    navigation,
    userDetails,
    t
  } = props;

  const {
    navigation: {navigate},
  } = props;

  console.log("userDetails", userDetails)

  return (
    <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
      <Layout style={{ flex:1 , marginHorizontal: 20, backgroundColor: 'white'}}>            
        <View style={{ backgroundColor: '#EAEAEA', padding: 20,marginTop: 40, borderRadius: 10}}>
          <AntDesign style={styles.searchIcon} name="aliwangwang-o1" size={25} color="gray" />
          {userDetails.user.phone_number &&(
            <Text style={{color: 'gray'}}>{t('Mobile Number')} <Text style={{color: 'black'}}>{userDetails.user.phone_number}</Text></Text>  
          )}
          <Text style={{color: 'gray'}}>{t('Email-Id')}- <Text style={{color: 'black'}}>{userDetails.user.email}</Text></Text>
        </View>
        <View>
          <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#EAEAEA', marginTop: 20, borderRadius: 10, height: 70}} onPress={() => {navigate('Orders')}}>
            {/* <Ionicons style={{textAlignVertical: 'center', paddingLeft: 20}} name="list-ol" size={25} color="gray" /> */}
            <Text style={{fontSize: 16, marginLeft: 20,marginVertical: 10, color: 'black', textAlignVertical: 'center', color: 'gray'}}>My Orders</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    </ScrollView>
  );
};


const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  const response = state.auth.get('response');
  const userDetails = state.auth.get('userDetails').toJS();
  return {locale, response, userDetails};
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
