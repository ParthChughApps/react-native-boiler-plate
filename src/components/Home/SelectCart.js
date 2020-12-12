import React, {useEffect, useRef, useState} from 'react';
import {
  View,

  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import {bindActionCreators} from 'redux';
// import {Picker} from 'react0n'
// import Dropdown from '../common/dropdown';
import PopupMenu from '../common/popUpMenu';
import {connect} from 'react-redux';
import styles from './styles';
import {APP_COLOR} from '../../colors';
import { showMessage, hideMessage } from "react-native-flash-message";
import paymentSucessful from '../../../assets/card.png';
import {Picker} from 'native-base';

// functional component 
const SelectCart = props => {
  SelectCart.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    response: PropTypes.object,
    userDetails: PropTypes.object,
    LoginActions: PropTypes.object.isRequired,
  };

  const [addAddress, updateAddAddress] = useState(false);
  const [homeWork, setHomeWork] = useState('Home');
  const [price, setPrice] = useState('');
  const [loading, updateLoading] = useState(false)
  const [fuelType, setFuelType] = useState({});
  const [value, onChangeText] = React.useState('1.00');
  const [addressFormatted, setAddressFormated] = React.useState({});
  const [delivery, setDelivery] = React.useState(70);
  const [visible, updateVisible] = React.useState(false);
  const {
    locale,
    LoginActions: {createOrder},
    route: {params: {image, petrolpump, address}},
    t,
    userDetails
  } = props;

  console.log("petrolpump", addressFormatted);
  const priceModel = {
    petrol: "98",
    disel: "70"
  }
  console.log(JSON.stringify(userDetails))

  const callbackFunction = (response, status) => {
    console.log("response", response);
    updateLoading(false)
    if(status === 200 ) {
      showMessage({
        message: response.message,
        type: "success",
      });
      updateVisible(true)
    } else {
      showMessage({
        message: response.error || '',
        type: "danger",
      });

      updateVisible(false)
      navigate('LoginOTP', {mobile: `${userDetails.getIn([
        'user',
        'phone_number',
      ])}`, disabled: true})
    }
  }

  useEffect(() => {
    if(visible) {
      
      setTimeout(() => {
        updateVisible(false)
        navigate('Home');
      },3000)
    }
  },[visible])

  useEffect(() => {
    setFuelType({price: priceModel[Object.keys(priceModel)[0]]})
    setPrice(Object.keys(priceModel)[0])
  },[])

  const button = useRef();

  const {
    navigation: {navigate, goBack, state},
    navigation
  } = props;
    
  const regex =  /[+-]?([0-9]*[.])?[0-9]+/
  const isQuanitityValid = regex.test(parseFloat(value))

  const onPress = () => {
    const data = {items_fields: [{price: fuelType.price, item: price, quantity: value}], org_id: petrolpump.id, delivery_price: delivery, total_price: parseFloat(value) * parseFloat(priceModel[price]), address_id: addressFormatted.id}
    updateLoading(true)
    createOrder({data, callbackFunction});
  }

  const onChangeTextData = (data) => {
    setFuelType({price: parseFloat(data) * parseFloat(priceModel[price])})
    onChangeText(data);
  }

  const setAddressSelect = (address) => {
    setAddressFormated(address)
    navigation.pop()

  }

  return (
    <View style={{flex: 1}}>  
      <Modal
        statusBarTranslucent={true}
        animationType={"fade"}
        transparent={true}
        visible={visible}
      >
        <View style={[styles.container]}>
          <Image source={paymentSucessful} resizeMode="stretch" style={{height: 296, width: "80%", borderTopRightRadius: 20, borderTopLeftRadius: 20}} />
          <Text style={{backgroundColor: 'white', width: "80%", fontSize: 24, textAlign: 'center', borderBottomRightRadius: 20, borderBottomLeftRadius: 20, paddingBottom: 20}}>
            Payment {'\n'} Successfull
          </Text>
        </View>
      </Modal>
      <View style={{backgroundColor: 'white', width: "100%",  position: 'absolute', bottom: 0,  elevation: 5, height: "50%" }}>
      <View>
        <View style={{flexDirection: 'row', padding: 10, alignItems: 'center',}}>
          { image ?
              <Image source={{uri: image }} style={{ width: 60, height: 60, borderRadius: 10 }} />
            : <Image style={{width: 40, height: 40}} source={{uri: "https://w7.pngwing.com/pngs/630/312/png-transparent-red-map-location-icon-gps-navigation-systems-computer-icons-scalable-graphics-global-positioning-system-red-map-localization-icon-miscellaneous-google-maps-navigation-circle.png"}} />  
          }
          <View style={{marginLeft: 10}}>
            <Text style={{color: 'black', fontSize: 19}}>{petrolpump.name}</Text>
            <Text style={{color: '#231B1B', fontSize: 9}}>{address ? address.formatted_address : ''}</Text>
          </View>
        </View>      
        <View style={{ justifyContent: 'space-around', marginHorizontal: 20}} >
          <View>
            {/* <Text style={{width: "90%", alignSelf: 'center', color: '#231B1B' }} >
              {t('Fuel')}
            </Text> */}
            {/* <Dropdown
              disabled={false}
              options={data}
              onValueChange={(text) => {
                setFuelType({price: priceModel[text]})
                setPrice(text)
                }
              }
            /> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'black',  fontWeight: 'bold'}}>Select Fuel Type</Text>
              <Picker
                mode="dropdown"
                placeholder={"Select Fuel Type"}
                selectedValue={price}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                onValueChange={(text) => {
                  console.log("text", text);
                  setFuelType({price: priceModel[text]})
                  setPrice(text)
                }}
                placeholderIconColor="#007aff"
              >
                {
                  Object.keys(priceModel).map((el) => (
                    <Picker.Item label={el} value={el} />
                  ))
                }

                
              </Picker>
            </View>
            {/* <Dropdown
              disabled={false}
              options={data}
              onValueChange={(text) => {
                setFuelType({price: priceModel[text]})
                setPrice(text)
                }
              }
            /> */}
          </View>
          
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Quantity(in Litres)</Text>
            <View style={{width: "20%"}}>
              <TextInput
                keyboardType="numeric"
                textAlign={'center'}
                style={{ height: 50, borderColor: 'gray', borderWidth: 1, fontSize: 20 }}
                onChangeText={text => onChangeTextData(text)}
                value={value}
              />
            </View>       
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: 'black',  fontWeight: 'bold'}}>Price</Text>
            <Text style={{color: '#231B1B', fontSize: 25}}>{(isQuanitityValid && price) ? `₹${parseFloat(value) * parseFloat(priceModel[price])}`: "NA"}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Delivery charges</Text>
            <Text style={{color: '#231B1B', fontSize: 25}}>{(isQuanitityValid && price) ? `₹${delivery}` : "NA"}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Total</Text>
            <Text style={{color: '#231B1B', fontSize: 25}}>{(isQuanitityValid && price) ? `₹${parseFloat(value) * parseFloat(priceModel[price]) + delivery}` : "NA"}</Text>
          </View>
        </View> 
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20}} onPress={() => {navigate('AddAddress', {selectAddress: true, addressSelect: setAddressSelect,})}}>
          <Text style={{color: APP_COLOR, fontWeight: 'bold'}}>Select Address</Text>
          <Text style={{color: APP_COLOR, fontWeight: 'bold', paddingRight: 20}}>{addressFormatted.formatted_address}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submit_btn, styles.submitButton, !(isQuanitityValid && price && Object.values(addressFormatted).length > 0) && {backgroundColor: 'rgba(255,71,71,0.6)'}]}
          disabled={!(isQuanitityValid && price && Object.values(addressFormatted).length > 0)}
          testID="language-chooser-en-btn"
          onPress={onPress}
        >
          <Text style={styles.txt_sign_up}>
            {t('PLACE ORDER')}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>  
  )

};


const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  const response = state.auth.get('response');
  const userDetails = state.auth.get('userDetails');
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
)(withTranslation()(SelectCart));

