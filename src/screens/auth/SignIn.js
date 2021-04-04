/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import useLogin from '../../hooks/useLogin';

const height = Dimensions.get('window').height;
const SignIn = ({navigation}) => {
  let [modal, setModal] = useState(false);
  let [rollNumber, setRollNumber] = useState('');
  let [parentMobile, setParentMobile] = useState('');
  let [requiredError, setError] = useState('');
  let [button, setButton] = useState(true);
  const {loading, user, errors, login} = useLogin();

  const navigateToScreen = () => {
    console.log('=================> checking login');
    login(
      {
        rollNumber: '201',
        parentMobile: '7588584810',
      },
      () => {
        console.log('-------------------------------> SUCCESS');
      },
    );
    // setModal(false);

    navigation.replace('Home');
  };
  const validation = async () => {
    const reg = /^[0]?[6789]\d{9}$/;
    if (parentMobile.trim() === '' || rollNumber.trim() === '') {
      setError('All Fields are Required.');
    } else if (reg.test(parentMobile) === false) {
      setError('Invalid Mobile Number');
    } else {
      setModal(true);
    }
  };
  const required = async () => {
    if (parentMobile.trim() === '' || rollNumber.trim() === '') {
      setError('All Fields are Required.');
    }
  };
  const isValidate = async () => {
    await required();
    if (requiredError === '') {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={{alignItems: 'center', marginTop: -80}} />
      <View>
        {!modal && (
          <View>
            <Text style={styles.description}>
              Please login Using registered Roll number and parent mobile
            </Text>
            <View style={{marginTop: '7%'}} />
            <View style={styles.textInput}>
              <TextInput
                placeholder="ROLL NUMBER"
                keyboardType={'numeric'}
                style={styles.textInputText}
                onChangeText={rollNumber => {
                  setRollNumber(rollNumber);
                  isValidate();
                }}
              />
            </View>
            <View style={{marginTop: '4%'}} />
            <View style={styles.textInput}>
              <TextInput
                placeholder="PARENT MOBILE"
                maxLength={10}
                keyboardType={'numeric'}
                style={styles.textInputText}
                onChangeText={parentMobile => {
                  setParentMobile(parentMobile);
                  isValidate();
                }}
              />
            </View>
            {/* VALIDATION */}
            {!!requiredError && (
              <Text style={styles.error}>{requiredError}</Text>
            )}
            {loading && <ActivityIndicator size="large" color="#00ff00" />}
            {errors && <Text> {errors}</Text>}
            <TouchableOpacity
              disabled={button}
              style={button ? styles.disabledButton : styles.button}
              onPress={() => navigateToScreen()}>
              <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
            <Footer />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  description: {
    width: '75.8%',
    marginTop: -80,
    marginLeft: '9.7%',
    marginRight: '14.5%',
    fontSize: 17,
    color: '#4d4d4d',
    fontFamily: 'SofiaProRegular',
    textAlign: 'center',
  },
  textInput: {
    width: '88.4%',
    marginRight: '5.6%',
    marginLeft: '7%',
    borderWidth: 0.9,
    borderColor: '#707070',
  },
  textInputText: {
    marginLeft: '4.4%',
    fontSize: 18,
    color: '#000000',
    fontFamily: 'SofiaProRegular',
    height: 50,
  },
  button: {
    width: '90.3%',
    marginLeft: '6.3%',
    marginTop: '8%',
    padding: 8,
    backgroundColor: '#3087d9',
  },
  disabledButton: {
    width: '90.3%',
    marginLeft: '6.3%',
    marginTop: '8%',
    padding: 8,
    backgroundColor: '#bbcde5',
  },
  buttonText: {
    fontSize: 24.9,
    fontFamily: 'SofiaProRegular',
    color: '#ffffff',
    alignSelf: 'center',
  },
  otp: {
    width: '100%',
    padding: 4,
    borderColor: '#9d9d9d',
    borderWidth: 3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  verifyText: {
    color: '#4d4d4d',
    fontSize: 18,
    fontFamily: 'SofiaProRegular',
    textAlign: 'center',
    marginLeft: 25,
  },
  otpView: {
    width: '80%',
    height: '2.3%',
    marginTop: '15.6%',
    marginLeft: '10%',
  },
  otpNotRecieved: {
    color: '#4d4d4d',
    fontSize: 15.9,
    width: '55.6%',
    marginLeft: '2.9%',
    fontFamily: 'SofiaProRegular',
    textAlign: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: 'black',
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    color: 'black',
    borderWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: 'black',
  },
  resend: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#ffffff',
  },
  error: {
    color: 'red',
    width: 250,
    marginLeft: 40,
    marginTop: 8,
    fontWeight: '400',
    fontSize: 15,
  },
});
export default SignIn;
