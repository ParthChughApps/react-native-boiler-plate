import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const CARD_WIDTH = width;

export default {
  youtubePlayer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
  },
};
