import React, {useEffect} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import Logo from '../../../assets/hat.png';
import {CommonActions, StackActions} from '@react-navigation/native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './styles';
import {toJS} from '../to-js';
import Layout from '../Layout';

const Initialising = props => {
  Initialising.propTypes = {
    navigation: PropTypes.object.isRequired,
    locale: PropTypes.string,
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  const {
    auth,
    navigation: {
      navigate,
    },
    route: {params},
    navigation,
    t,
  } = props;

  const goToHomePage = () => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [CommonActions.navigate({routeName: 'Home'})],
    });
    navigation.dispatch(resetAction);
  };

  useEffect(() => {}, []);

  const filteredData = params.exam.questions.map(el => el.choosedIndex);

  const filtered = filteredData.filter(function(x) {
    return x !== undefined;
  });

  const correctAnwers = params.exam.questions.filter(
    el => el.choosedIndex === parseInt(el.solution),
  ).length;

  return (
    <Layout style={styles.mainContainer}>
      <View style={{marginHorizontal: 30}}>
        <Text style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>
          {t('Test completed successfully')}
        </Text>
        <View>
          <Image
            source={Logo}
            style={styles.appLogoCenter}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            color: 'green',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 20,
          }}>
            {t('Congratulations')} {auth.response.user.name}!{' '}
            <Text style={{color: 'white'}}>
              {t('You have completed the test with a score of')}{' '}
            </Text>{' '}
        </Text>
        <Text>
          {
            params.exam.questions.filter(
              el => el.choosedIndex === parseInt(el.solution),
            ).length
          }{' '}
          / {params.exam.questions.length}
        </Text>
        <Text
          style={[
            styles.text,
            {color: '#326EA2', marginBottom: 10, fontSize: 20},
          ]}>
          {t('Test Insights')}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>{t('Correct Answers')}</Text>
            <Text style={[styles.text, {color: 'green'}]}>{correctAnwers}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>
              {t('Avg time per correct question')}:
            </Text>
            <Text style={[styles.text, {color: 'green'}]}>
              {(
                correctAnwers /
                (params.exam.time - params.remainingTime)
              ).toFixed(2)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>{t('Wrong Answers')}</Text>
            <Text style={[styles.text, {color: '#FF3434'}]}>
              {params.exam.questions.length - correctAnwers}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>{t('Avg time per wrong question')}:</Text>
            <Text style={[styles.text, {color: '#FF3434'}]}>
              {(
                (params.exam.questions.length - correctAnwers) /
                (params.exam.time - params.remainingTime)
              ).toFixed(2)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>{t('Avg time question')}:</Text>
            <Text style={[styles.text, {color: 'green'}]}>
              {filtered.length /
                params.exam.questions.filter(
                  el => typeof el.choosedIndex !== 'undefined',
                ).length}
            </Text>  
          </View>
          <View style={{
              marginTop: 20,
              textDecorationLine: 'underline',
              color: '#326EA2',
            }}
            onPress={() => navigate('Performance', {topBar: t('Performance Insights')})}
          >
            <Text>{t('View Performance Insights')}</Text>
          </View>
        <TouchableOpacity style={styles.commonButton} onPress={goToHomePage}>
          <Text style={styles.textCommonButton}>{t('Go to Tests')}</Text>
        </TouchableOpacity>
        
      </View>
    </Layout>
  );
};

Initialising.navigationOptions = {
  header: null,
};

const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  const auth = state.auth;
  return {locale, auth};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(withTranslation()(Initialising)));
