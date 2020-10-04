import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import YouTubePlayer from 'react-native-youtube-sdk';
import {connect} from 'react-redux';
import styles from './styles';

const SingleVideo = (props) => {
  SingleVideo.propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  return (
    <View style={styles.videoContentContainer}>
      <YouTubePlayer
        videoId={'08VxVqSt3WQ'}
        autoPlay={true}
        fullscreen={false}
        showFullScreenButton={true}
        showSeekBar={true}
        showPlayPauseButton={true}
        startTime={0}
        style={styles.youtubePlayer}
        onError={(e) => console.log(e)}
        onChangeState={(e) => console.log(e)}
        onChangeFullscreen={(e) => console.log(e)}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleVideo);
