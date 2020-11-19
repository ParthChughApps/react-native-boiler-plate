import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import firestore from '@react-native-firebase/firestore';
import Layout from '../Layout';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import Blogs from '../Blogs'
import Internships from '../Internships'
import {connect} from 'react-redux';
import {  ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import Competitions from './Competitions';

const Home = props => {
  Home.propTypes = {
    navigation: PropTypes.object.isRequired,
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  const [visible, updateVisible] = useState(true);
  
  const {auth, 
    LoginActions:{updateResponse}, 
    navigation,
    t
  } = props; 
  
  useEffect(()=> {    
    firestore()
      .collection('Users')
      .doc(auth.response.user.uid)
      .get()
      .then(documentSnapshot => {        
        updateResponse({user: documentSnapshot.data(), userRef: documentSnapshot.ref})
      })
  },[]);
 
  return (
    <ScrollView>
      <Layout style={{paddingHorizontal: 20}}>  
        <Competitions 
          navigation={navigation}
        />
        <Blogs 
          navigation={navigation}
        />
        <Internships />
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
