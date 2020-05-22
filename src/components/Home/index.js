import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as LoginActionCreators from '../../actions/LoginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, CardItem} from 'native-base';
import styles from './styles';

const Home = props => {
  Home.propTypes = {
    navigation: PropTypes.object.isRequired,
  };
  const {
    navigation: {navigate},
  } = props;

  return (
    <View styles={styles.container}>
      <View style={styles.container}>
      <TouchableOpacity  
        
        onPress={() => {
          navigate('SingleVideo', {
            topBar: 'Matlab Boy' 
          });
        }}>
          <Card style={styles.cardStyle}>
            <CardItem style={styles.cardItemBody}>
                <View>
                  <Text>Start Video/ Navigate to next screen</Text>
                </View>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

