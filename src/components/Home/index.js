import React from 'react';
import {View, Text,  Alert, Image} from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as LoginActionCreators from '../../actions/LoginActions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Iconions from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';
import {CommonActions, StackActions} from '@react-navigation/native';
import GlobalStyles from '../Initializing/styles'
import PopupMenu from '../common/popUpMenu';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js';
import {connect} from 'react-redux';
import styles from './styles';
// import 

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coordinate: {
        latitude: 0,
        longitude: 0
      },
      poi: null,
    }
    this.onPoiClick = this.onPoiClick.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }
    
  getCurrentLocation() {
    const {
      LoginActions: {
        getNearbyOrgs
      } 
    } = this.props; 
    Geolocation.getCurrentPosition(
      position => {
        // const initialPosition = JSON.stringify(position);
        this.setState({
          coordinate: position.coords,
        });
        getNearbyOrgs({data: {
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          nearby_distance: 10000
        }})
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {
        enableHighAccuracy: false, 
        timeout: 20000,
      },
    );
  }
  componentDidMount() {
    const {
      LoginActions: {getUserAddresses},
    } = this.props;
    this.getCurrentLocation()
    getUserAddresses({page: 1})
  }

  onPoiClick(e) {
    const poi = e.nativeEvent;

    this.setState({
      poi,
    });
  }

  onMapPress(e) {
    this.setState({
      coordinate: e.nativeEvent.coordinate,
      poi: null,
    });
  }

  render() {    
    const {
      navigation: {
        state,
        navigate,
        goBack
      },
      LoginActions: {handleCoordinates},
      navigation,
      LoginActions,
      t,
      auth
    } = this.props;

    navigation.setOptions({
      headerRight: () => (
        <PopupMenu options={['Logout']} onPress={() => {
          LoginActions.isLoggedIn(false)
          LoginActions.updateUserDetails({})

          navigation.dispatch(
            StackActions.replace('Splash', {resetState: true})
          );
          
          
        }} darkTriggerText />
      ),
    });
    
    const getLocation = (data,details) => {
      console.log(data)
    }

    const setLocation = () => {
      if(this.state.poi) {
        handleCoordinates(this.state.poi.coordinate)
      } else {
        handleCoordinates(this.state.coordinate)
      }
      navigation.popToTop();
    }
    
    //  console.log(this.state.initialPosition.coords["accuracy"]);
    const MyCustomMarkerView= () => {
      return(
        <View>
          <Image style={{width: 30, height: 30}} source={{uri: "https://w7.pngwing.com/pngs/630/312/png-transparent-red-map-location-icon-gps-navigation-systems-computer-icons-scalable-graphics-global-positioning-system-red-map-localization-icon-miscellaneous-google-maps-navigation-circle.png"}} />
        </View>
      )
    }
    
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        <MapView
          showsUserLocation //to show user current location when given access
          loadingEnabled
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          showsMyLocationButton={true}
          style={styles.map}
          onPoiClick={this.onPoiClick}
          onPress={e => this.onMapPress(e)}
          region={ {
            latitude: this.state.coordinate.latitude,
            longitude: this.state.coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }
          }
        > 
          {
            !this.state.poi &&
              <Marker 
                draggable 
                coordinate = {this.state.coordinate}
                // onDragEnd={(e) => 
                //   {
                //     this.setState({
                //       latitude: e.nativeEvent.coordinate.latitude,
                //       longitude: e.nativeEvent.coordinate.longitude
                //     });
                //   }
                // }
              >
                {/* <MyCustomMarkerView /> */}
                <Callout>
                  <View>
                    <Text>{t('Choossed location')}</Text>
                  </View>
                </Callout>
              </Marker>
          }
          {this.state.poi && (
            <Marker 
              draggable coordinate={this.state.poi.coordinate}
              onPress={() => console.log('data')}
            >
              
              <Callout>
                <View>
                  <Text>Place Id: {this.state.poi.placeId}</Text>
                  <Text>Name: {this.state.poi.name}</Text>
                </View>
              </Callout>
            </Marker>
            
          )}
          {auth.orgs.nearby_orgs.map(element => {
            return(
              <Marker 
                draggable coordinate={{latitude: parseFloat(element.location.split('(')[1].split(')')[0].split(' ')[1]), longitude: parseFloat(element.location.split('(')[1].split(')')[0].split(' ')[0])}}
                onPress={() => navigate('ShowPetrolPump', {petrolpump: element, image: auth.orgs.images[element.profile_picture], address: element.address_id ? auth.orgs.addresses[element.address_id] : null})}
                  
              > 
                {auth.orgs.images[element.profile_picture] && 
                  <Image source={{uri: auth.orgs.images[element.profile_picture] }} style={{ width: 40, height: 40 }} />
                }
                <Callout>
                  <Text>{element.name}</Text>
                </Callout>
              </Marker>
            )
          }            
        ) 
    
        }
        </MapView>
        {/* <Iconions style={{position: 'absolute', top: "50%", left: '50%'}} name="ios-pin" size={42} /> */}
        <View style={{position: 'absolute', bottom:0, right: 0, marginBottom: 40, marginRight: 20}}>
          <View style={{marginBottom: 5}}>
            <TouchableOpacity
              style={styles.squareButton}
              onPress={() => {navigate('AddAddress', {selectAddress: false,})}}
            >
              <View>
                <Icon style={styles.searchIcon} name="map-marker" size={25} />
              </View>
              
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 5}}>
            <TouchableOpacity
              style={styles.squareButton}
              onPress={() => {navigate('Account', {topBar: t('Account')})}}
            >
              <View>
                <Icon style={styles.searchIcon} name="user" size={25} />
              </View>
              
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.squareButton}
              onPress={() => {this.getCurrentLocation()}}
            >
              <View>
                <MaterialIcons style={styles.searchIcon} name="my-location" size={25} />
              </View>
              
            </TouchableOpacity>
          </View>

        </View>
        <TouchableOpacity style={styles.searchBar} onPress={() => navigate('GooglePlacesInput', {getLocation})}>
          <Iconions style={styles.searchIcon} name="ios-search" size={25} color="gray" />
          <Text style={{flex: 1,textAlignVertical: 'center', borderWidth: 1, color: 'gray', height: 50,marginLeft: 20, borderRadius: 10,  borderColor: 'white', }}>
            {t("Search now")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
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
)(toJS(withTranslation()(Home)));