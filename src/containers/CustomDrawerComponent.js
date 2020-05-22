import React from 'react';
import {SafeAreaView} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, View, Image, Text} from 'react-native';
import {Card, CardItem} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as LoginActionCreators from '../actions/LoginActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import styles from './styles';

const CustomDrawerComponent = props => {
  const { navigation} = props;

  const userDetails = {student: {name: 'Parth'}};

  return (
    <SafeAreaView>
      <View style={styles.textContainer}>
        <Card style={styles.cardStyle}>
          <Icon
            style={[styles.iconStyle]}
            name="chevron-left"
            size={26}
            onPress={() => navigation.goBack()}
          />
          <CardItem style={styles.cardItemStyle}>
            <View>
              <Text style={[styles.textBold, styles.textAlignCenter]}>
                {userDetails.studentname}
              </Text>
            </View>
          </CardItem>
        </Card>
      </View>
      <View>
        <ScrollView>
          <Card style={styles.drawerNavigationItems}>
            <DrawerNavigatorItems {...props} />
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

CustomDrawerComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
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
)(CustomDrawerComponent);
