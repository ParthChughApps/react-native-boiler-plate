import React from 'react';
import {View, Text} from 'react-native';
import Layout from '../Layout';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import {connect} from 'react-redux';
import styles from './styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moneySelected: null
    }
  }
  render() {
    const {t} = this.props;
    const money = [50, 100, 150, 200, 500]

    return (
      <Layout style={{paddingHorizontal: 20}}>
        <ScrollView>
          <Text style={[styles.textStyle, {textAlign: 'center'}]}>{t("donate-title")}</Text>
          <Icon name="money" size={100} color="#FFF" style={{margin:20, textAlign: 'center'}}/>
          <Text style={styles.textStyle}>{t("donate-description")}</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              money.map((el) => (
                <TouchableOpacity 
                  style={{padding: 10,borderWidth: 1, borderColor: this.state.moneySelected === el ? '#326EA2' :'#FFF', marginRight: 20, paddingHorizontal: 20,marginBottom: 20}}
                  onPress={()=> {this.setState({moneySelected: el})}}
                >
                  <Text style={{color: this.state.moneySelected === el ? '#326EA2' :'#FFF'}}>₹ {el}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          {
            this.state.moneySelected &&
            <View>
              <TouchableOpacity 
                style={{padding: 10, backgroundColor: '#326EA2', alignItems: 'center', borderRadius: 10 }}
                
              >
                <Text style={{fontSize: 20}}>{t('Donate')}</Text>
              </TouchableOpacity>
            </View>
          }
          
          
          
        </ScrollView>
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
)(toJS(withTranslation()(Donate)));
