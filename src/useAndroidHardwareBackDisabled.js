import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const useAndroidHardwareBackDisabled = (onBackPress) => {
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
}

export default useAndroidHardwareBackDisabled;
