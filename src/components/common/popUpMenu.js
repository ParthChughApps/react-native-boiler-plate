import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import PropTypes from 'prop-types';

export default class PopUpMenu extends Component {
  render() {
    const { options, onPress , triggerText, darkTriggerText} = this.props;
    return (
      <Menu>
        <MenuTrigger text='...' customStyles={darkTriggerText ? darkTriggerStyles : triggerStyles } />
        <MenuOptions>
          {
            options.map((el,index) => (
              <MenuOption onSelect={() => onPress(el)} >
                <Text style={{padding: 10}}>{el}</Text>
              </MenuOption>
            ))
          }
        </MenuOptions>
      </Menu>
    );
  }
}

const triggerStyles = StyleSheet.create({
    triggerText: {
      color: 'white',
      fontSize: 24,
      transform: [{ rotate: "90deg" }], 
      textAlign: 'center'
    },
    
})

const darkTriggerStyles = StyleSheet.create({
    triggerText: {
      color: 'gray',
      fontSize: 24,
      transform: [{ rotate: "90deg" }], 
      textAlign: 'center',
      paddingLeft: 10
    },
    
})


PopUpMenu.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  onError: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.style,
};