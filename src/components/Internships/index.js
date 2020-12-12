import React,{useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import AnimatedLoader from 'react-native-animated-loader';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import firestore from '@react-native-firebase/firestore';
import { toJS } from '../to-js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import TimeIcon from './hourGlass.png';
import NounIcon from './noun_Time.png';

class Blogs extends React.Component {
  static propTypes = {
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

  componentDidMount() {
    const { 
      LoginActions:{getInternships}, 
    } = this.props; 
    const callbackFunction = () => {
      this.setState({visible: false})
    }
    getInternships({callbackFunction});
  }

  
  render() {
    const {auth, 
      LoginActions:{updateResponse}, 
      t
    } = this.props; 
    const {visible} = this.state;
    
    const applyForInternship = (el, upapply) => {
      let data = undefined
      if(upapply) {
        data = firestore.FieldValue.arrayRemove(Object.values(el)[0]["ref"])
      } else {
        data = firestore.FieldValue.arrayUnion(Object.values(el)[0]["ref"])
      }
      firestore()
        .collection('Users')
        .doc(auth.response.user.uid)
        .update({
          internships: data,
        })
        .then(() => {
          firestore()
            .collection('Users')
            .doc(auth.response.user.uid)
            .get()
            .then(documentSnapshot => {
              updateResponse({user: documentSnapshot.data()})
            })
        });
    }

    const getAppliedInternshipIds = () => {
      return auth.response.user.internships.map(el => {
        return el.id
      }) 
    }
    console.log(getAppliedInternshipIds())
    return (
      <View style={styles.internshipContainer}>
        <Text style={styles.mainHeading}>{t('Internship opportunities')}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {/* <AnimatedLoader
          visible={visible}
          source={require('../Initializing/loader.json')}
          animationStyle={styles.lottie}
          speed={1}
        /> */}
        <View style={{flex: 1, flexDirection: 'row'}} >
          {auth.internships.map((el,index) => {
            return (
              <View 
                style={{flex: 1, marginHorizontal: 10,width: 180,borderRadius: 10, backgroundColor: "#1A1A1A", paddingTop: 20}}
                key={index}
              >
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={{uri: Object.values(el)[0].image || "https://firebasestorage.googleapis.com/v0/b/excelegal-local.appspot.com/o/posts%2Fd6f8c00f-bbd1-4425-b9b2-11b65f07edb8.png?alt=media&token=5d0f0bc9-8c68-4c74-9c1e-ae39fd93a91a"}}
                    style={styles.logo}
                  />
                  <Text style={{textAlign: 'center'}}>{Object.values(el)[0].name[auth.locale]}</Text>
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 5}}>
                      <Image 
                        style={{width: 12, height: 14}}
                        source={NounIcon}
                      />
                      <Text style={{color: "#A6A6A6", marginLeft: 10,  }}>{moment(moment(Object.values(el)[0].date._seconds).format('MM-DD-YYYY'), "MM-DD-YYYY").week()} <Text>{t('weeks')}</Text> </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 30}}>
                      <Image 
                        style={{width: 12, height: 14}}
                        source={TimeIcon}
                      />
                      <Text style={{color: "#A6A6A6", marginLeft: 10,  }}>{moment(Object.values(el)[0].date._seconds).format('D MMM YYYY')}</Text>
                    </View>
                  </View>
                  {
                    typeof auth.response.user.internships !== 'undefined' &&  (getAppliedInternshipIds()).includes(Object.keys(el)[0]) ?
                    <TouchableOpacity style={{backgroundColor: '#326EA2', alignItems: 'center', width: 170, padding: 5, borderRadius: 10,marginBottom: 5, justifyContent: 'flex-end'}} onPress={() => applyForInternship(el, true)}>
                      <Text style={{fontSize: 16}}>{t('UN APPLY')}</Text>
                    </TouchableOpacity> : 
                    <TouchableOpacity style={{backgroundColor: '#326EA2', alignItems: 'center', width: 170, padding: 5, borderRadius: 10,marginBottom: 5, justifyContent: 'flex-end'}} onPress={() => applyForInternship(el, false)}>
                      <Text style={{fontSize: 16}}>{t('APPLY')}</Text>
                    </TouchableOpacity> 
                  }
                  
                </View>
              </View>
            )
          }
          )}
          
        </View>
        
      </ScrollView>
      { visible && <ActivityIndicator />}
      </View>
    )
  }
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

