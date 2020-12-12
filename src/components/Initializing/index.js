import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

import PropTypes from 'prop-types';
import AnimatedLoader from 'react-native-animated-loader';
import { withTranslation } from 'react-i18next';
import Logo from '../../../assets/s-banner.png';
import {CommonActions, StackActions} from '@react-navigation/native';
import Communications from './Communications'
import * as LoginActionCreators from '../../actions/LoginActions';
import * as SettingsActionCreators from '../../actions/SettingsActions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../Layout';
import styles from './styles';
import LanguageChooser from '../LanguageChooser';

const Initialising = props => {
  Initialising.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    locales: PropTypes.object,
    LoginActions: PropTypes.object.isRequired,
    SettingsActions: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool,
  };


  const [visible, updateVisible] = useState(false);
  const {
    navigation: {navigate},
    isLoggedIn,
    navigation,
    t,
    locales,
    SettingsActions: {getLocales},
    LoginActions,
    route: {params},
  } = props;

  navigation.setOptions({
    title: "Select language"
  })

  const {locale} = props;
  const moveInY = useRef(new Animated.Value(0)).current;

  const getLanguageData = async () => {
    updateVisible(true);
  };

  console.log("params", params);
  useEffect(() => {
    if (!isLoggedIn) {
      // navigate('Home', {topBar: ''})
      getLocales();
    } else {
      navigation.dispatch(
        StackActions.replace('Home')
      );
    }
  }, []);

    
  const onClickHandler = locale => {
    LoginActions.handleLocaleChange(locale);
    navigate('UserPreferences', {topBar: t('Select Your Preference')})
  };

  return (
    <Layout>
      <View style={styles.container}>
        {/* <ImageBackground source={background} style={styles.imageBackground}>   */}
          <ScrollView style={styles.overlay}>
            <View
              style={[
                {alignItems: 'center'},
              
              ]}>
              <Communications />
              
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 14, marginBottom: 40}}>भाषा का चयन करें / Select Language</Text>
              {
                locales.locales.map((el, index) => (
                  <View key={index} style={{marginBottom: 40}}>
                    <TouchableOpacity style={index % 2 === 0 ? styles.fill_button : styles.unfill_button} onPress={() => onClickHandler(el.locale)}>
                      <Text style={index % 2 === 0 ? styles.fill_button_text : styles.unfill_button_text}>{el.title}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>
            {/* <View> */}
              {/* <AnimatedLoader
                visible={visible}
                source={require('./loader.json')}
                animationStyle={styles.lottie}
                speed={1}
              /> */}
            {/* </View> */}
            
          </ScrollView>
        {/* </ImageBackground> */}
      </View>
    </Layout>
  );
};


const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  const isLoggedIn = state.auth.get('userLoggedIn');
  const locales = state.auth.get('locales').toJS();
  return {locale, isLoggedIn, locales};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
    SettingsActions: bindActionCreators(SettingsActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Initialising));
