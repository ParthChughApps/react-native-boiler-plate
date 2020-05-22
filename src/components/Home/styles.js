const CARD_HEIGHT = 240;
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const CARD_WIDTH = width;

export default {
  cardStyle: {
    borderRadius: 10,
    elevation: 10,
    padding: 20
  },
  cardItemBody: {
    borderRadius: 10,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  container: {
    marginHorizontal: 10,
  },
  imageStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'stretch',
    width: CARD_WIDTH - 22,
    height: CARD_HEIGHT,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  textContainer: {
    margin: 10,
    opacity: 1.5,
  },
  icon: {
    paddingHorizontal: 10,
    color: 'white',
  },
};
