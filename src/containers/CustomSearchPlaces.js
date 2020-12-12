import React from 'react';
import { View, Dimensions } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = (props) => {
  const {width, height} = Dimensions.get('window')
    
  const {
    navigation: {

      navigate
    },
    route: {params: {getLocation}},
  } = props;
  // console.log(getLocation);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}> 
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2}
        autoFocus={false}
        fetchDetails
        onPress={(data, details) => {getLocation(data, details)}}
        query={{
          types: '(cities)', // default: 'geocode'
          // key: 'AIzaSyDoBK37zI93I9NUgOXv6621_ICKj6S6Huk',
          language: 'en' // language of the results
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)'
          },
          listView: {
            height: height,
            width: width,
            position: 'absolute',
          }
        }}
        nearbyPlacesAPI={'GooglePlacesSearch'}
        GoogleReverseGeocodingQuery={{
        }}
        GooglePlacesSearchQuery={{
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      />
    </View>
  );
};

export default GooglePlacesInput;