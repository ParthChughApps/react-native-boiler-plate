import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {NavigationActions, StackActions} from 'react-navigation';
import Osheen from './osheen.jpeg';
import {connect} from 'react-redux';
import styles from './styles';

const Initialising = props => {
  Initialising.propTypes = {
    navigation: PropTypes.object.isRequired,
  };
  const {navigation} = props;

  useEffect(() => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName: 'Home'})],
    });
    setTimeout(() => {
      navigation.dispatch(resetAction);
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Osheen} style={styles.appLogoCenter} />
    </View>
  );
};

Initialising.navigationOptions = {
  header: null,
};

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Initialising);
