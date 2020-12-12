import React, {Component} from 'react';
import {BackHandler, Platform, View, StatusBar} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import styles from './styles';

class AppWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: true};
  }

  webView = {
    canGoBack: false,
    ref: null,
  };

  hideSpinner() {
    this.setState({
      visible: false,
    });
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  render() {
    const {
      navigation: {
        state: {params},
      },
    } = this.props;

    const {visible} = this.state;

    return (
      <View style={{flex: 1}}>
        <StatusBar hidden />
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('./loader.json')}
          animationStyle={styles.lottie}
          speed={1}
        />

        <WebView
          source={{uri: params.url}}
          onLoad={() => this.hideSpinner()}
          ref={webView => {
            this.webView.ref = webView;
          }}
          allowsFullscreenVideo={true}
          onNavigationStateChange={navState => {
            this.webView.canGoBack = navState.canGoBack;
          }}
        />
      </View>
    );
  }
}


AppWebView.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AppWebView;
