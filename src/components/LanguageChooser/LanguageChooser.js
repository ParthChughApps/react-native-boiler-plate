// TODO: Export language chooser screen to a separate npm module
import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import firestore from '@react-native-firebase/firestore';
import Layout from '../Layout';

import {Button} from 'native-base';
import styles from './styles';
import * as actions from '../../actions/LoginActions';

class LanguageChooser extends Component {
  static propTypes = {
    locale: PropTypes.string,    
    settingsActions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      locales: []
    }
  }
  getLanguageData = async () => {
    firestore()
      .collection('keys')
      .doc('localization')
      .get()
      .then(querySnapshot => {
        const {languages} = querySnapshot.data();
        // updateLanguages(languages);        
        this.setState({locales: languages})
      })
      .catch(el => console.log(el));
    // const data = query.data();
  };
  componentDidMount() {
    this.getLanguageData()
  }
  render() {
    const {locales} = this.state;
    const onClickHandler = locale => {
      this.props.settingsActions.handleLocaleChange(locale);
    };

    return (
      <Layout style={styles.container} testID="language-chooser">
        <View style={styles.optionsWrapper}>
          <View>
            <Text style={styles.text_align}>
              {'Please select your language/\nकृपया अपनी भाषा चुनें'}
            </Text>
          </View>
          <View style={styles.select_wrapper}>
            {Object.keys(locales).map((singleLocale, index) => {
              return (
                <Button
                  style={styles.submit_btn}
                  key={index}
                  testID="language-chooser-en-btn"
                  onPress={() => {
                    onClickHandler(singleLocale);
                  }}>
                  <Text style={styles.txt_sign_up}>
                    {locales[singleLocale]}
                  </Text>
                </Button>
              );
            })}
            <Text>
              Language/भाषा :{' '}
              {this.props.locale === 'en_IN' ? 'English' : 'हिन्दी'}
            </Text>
          </View>
        </View>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const locale = state.auth.get('locale');
  return {locale};
};
const mapDispatchToProps = dispatch => {
  const settingsActions = bindActionCreators(actions, dispatch);
  return {settingsActions};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageChooser);
