import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import Layout from '../Layout';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import authFirebase from '@react-native-firebase/auth';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import {connect} from 'react-redux';
import styles from './styles';

class ManageAccount extends React.Component {
  render() {
    const {t, auth} = this.props;
    return (
      <Layout style={{paddingHorizontal: 20}}>
        <Text onPress={() => {
           authFirebase()
            .sendPasswordResetEmail(auth.response.user.email)
              .then(function (user) {
                ToastAndroid.show("Email is sent to the email", ToastAndroid.SHORT);
              }).catch(function (e) {
                
              })  
        }}  style={styles.textStyle}>{t("Change Password")}</Text>
        <View
          style={styles.bottomLine}
        />
        <Text style={styles.textStyle}>{t("Card")}</Text>
        <View
          style={styles.bottomLine}
        />
        <Text style={[styles.textStyle, {color: 'red'}]}>{t("Delete Account")}</Text>
        <View
          style={styles.bottomLine}
        />
      </Layout>
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
)(toJS(withTranslation()(ManageAccount)));
