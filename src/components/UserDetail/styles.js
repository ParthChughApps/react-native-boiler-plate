import {Dimensions} from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  appLogoCenter: {
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 60,
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
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
};
