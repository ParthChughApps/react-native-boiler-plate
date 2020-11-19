import React,{useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { toJS } from '../to-js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const Competitions = (props) => {
  Competitions.propTypes = {
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  
  const {auth, 
    LoginActions:{getCompetitions}, 
    t,
    navigation: {navigate}
  } = props; 
  const [visible, updateVisible] = useState(true);

  const callbackFunction = () => {
    updateVisible(false)
  }
  const onNavigateToExamPage = async (el) => {
    const test = await el.test.get()
    navigate('Exam', {test: test.data(), locale: auth.locale, testRef: test.ref}) 
  }

  useEffect(() => {
    updateVisible(true)
    getCompetitions({callbackFunction});
  }, [])
  
  return ( auth.competitions.length > 0 ?
    <View style={styles.wrapper}>
      
      <Swiper 
        autoplay={true} 
        autoplayTimeout={10}
        dot={<View style={{backgroundColor:'rgba(256,256,256,.5)', width: 10, height: 10,borderRadius: 10, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}  
        activeDot={<View style={{backgroundColor: '#fff', width: 10, height: 10, borderRadius: 10, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}  
      >
        {
          auth.competitions.map((el, index) => {
            return(
              <TouchableOpacity
                key={index}
                style={{resizeMode: 'contain'}}
                onPress={() => {
                  onNavigateToExamPage(Object.values(el)[0])
                  // Linking.openURL("https://excelegal.in/");
                  // navigate('ShowWeb', {
                  //   topBar: 'https://excelegal.in/',
                  //   url: "https://excelegal.in/",
                  // });
                  // navigate('ProfileDrawer')
                }}>
                <View>
                  <Image style={{width: "100%", height: "100%", resizeMode: 'contain'}} source={{uri: Object.values(el)[0].image}}/>
                </View>
              </TouchableOpacity>
            )
          })
        }
        
      </Swiper>
      { visible && <ActivityIndicator />}
    </View> : null
  )
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
)(toJS(withTranslation()(Competitions)));

