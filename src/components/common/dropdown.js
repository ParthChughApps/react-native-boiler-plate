import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
import chevronDownGrey from '../../../assets/chevronDownGrey.png';

const DropDown = ({ disabled, options, onValueChange, valueExtractor, image, defaultValue }) =>
{
  const isDisabled = disabled ? 'none' : 'auto';

  const defaultValueExtractor = (item) =>
  {
    return item.value
  }

  return (
    <View style={styles.dropdownContainer} pointerEvents={isDisabled}>
      <Dropdown
        rippleOpacity={0}
        textColor={'#223b24'}
        fontSize={15}
        itemColor={'#223b24'}
        label={''}
        labelHeight={0}
        data={options}
        valueExtractor={valueExtractor || defaultValueExtractor}
        itemTextStyle={{fontFamily:  'SofiaProRegular', height: Platform.select({android: undefined, ios: 40}) }}
        renderAccessory={() =>
        {
          return (
            <Image
              source={chevronDownGrey}
            />
          )
        }}
        value={defaultValue}
        overlayStyle={{marginTop: options.length === 1 ? 32 : 70}}
        onChangeText={onValueChange}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        containerStyle={styles.itemContainer}
        pickerStyle={{ maxWidth: '100%', alignSelf: 'center' }}
      />
    </View>
  )
}

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func,
  valueExtractor: PropTypes.func.isRequired,
  // defaultValue: PropTypes.string
}

// Dropdown.defaultProps = {
//   disabled: false,
//   // onValueChange: ()=>{},
//   // defaultValue: {question:''}
// }

const styles = StyleSheet.create({
  dropdownContainer: {
    maxWidth: '100%',
    width: '100%',
    fontSize: 16,
    lineHeight: 20,
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 48,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bac4bc',
    backgroundColor: '#fff',
  },
  itemContainer: {
    paddingTop: 12,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
});

export default DropDown;
