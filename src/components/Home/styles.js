import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const CARD_WIDTH = width;
export const CARD_HEIGHT = height;

export default {
  lottie: {
    width: 200,
    height: 200,
  },
  wrapper: {
    borderRadius: 10,
    height: 245,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1
  },
  slideShowContainer: {
    borderColor: 'gray',
    margin: 10,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  card: {
    flexDirection: 'row',
    width: width / 2 - 10,
    padding: 18,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cardTextHeading: {
    fontSize: 16.5,
    color: '#5D27C3',
  },
  cardTextSubHeading: {
    fontSize: 10,
  },
  wrapper: {
    borderRadius: 10,
    height: 245,
  },
  image: {
    width: '40%',
    height: '100%',
  },
  textContainer: {
    width: '70%',
  },
  slideShowImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
  slideShowContainer: {
    borderColor: 'darkgray',
    height: 245,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  interactive: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'flex-end',
    flex: 1,
    borderRadius: 10,
  },
  extraButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  extraButtonsTextContainer: {
    flex: 1,
    width: CARD_WIDTH / 2.5,
    height: CARD_HEIGHT / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
  },
  extraButtonsCardTextHeading: {},
  textCommonButton: {
    
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
  cardSubject: {
    height: 120,
    width: 200,
    justifyContent: 'center',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 19,
    textAlign: 'center',
    color: 'black'
  }
};
