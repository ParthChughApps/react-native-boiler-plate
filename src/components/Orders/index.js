import React, {useEffect} from 'react';
import {View, Text,  ScrollView, Image} from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as LoginActionCreators from '../../actions/LoginActions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Iconions from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';
import GlobalStyles from '../Initializing/styles'
import Swiper from 'react-native-swiper'
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js';
import {connect} from 'react-redux';
import styles from './styles';
import moment from 'moment';
// import 

const Orders = (props) => {
  const {
    navigation: {
      state,
      navigate,
      goBack
    },
    LoginActions: {getUserOrders},
    navigation,
    t,
    auth,
    userOrders: {orders}
  } = props;
  useEffect(() => {
    getUserOrders()
  },[])

  console.log(orders)

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View>
        {/* <Text style={{color: 'gray', fontSize: 19}}>Orders</Text> */}
        
          <ScrollView
            contentContainerStyle={{ marginHorizontal: 20}}
          >
          
            { orders.length > 0 ? orders.map(el => {
              return(
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {navigate('SingleOrder', {order: el})}}
                >
                  <View>
                    <View style={{backgroundColor: '#F6F6F6', borderRadius: 10, marginTop: 10, paddingVertical: 20}}>
                      <View >
                        <Text style={{width: "40%", backgroundColor: '#5DF088', color: 'white', marginTop: 10, textAlign: 'center', }}>{capitalize(el.order.order_status)}</Text>
                      </View>
                      <View style={{flexDirection: 'row', padding: 10}}>
                        <View style={{marginRight: 10}}>
                          <Text>#{el['order']['id']}</Text>
                          <Text style={{color: 'gray', fontSize: 10}}>Ordererd on</Text>
                          <Text style={{fontSize: 10}}>{moment(el.order.created_at).format('DD/MM/YYYY hh:mm:ss A')}</Text>
                        </View>
                        <View
                          style={{
                          borderLeftWidth: 1,
                          borderLeftColor: 'grey',
                          }}
                        />
                        <View style={{marginLeft: 20}}>
                          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>{el?.order?.items_fields?.map(el => el?.item?.toUpperCase()).join(',')}</Text>
                          <Text style={{color: 'grey', fontSize: 12}}>{el?.order?.items_fields?.map(el => `${el?.quantity}L` ).join(',')}</Text>
                        </View>
                        <View>
                          <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold', marginLeft: 10}}>{el.order.total_price}</Text>
                        </View>
                      </View>
                    </View> 
                  </View>

                </TouchableOpacity>

            )})
            : 
            <View>
              <Text>No Orders placed</Text>
            </View>
          }
        </ScrollView>
          
        
      </View>
    </View>
  );  
}

const mapStateToProps = state => {
  const {auth} = state;
  const userOrders = state.auth.get('userOrders').toJS();
  return {auth, userOrders};
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