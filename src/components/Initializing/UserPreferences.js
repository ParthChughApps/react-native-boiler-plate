import React,{useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import Avatar from './Avatar';
import {connect} from 'react-redux';
import {  ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
;

const Home = props => {
  Home.propTypes = {
    navigation: PropTypes.object.isRequired,
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
      
   
  
  const [visible, updateVisible] = useState(true);
  
  const {auth, 
    LoginActions:{updateResponse}, 
    navigation: {navigate},
    t,
    navigation
  } = props; 

  navigation.setOptions({
    title: "Select User Preference"
  })

  const buttons = [{title: t('User'), onPress: () => navigate('ChooseScreen', {topBar: t('Get Started')})}, {title: t('Seller'),onPress: () => navigate('Seller', {topBar: t('Join Us To Serve')})}]
  
 
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Layout style={{flex: 1}}>  
        {/* <Text style={styles.pageHeading}>{t('Select Your Preference')}</Text> */}
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Avatar  />
        </View>
        <View style={{alignItems: 'center'}}>
          {
            buttons.map((el, index) => (
              <View key={index} style={{marginBottom: 40}}>
                <TouchableOpacity 
                  style={index % 2 === 0 ? styles.fill_button : styles.unfill_button} 
                  onPress={el.onPress}
                >
                  <Text style={index % 2 === 0 ? styles.fill_button_text : styles.unfill_button_text}>{el.title}</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
        
      </Layout>
    </ScrollView>
    
  );
};

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
