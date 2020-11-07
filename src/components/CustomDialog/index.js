import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text
} from 'react-native';
import { withTranslation } from 'react-i18next';
import CustomButton from '../CustomButton';

const CustomDialog = props => {
  const { 
    isVisible, 
    t, 
    onAccept, 
    onReject, 
    title, 
    buttonText, 
    heading, 
    negativeButtonVisible
  } = props;
  
  CustomDialog.defaultProps = {
    negativeButtonVisible: true,
  };
  

  if (isVisible)
    return (
      <Modal
        statusBarTranslucent={true}
        animationType={"fade"}
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.container}>
          <View style={{ backgroundColor: '#000', width: '95%', padding: 15, borderRadius: 4, paddingVertical: 24, borderWidth: 1, borderColor: '#fff'}}>
          {heading && (
            <>
              <Text style={{ fontSize: 18, lineHeight: 24, textAlign: 'center',color: 'white' }}>{heading}</Text>
              <View style={{marginVertical: 15}} />
            </>
          )}
          
          <Text style={heading ? { fontSize: 15, lineHeight: 24, textAlign: 'center', color: 'rgb(100,117,101)' } : { fontSize: 18, lineHeight: 24, textAlign: 'center' }}>
            {title}
          </Text>
          <View style={{marginVertical: 24}} />
            <CustomButton
              text={buttonText}
              color={'#e87e06'}
              textColor={'#fff'}
              onPress={onAccept}
              style={{ height: 56 }}
            />
            <View style={{marginVertical: 16}} />
            {negativeButtonVisible &&
              <CustomButton
                text={t('Cancel')}
                color={'rgb(235, 249, 242)'}
                textColor={'rgb(34, 59, 36)'}
                onPress={onReject}
                style={{ height: 56 }}
              />
            }
            
          </View>
        </View>
      </Modal>
    );
  return null;
}

export default withTranslation()(CustomDialog);

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    ...StyleSheet.absoluteFillObject
  },
});

