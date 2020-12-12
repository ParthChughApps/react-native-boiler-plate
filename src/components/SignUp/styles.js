import {Dimensions} from 'react-native';
import {SUB_HEADING, SMALL_PLACEHOLDER} from '../../fontSize'
import {APP_COLOR, PLACEHOLDER_COLOR} from '../../colors'



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
    height: 50,
    borderWidth: 2,
    borderColor: APP_COLOR,
    borderRadius: 15,
    fontSize: 15,
    paddingLeft: 20,
  },
  submit_btn: {
    marginTop: 20,
    width: Dimensions.get('window').width ,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: APP_COLOR
  },
  txt_sign_up: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
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

  logo: {
    width: 37, 
    height: 25,
    marginBottom: 10,
    marginHorizontal: 20
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
  addLogo: {
    fontSize: SUB_HEADING,
    marginTop: 10
  },
  placeholder: {
    fontSize: SMALL_PLACEHOLDER,
    color: PLACEHOLDER_COLOR,
    marginLeft: 5,
    marginBottom: 5,
    fontWeight: 'bold'

  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchIcon: {
      padding: 10,
  },
  
};
