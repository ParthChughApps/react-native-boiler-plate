import React, { useEffect } from 'react';
import {View, Text,  ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as LoginActionCreators from '../../actions/LoginActions';

import { withTranslation } from 'react-i18next';

import {bindActionCreators} from 'redux';
import { toJS } from '../to-js';
import {connect} from 'react-redux';

import moment from 'moment';
// import 

const Orders = (props) => {
  const {route: {params: {order}}} = props
  console.log(order);
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {
        order.audits.map((el,index) => (
          <View style={{backgroundColor: '#F6F6F6', borderRadius: 10, marginTop: 10, paddingVertical: 20, marginHorizontal: 10, paddingHorizontal: 20}}>
            
              <View>
              {
                index === 0 ? 
                <Text style={{color: 'black',}}>{"Order Created"}</Text> 
                : 
                <Text style={{color: 'black',}}>Status change:  <Text style={{fontWeight: 'bold'}}>{capitalize(el["audited_changes"]["order_status"][0])} {'->'} {capitalize(el["audited_changes"]["order_status"][1])}</Text></Text>
              }  
                <Text>{moment(el.created_at).format('DD/MM/YYYY hh:mm:ss A')}</Text>
              </View>
              
          </View>
        ))
      }
    </View>
  );  
}

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
)(toJS(withTranslation()(Orders)));