import React from 'react';
import {Platform} from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const WebViewContent = ({ route, navigation }) => {
  
  navigation.setOptions({
    title: route?.params?.title
  })
  
  
  const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
  return (
    <WebView
      originWhitelist={['*']}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      injectedJavaScript={INJECTEDJAVASCRIPT}
      startInLoadingState={true}
      automaticallyAdjustContentInsets={false}
      source={{uri: route.params.url}}
    />
  )
}

WebViewContent.propTypes = {
  content: PropTypes.string
}

export default WebViewContent;
