import React from 'react';
import {View, Text, Button} from 'react-native';
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
      t
    } = this.props;
    

    return (
    
      <View
        style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end',marginTop: 80}}>
        <View
          style={{
            width: '60%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: '#282828',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRightWidth: 0,
            flex: 1/2,
            alignItems: 'center'
          }}>
            <View
              style={{
                alignItems: 'center', marginTop: 20
              }}>
              <Icon name="user-circle-o" size={100} color="#FFF" />
              <Text style={{textAlign: 'center', fontSize: 22, marginTop: 10,marginBottom: 40}}>{t("Hello Jay")}</Text>
              <View>
                <TouchableOpacity 
                  style={{flexDirection: 'row', alignItems: 'center',}} 
                  onPress={() => navigate('Performance', {topBar: t('Performance Insights')})}
                >
                  <Icon name="share-alt" size={20} color="#FFF" style={{marginRight: 10}}/>
                  <Text style={{ fontSize: 18,  }}>{t("Performance Insights")}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}
                  onPress={() => navigate('ManageAccount')}  
                >
                  <Icon name="user-o" size={20} color="#FFF" style={{marginRight: 10, marginTop: 10}}/>
                  <Text style={{ fontSize: 18}}>{t("Manage Account")}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}
                  onPress={() => navigate('Donate')}
                >
                  <Icon name="money" size={20} color="#FFF" style={{marginRight: 10, marginTop: 10}}/>
                  <Text style={{ fontSize: 18}}>{t("Help us.Donate?")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} onPress={() => {
                  // updateResponse({});
                  isLoggedIn(false);
                  authFirebase()
                    .signOut()
                    .then(() => {
                      const resetAction = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                          CommonActions.navigate({
                            routeName: 'Splash',
                          }),
                        ],
                      });
                      navigation.dispatch(resetAction);             
                    })
                    .catch(() => {
                      const resetAction = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                          CommonActions.navigate({
                            routeName: 'Splash',
                          }),
                        ],
                      });
                      navigation.dispatch(resetAction);
                    })
                    ;
                    
                }}>
                  <Icon name="share" size={20} color="#FFF" style={{marginRight: 10, marginTop: 10}}/>
                  <Text style={{ fontSize: 18}}>{t("Logout")}</Text>
                </TouchableOpacity>                  
              </View>
              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.dispatch(CommonActions.back())
                }>
                <Icon name="close" size={25} color="white" />
              </TouchableOpacity> */}
              
            </View>
        </View>
      </View>

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