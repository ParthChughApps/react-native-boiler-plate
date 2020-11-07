import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

const CustomButton = props => {
  const {
    onPress,
    text,
    style,
    icon,
    disabled,
    color,
    textColor,
    disabledTextColor,
    disabledColor,
  } = props;
  const mergedStyle =
    style.length > 0
      ? [styles.buttonContainer, ...style]
      : [styles.buttonContainer, style];

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        mergedStyle,
        {
          backgroundColor: disabled
            ? disabledColor
              ? disabledColor
              : '#3a9c26'
            : color
            ? color
            : '#5849e2',
        },
      ]}>
      <View style={styles.button}>
        <Text
          style={[
            styles.extraButtonGreen,
            styles.buttonText,
            {color: disabled ? disabledTextColor : textColor},
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  textColor: PropTypes.string,
  disabledTextColor: PropTypes.string,
  disabledColor: PropTypes.string,
};

CustomButton.defaultProps = {
  text: '',
  style: {},
  color: '#5849e2',
  textColor: '#ffffff',
  disabledTextColor: '#ffffff',
  disabledColor: '#E87E04',
};

const styles = StyleSheet.create({
  extraButtonGreen: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
    color: '#223b24',
  },
  buttonContainer: {
    borderRadius: 12,
    height: 56,
    backgroundColor: '#fe825e',
    // shadowColor: 'rgba(26, 71, 54, 0.08)',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowRadius: 6,
    // shadowOpacity: 1,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 18,
  },
  buttonText: {
    marginEnd: 6,
    textAlign: 'center',
    color: '#fff',
  },
  buttonImage: {
    width: 24,
    height: 16,
  },
});

export default CustomButton;
