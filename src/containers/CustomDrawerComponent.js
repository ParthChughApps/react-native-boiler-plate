import React from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import {ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CommonActions, StackActions} from '@react-navigation/native';
import * as LoginActionCreators from '../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import {bindActionCreators} from 'redux';
import { toJS } from '../components/to-js'
import {connect} from 'react-redux';

import authFirebase from '@react-native-firebase/auth';

class CustomDrawer extends React.Component {
  render() {
    const {
      navigation: {
        state,
        navigate
      },
      LoginActions: {updateResponse, isLoggedIn},
      navigation,
      t,
      auth
    } = this.props;
    

    return (
      <SafeAreaView
        style={{
          marginHorizontal: 20
        }}>
          <View>
            {/* <Icon name="user-circle-o" size={50} color="#FFF" /> */}
            <Text style={{textAlign: 'center',color: 'white', fontSize: 22, marginTop: 10,marginBottom: 40}}>{`${t("Hey")} ${auth.response.user.name}`}</Text>
          </View>
        
        <View>
          {/* <TouchableOpacity 
            style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10,paddingBottom: 10,borderBottomColor: '#CECECE', borderBottomWidth: 1}} 
            onPress={() => navigate('Performance', {topBar: t('Performance Insights')})}
          >
            <Icon name="share-alt" size={20} color="#FFF" style={{marginRight: 10}}/>
            <Text style={{ fontSize: 18, color: 'white',  }}>{t("Performance Insights")}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity 
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10, paddingBottom: 10,borderBottomColor: '#CECECE', borderBottomWidth: 1}}
            onPress={() => navigate('ManageAccount')}  
          >
            <Icon name="user-o" size={20} color="#FFF" style={{marginRight: 10, marginTop: 10, marginBottom: 10}}/>
            <Text style={{ fontSize: 18, color: 'white'}}>{t("Manage Account")}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10, paddingBottom: 10,borderBottomColor: '#CECECE', borderBottomWidth: 1}}
            onPress={() => navigate('Donate')}
          >
            <Icon name="money" size={20} color="#FFF" style={{marginRight: 10, marginTop: 10, marginBottom: 10}}/>
            <Text style={{ fontSize: 18, color: 'white'}}>{t("Help us.Donate?")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingBottom: 10,borderBottomColor: '#CECECE', borderBottomWidth: 1}} onPress={() => {
            // updateResponse({});
            isLoggedIn(false);
            authFirebase()
              .signOut()
              .then(() => {
                navigation.dispatch(
                  StackActions.replace('Splash')
                );
              })
              .catch(() => {
                navigation.dispatch(
                  StackActions.replace('Splash')
                );
                navigation.dispatch(resetAction);
              })
              ;
              
          }}>
            <Icon name="share" size={20} color="#FFF" style={{marginRight: 10, marginTop: 10, }}/>
            <Text style={{ fontSize: 18, color: 'white'}}>{t("Logout")}</Text>
          </TouchableOpacity>                  
        </View>
        {/* <TouchableOpacity
          onPress={() =>
            this.props.navigation.dispatch(CommonActions.back())
          }>
          <Icon name="close" size={25} color="white" />
        </TouchableOpacity> */}
        
      </SafeAreaView>
    );
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
)(toJS(withTranslation()(CustomDrawer)));