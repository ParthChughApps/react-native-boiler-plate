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

const Seller = props => {
  Seller.propTypes = {
    navigation: PropTypes.object.isRequired,
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const {auth, 
    LoginActions:{updateResponse}, 
    navigation: {navigate},
    t
  } = props; 

  const buttons = [{title: t('Register'), onPress: () => navigate('Register', {topBar: t('Register')})}]
  
 
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Layout style={{flex: 1}}>  
        {/* <Text style={styles.pageHeading}>{}</Text> */}
        <View style={{alignItems: 'center'}}>
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
)(toJS(withTranslation()(Seller)));
