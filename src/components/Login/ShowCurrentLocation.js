import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  Text
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import moment from 'moment';


const InteractionDetailsView = ({t, route }) => {
  const { details } = route.params;

  const _map = React.useRef(null);

  const onRegionChangeComplete = () => {
    if(_map?.current)
    _map.current.animateCamera(
      {
        center: {
          latitude: details?.latitude,
          longitude: details?.longitude
        }
      },
      0
    );
    console.log('region change completed')
  }

  return (
    <View style={styles.greenContainer}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
        
          <Text style={[styles.text, styles.titleDetails]}>{details.interaction}</Text>
          <View style={{height: 30}} />
          <Text style={[styles.text, styles.interactionTitle]}>{t('AGENT')}</Text>
          <View style={{height: 4}} />
          <Text style={[styles.text, styles.font18]}>{details.agentName+ ' / '+ details.customer}</Text>
          <View style={{height: 34}} />
          <Text style={[styles.text, styles.interactionTitle]}>{t('DATE')}</Text>
          <View style={{height: 4}} />
          <Text style={[styles.text, styles.font18]}>{moment(details.date).format('DD MMM YYYY HH:mm')}</Text>
          <View style={{height: 34}} />
          <Text style={[styles.text, styles.interactionTitle]}>{t('LOCATION')}</Text>
          <View style={{height: 16}} />
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              ref={_map}
              provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
              showsUserLocation={false}
              onRegionChangeComplete={onRegionChangeComplete}
              // onLayout={onMapLayout}
              region={{
                latitude: details?.latitude,
                longitude: details?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
             <Marker
                tracksViewChanges={false}
                coordinate={{
                  latitude: details?.latitude,
                  longitude: details?.longitude,
                }}
                image={images.mapPin}
              />
            </MapView>
          </View>
          <View style={{height: 34}} />
          
          <Text style={[styles.text, styles.interactionTitle]}>{t('INTERACTIONS')}</Text>
          <View style={{height: 16}} />
          <View>
            <Text style={[styles.text, { fontSize: 15 }]}>{details.interaction}</Text>
            <Text style={[styles.text, { fontSize: 13, color: 'rgb(100,117,101)' }]}>{'Successful'}</Text>
            <View style={{height:16}} />
          </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  greenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  headerIcon: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
  interactionTitle: {
    fontSize: 12,
    color: 'rgb(138, 138 ,142)',
  },
  font18: {
    fontSize: 15,
    lineHeight: 24
  },
  titleDetails: {
    marginTop: 15,
    color: 'rgb(100,117,101)',
  },
  status: {
    fontSize: 12,
    color: 'rgb(100,117,101)',
  },
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#e8ecf0',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  mapPointer: {
    height: 40,
    width: 40,
    flex: 1,
    resizeMode: 'contain',
  },
  mapContainer: {
    flex: 1,
    height: 200,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32    
  },
})

InteractionDetailsView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired
}

export default (withTranslation()(InteractionDetailsView));
