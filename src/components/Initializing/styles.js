import {Dimensions} from 'react-native';
import {APP_COLOR} from '../../colors';
import {APP_BUTTON, PAGE_HEADING} from '../../fontSize';

export default {
  container: {
    alignItems: 'center',
  },
  appLogoCenter: {
    alignSelf: 'center',
    marginVertical: -100,
    width: '100%',

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
    
  },
  input: {
    width: Dimensions.get('window').width - 30,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 24,
  },
  mainContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  fill_button: {
    backgroundColor: APP_COLOR,
    width: 124,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10

  },
  fill_button_text: {
    color: 'white',
    fontSize: APP_BUTTON
  },
  unfill_button: {
    backgroundColor: 'white',
    borderWidth: 1, 
    borderColor: APP_COLOR,
    width: 124,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  pageHeading: {
    fontSize: PAGE_HEADING,
    paddingLeft: 10,
    textAlign: 'center'
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
  unfill_button_text: {
    color: APP_COLOR
  }
};
