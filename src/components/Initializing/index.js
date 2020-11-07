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
import { StackActions } from '@react-navigation/native';
import Logo from '../../../assets/s-banner.png';
import authFirebase from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as LoginActionCreators from '../../actions/LoginActions';
import background from '../../../assets/background.png'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../Layout';
import styles from './styles';
import LanguageChooser from '../LanguageChooser';

const Initialising = props => {
  Initialising.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    LoginActions: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool,
  };

  const [locales, updateLanguages] = useState([]);
  const {
    navigation: {navigate},
    isLoggedIn,
    navigation,
    t
  } = props;

  const {locale} = props;
  const moveInY = useRef(new Animated.Value(0)).current;

  const getLanguageData = async () => {
    updateVisible(true);
    firestore()
      .collection('keys')
      .doc('localization')
      .get()
      .then(querySnapshot => {
        const {languages} = querySnapshot.data();
        updateLanguages(languages);
        updateVisible(false);
      })
      .catch(el => console.log(el));
  };

  useEffect(() => {
    Animated.timing(moveInY, {
      toValue: 1,
      duration: 1000,
    }).start();
    if (!isLoggedIn) {
      authFirebase()
        .signInAnonymously()
        .then(() => {
          console.log('User signed in anonymously');
          getLanguageData();
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
          }
          console.error(error);
        });
    } else {
      navigation.dispatch(
        StackActions.replace('Home')
      );
    }
    // return () => {
    //   authFirebase()
    //     .signOut()
    //     .then(() => console.log('User signed out!'));
    // };
  }, [moveInY]);

  const [visible, updateVisible] = useState(false);

  const navigateToLoginPage = () => {
    navigate('Login', {topBar: t('Login')});
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.imageBackground}>  
          <ScrollView style={styles.overlay}>
            <Animated.View
              style={[
                {alignItems: 'center'},
              
              ]}>
              <Animated.Image
                source={Logo}
                style={{marginTop: '10%',height: 200, width: 200, resizeMode : 'stretch', margin: 5,  }}
                resizeMode="contain"
              />
              <Text style={{fontSize: 45, color: 'white'}}>Excelegal</Text>
            </Animated.View>
            <View>
              <AnimatedLoader
                visible={visible}
                source={require('./loader.json')}
                animationStyle={styles.lottie}
                speed={1}
              />
            </View>
            {Object.values(locales).length > 0 && (
              <View>
                <LanguageChooser locales={locales} />
                <TouchableOpacity
                  style={styles.commonButton}
                  onPress={navigateToLoginPage}>
                  <Text style={styles.textCommonButton}>
                    {locale === 'en_IN' ? 'Please Login' : 'कृपया लॉगिन करें'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </View>
    </Layout>
  );
};

Initialising.navigationOptions = {
  header: null,
};

const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  const isLoggedIn = state.auth.get('userLoggedIn');
  return {locale, isLoggedIn};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Initialising));
