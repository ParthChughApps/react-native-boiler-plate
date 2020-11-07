import {Dimensions} from 'react-native';
export default {
  wrapperExam: {
    backgroundColor: 'black',
  },
  slide1: {
    flex: 1,

    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
  wrapper: {
    borderRadius: 10,
    height: 245,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
  },
  logo: {
    width: 150,
    height: 120,
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 5,
  },
  input: {
    width: Dimensions.get('window').width - 50,
    height: 40,
    // backgroundColor: 'rgba(126,126,126,0.5)',
    color: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 5,
    borderRadius: 5,
    fontSize: 14,
    paddingLeft: 20,
  },
};
