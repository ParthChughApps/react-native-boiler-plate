import React,{useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

import AnimatedLoader from 'react-native-animated-loader';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import { Card } from 'native-base'
import { toJS } from '../to-js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';


const Blogs = (props) => {
  Blogs.propTypes = {
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  
  const {auth, 
    LoginActions:{getBlogsAndArticles}, 
    t,
    navigation: { navigate }, 
    navigation
  } = props; 
  const [visible, updateVisible] = useState(true);
  const [intervals, setIntervals] = useState(1);

  const callbackFunction = () => {
    updateVisible(false)
  }

  useEffect(() => {
    updateVisible(true)
    getBlogsAndArticles({callbackFunction});
  }, [])
  
  return (
    <View>
      <Text style={{fontSize: 18,paddingVertical: 20}}>{t('Trending Blogs & Articles')}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {/* <AnimatedLoader
        visible={visible}
        source={require('../Initializing/loader.json')}
        animationStyle={styles.lottie}
        speed={1}
      /> */}
      <View style={{flex: 1, flexDirection: 'row'}} >
        {auth.blogs.map((el,index) => {
          return (
            <TouchableOpacity 
              style={{flex: 1,width: 180, marginHorizontal: 10}}
              key={index}
              onPress={() => {
                navigate('ShowWeb', {url: `https://excelegal.in/blog/${Object.keys(el)[0]}?showTopBar=false`, title: Object.values(el)[0].title})}
              }
            >
              <View>
                <Image
                  source={{uri: Object.values(el)[0].image || "https://firebasestorage.googleapis.com/v0/b/excelegal-local.appspot.com/o/posts%2Fd6f8c00f-bbd1-4425-b9b2-11b65f07edb8.png?alt=media&token=5d0f0bc9-8c68-4c74-9c1e-ae39fd93a91a"}}
                  style={styles.logo}
                />
                <Text>{Object.values(el)[0].title}</Text>
                {/* <Text style={{color: "#A6A6A6"}}>{moment(Object.values(el)[0].updatedAt._seconds).format('ddd, MMMM Do, h:mm a')}</Text> */}
              </View>
            </TouchableOpacity>
          )
        }
        )}
      </View>
      
    </ScrollView>
    </View>
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
)(toJS(withTranslation()(Blogs)));

