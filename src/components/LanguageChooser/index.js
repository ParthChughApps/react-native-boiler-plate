// TODO: Export language chooser screen to a separate npm module
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'native-base';
import styles from './styles';
import * as actions from '../../actions/LoginActions';

class LanguageChooser extends Component {
  static propTypes = {
    locale: PropTypes.string,
    locales: PropTypes.object,
    settingsActions: PropTypes.object.isRequired,
  };

  render() {
    const {locales} = this.props;
    const onClickHandler = locale => {
      this.props.settingsActions.handleLocaleChange(locale);
    };

    return (
      <View style={styles.container} testID="language-chooser">
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
      </View>
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
