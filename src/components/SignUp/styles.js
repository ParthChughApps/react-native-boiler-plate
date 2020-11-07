import {Dimensions} from 'react-native';

export default {
  appLogoCenter: {
    alignSelf: 'center',
    marginTop: -100,
    marginBottom: -100,
    width: '50%',

  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textMiddleBold: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  textMarginMiddle: {
    margin: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  textCommonButton: {
    color: 'white',
    fontSize: 18,
  },
  commonButton: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#437504',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  input: {
    width: Dimensions.get('window').width - 100,
    height: 60,
    padding: 20,
    backgroundColor: 'rgba(126,126,126,0.5)',
    color: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 5,
    borderRadius: 5,
    fontSize: 18,
    paddingLeft: 20
  },
  submit_btn: {
    marginTop: 20,
    width: 180,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: Dimensions.get('window').width - 100,
    paddingTop: 30,
    paddingBottom: 30
  },
  txt_sign_up: {
    color: 'white',
    fontSize: 20,
    
  },
  mainContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  mobileContainer: {
        
  },
  lottie: {
    width: 200,
    height: 200,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: 'grey',
  },

  underlineStyleBase: {
    width: 30,
    fontSize: 18,
    color: 'black',
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
  otpInput: {
    width: '80%',
    height: 200,
    color: 'black',
  },
};
