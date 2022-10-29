import {View, ViewStyle} from 'react-native';
import React from 'react';
import {RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@constants/index';
import StyledText from '../styledText';
import styles from './styles';

type Props = {
  uid: number | null;
  style: ViewStyle;
  containerStyle?: ViewStyle;
  showInfo?: boolean;
  isAudioEnabled?: boolean;
  isVideoEnabled?: boolean;
};

const AgoraView = ({
  uid = null,
  containerStyle = {},
  style,
  showInfo = true,
  isAudioEnabled = false,
  isVideoEnabled = false,
  ...props
}: Props) => {
  if (!uid) return null;

  return (
    <View style={[styles.container, containerStyle]}>
      <View>
        {!!isVideoEnabled ? (
          <RtcRemoteView.SurfaceView
            style={[style]}
            renderMode={VideoRenderMode.FILL}
            uid={uid}
            {...props}
          />
        ) : (
          <View style={[style, styles.videoDisabled]}>
            <Icon name="video" size={24} color={COLORS.WHITE} />
          </View>
        )}
      </View>

      {!!showInfo && (
        <View style={styles.user}>
          <StyledText>{`ID: ${uid}`}</StyledText>
          <View
            style={[
              styles.microphone,
              !isAudioEnabled && styles.microphoneInActive,
            ]}>
            <Icon
              name={isAudioEnabled ? 'microphone' : 'microphone-off'}
              size={16}
              color={COLORS.WHITE}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AgoraView;
