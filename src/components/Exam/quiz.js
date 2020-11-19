import React,{useEffect, useState} from 'react';
import {View, Image,Text, ActivityIndicator, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { toJS } from '../to-js'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import styles from './styles';

const Quiz = (props) => {
  Quiz.propTypes = {
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  
  const {auth, 
    LoginActions:{getQuiz}, 
    t,
    navigation: { navigate }
  } = props; 
  const [visible, updateVisible] = useState(true);

  const callbackFunction = () => {
    updateVisible(false)
  }

  useEffect(() => {
    updateVisible(true)
    getQuiz({callbackFunction});
  }, [])

  const onNavigateToExamPage = async (el) => {
    
    const test = await el.test.get()
    navigate('Exam', {test: test.data(), locale: auth.locale}) 
    // Alert.alert(
    //   'Do you want to start the exam',
    //   'Plase press OK to start',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'destructive',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel'
    //     },
    //     { text: 'OK', onPress: () => navigate('Exam', {test, locale: auth.locale}) }
    //   ],
    //   { cancelable: false }
    // );
  }
  
  return ( auth.quiz.length > 0 ?
    <View style={{marginTop: 20}}>
      <Text style={{fontSize: 20,marginBottom:20}}>{t('Most taken tests')}</Text>        
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {/* <AnimatedLoader
        visible={visible}
        source={require('../Initializing/loader.json')}
        animationStyle={styles.lottie}
        speed={1}
      /> */}
      <View style={{ flexDirection: 'row'}} >
        {auth.quiz.map((el,index) => {
          return (
            <TouchableOpacity 
              style={{width: 150, height: 120, marginHorizontal: 10,}}
              key={index}
              onPress={() => onNavigateToExamPage(Object.values(el)[0])}
            >
              <View>
                <ImageBackground
                  source={{uri: Object.values(el)[0].image || "https://firebasestorage.googleapis.com/v0/b/excelegal-local.appspot.com/o/posts%2Fd6f8c00f-bbd1-4425-b9b2-11b65f07edb8.png?alt=media&token=5d0f0bc9-8c68-4c74-9c1e-ae39fd93a91a"}}
                  imageStyle={{ borderRadius: 10 }}
                  style={styles.logo}
                >
                  <View style={styles.overlay}>
                    <Text style={{fontSize: 16}}>{Object.values(el)[0].name[auth.locale]}</Text>
                    <Text style={{fontSize: 14, color: '#C7C4C4'}}>{Object.values(el)[0].description}</Text>
                    <Text style={{color: '#C7C4C4', fontSize: 12}}>{t('Quiz')} - {Object.values(el)[0].questions} {t('Questions')} - {Object.values(el)[0].time/60} {t('minutes')}</Text>
                  </View>
                  
                </ImageBackground>
                
              </View>
            </TouchableOpacity>
          )
        }
        )}
      </View>
      
    </ScrollView>
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
)(toJS(withTranslation()(Quiz)));

