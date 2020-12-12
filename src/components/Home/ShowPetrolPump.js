import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    LoginActions: PropTypes.object.isRequired,
  };


  const {
    locale,
    LoginActions: {updateResponse, isLoggedIn,},
    navigation,
    t
  } = props;

  const button = useRef();

  const {
    navigation: {navigate},
    route: {params: {image, petrolpump, address}},
    route
  } = props;
  
  console.log("route------", route.params)
  
  const onSubmit = (data) => {
    // navigation.pop()
    navigate('SelectCart', route.params)
  }

  return (
    <View style={{backgroundColor: 'white', position: 'absolute', bottom: 0, width: "75%", marginBottom: 120, marginLeft: 20, elevation: 5, borderRadius: 20, }}>  
      
      <View style={{flexDirection: 'row'}}>
      
        <View style={{flex: 1, justifyContent: 'space-around'}} >
          <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
            { image ?
              <Image source={{uri: image }} style={{ width: 40, height: 40 }} />
            : <Image style={{width: 40, height: 40}} source={{uri: "https://w7.pngwing.com/pngs/630/312/png-transparent-red-map-location-icon-gps-navigation-systems-computer-icons-scalable-graphics-global-positioning-system-red-map-localization-icon-miscellaneous-google-maps-navigation-circle.png"}} />  
            }
            
            <View>
              <Text style={{color: 'black', fontSize: 19}}>{petrolpump?.name}</Text>
              <Text style={{color: '#231B1B', fontSize: 9}}>{address ? address.formatted_address : ''}</Text>
            </View>
          </View> 
          <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
            <View>
              <Text style={{color: 'black', marginBottom: 5}}>Petrol </Text>
              <Text style={{color: 'black'}}>76/lit</Text>  
            </View>
            <View>
              <Text style={{color: 'black', marginBottom: 5}}>Disel</Text>
              <Text style={{color: 'black'}}>67/lit</Text>
            </View>
          </View>
        </View>

        
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <TouchableOpacity
            style={[globalStyles.fill_button, { flex: 1, borderRadius: 0,borderBottomRightRadius: 20,borderTopRightRadius: 20, width: 60  }]}
            testID="language-chooser-en-btn"
            onPress={onSubmit}
          >
            <Icon name="chevron-right" size={20} style={{elevation: 5, color: 'white' }}/> 
          </TouchableOpacity>
        </View>
      </View>
    </View>  
  )

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
)(withTranslation()(Account));

