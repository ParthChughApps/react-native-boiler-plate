import React from 'react';
import {View, Text,  Alert, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as LoginActionCreators from '../actions/LoginActions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Iconions from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';
import GlobalStyles from '../components/Initializing/styles'
import {bindActionCreators} from 'redux';
import { toJS } from '../components/to-js'
import {connect} from 'react-redux';
import styles from './styles';
// import 

class CustomDrawer extends React.Component {
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
  }
  
    
  getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        // const initialPosition = JSON.stringify(position);
        this.setState({
          coordinate: position.coords,
        });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {
        enableHighAccuracy: false, 
        timeout: 20000,
      },
    );
  }
  componentDidMount() {
    this.getCurrentLocation()
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
      t
    } = this.props;

    
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
                <Callout>
                  <View>
                    <Text>{t('Choosed location')}</Text>
                  </View>
                </Callout>
              </Marker>
          }
          {this.state.poi && (
            <Marker draggable coordinate={this.state.poi.coordinate}>
              <Callout>
                <View>
                  <Text>Place Id: {this.state.poi.placeId}</Text>
                  <Text>Name: {this.state.poi.name}</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
        {/* <Iconions style={{position: 'absolute', top: "50%", left: '50%'}} name="ios-pin" size={42} /> */}
        <View style={{position: 'absolute', bottom:0, right: 0, marginBottom: 40, marginRight: 20}}>
          <View style={{marginBottom: 5}}>
            <TouchableOpacity
              style={styles.squareButton}
              onPress={() => {this.getCurrentLocation()}}
            >
              <View>
                <Icon style={styles.searchIcon} name="map-marker" size={25} />
              </View>
              
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 5}}>
            <TouchableOpacity
              style={styles.squareButton}
              onPress={() => {this.getCurrentLocation()}}
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
          
          <Text style={{flex: 1,textAlignVertical: 'center', borderWidth: 1, color: 'gray', height: 50,marginLeft: 20, borderRadius: 10,  borderColor: 'white'}}>
            Search now
          </Text>{/* <TextInput
            style={{ flex: 1, borderWidth: 1, backgroundColor: 'white', height: 50,marginLeft: 20, borderRadius: 10,  borderColor: 'white' }}
            placeholder="Search"
          /> */}
        </TouchableOpacity>
        
        <View style={{
          position: 'absolute',//use absolute position to show button on top of the map
          bottom: '10%', //for center align
          alignSelf: 'center' //for align to right
        }}>
          <TouchableOpacity style={GlobalStyles.fill_button } onPress={() => {setLocation()}}>
            <Text style={GlobalStyles.fill_button_text }>{t('Done')}</Text>
          </TouchableOpacity>
        </View>
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
)(toJS(withTranslation()(CustomDrawer)));