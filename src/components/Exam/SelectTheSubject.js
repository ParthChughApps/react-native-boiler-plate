import React,{useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import PropTypes from 'prop-types';
import AnimatedLoader from 'react-native-animated-loader';
import { Card, CardItem, Body } from 'native-base';
import * as LoginActionCreators from '../../actions/LoginActions';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import { withTranslation } from 'react-i18next';
import UserDetail from '../UserDetail';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Home/styles';

const SelectTheSubject = props => {
  SelectTheSubject.propTypes = {
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    updateSubject: PropTypes.func.isRequired,
  };
  const [visible, updateVisible] = useState(true);
  
  const {
    auth, 
    updateSubject,
    t
  } = props; 
  const locale = auth.locale;

  const [subjects, updateSubjects] = useState([])
  

  useEffect(() => {
    getData()
  },[])
  const getData = () => {
    const university = auth.universities.filter((el) => Object.keys(el)[0] === auth.userDetails.university )
    university[0][auth.userDetails.university].subjects.map(async (subject) => {
      const data =  await subject.get();
      updateSubjects(oldArray => [...oldArray, data.data()]);
      updateVisible(false)
    })
  }
  
  return (
    <View>
      <AnimatedLoader
        visible={visible}
        source={require('../Initializing/loader.json')}
        animationStyle={styles.lottie}
        speed={1}
      />
      {subjects.map((el, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => updateSubject(el)}>
            <Card style={styles.cardSubject}>
              <CardItem>
                <Body style={styles.cardContainer}>
                  <Text style={styles.cardText}>
                    {el["name"][locale]}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </View>
      ))}
    </View>   
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
)(toJS(withTranslation()(SelectTheSubject)));
