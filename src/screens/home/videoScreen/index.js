import React, {Component, Fragment} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AgoraView,
  Button,
  ScreenContainer,
  StyledText,
} from '@components/atoms';
import {AgoraService} from '@services/index';
import {COLORS} from '@constants';
import {
  AudioRemoteState,
  ChannelProfile,
  ClientRole,
  VideoRemoteState,
} from 'react-native-agora';
import {showMessage} from 'react-native-flash-message';
import styles from './styles';

class VideoScreen extends Component {
  constructor(props) {
    super(props);

    const {appId, channelName, isNormalCall, isBroadcaster, uid} =
      this.props.route?.params;

    this.state = {
      peerIds: [],
      peerAudioState: {},
      peerVideoState: {},
      uid,
      appId,
      channelName,
      isNormalCall,
      isBroadcaster,
      isVideoMuted: false,
      isAudioMuted: false,
      isError: null,
      isLoading: true,
    };

    this.listeners = [];
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.init();
    });
  }

  componentWillUnmount() {
    this.listeners?.forEach(item => {
      item?.remove?.();
    });
    AgoraService.release();
  }

  setLoading = isLoading => {
    this.setState({isLoading});
  };

  init = async () => {
    try {
      this.setLoading(true);
      const {appId, channelName, isNormalCall, isBroadcaster, uid} = this.state;
      await AgoraService.initialize(
        appId,
        isNormalCall
          ? ChannelProfile.Communication
          : ChannelProfile.LiveBroadcasting,
      );
      if (!isNormalCall) {
        await AgoraService.setClientRole(
          isBroadcaster ? ClientRole.Broadcaster : ClientRole.Audience,
        );
      }
      await AgoraService.enableVideo();

      this.toggleAudio();

      this.listeners = [
        AgoraService.addListener('Error', (err, msg) => {
          console.log('[onError]', {err, msg});
        }),
        AgoraService.addListener('JoinChannelSuccess', data => {
          showMessage({
            type: 'success',
            message: 'Joined!',
          });
          this.setState({isJoined: true});
        }),
        AgoraService.addListener('UserOffline', uid => {
          this.setState({
            peerIds: this.state.peerIds.filter(item => item !== uid),
          });
        }),
        AgoraService.addListener('RemoteVideoStateChanged', (uid, state) => {
          this.setState(prevState => ({
            peerVideoState: {
              ...prevState.peerVideoState,
              [uid]: state === VideoRemoteState.Decoding,
            },
          }));
        }),
        AgoraService.addListener('RemoteAudioStateChanged', (uid, state) => {
          this.setState(prevState => ({
            peerAudioState: {
              ...prevState.peerAudioState,
              [uid]: state === AudioRemoteState.Decoding,
            },
          }));
        }),
        AgoraService.addListener('UserJoined', uid => {
          if (!this.state.peerIds.includes(uid)) {
            this.setState(state => ({
              peerIds: [...state.peerIds, uid],
            }));
          }
        }),
      ];

      await AgoraService.joinChannel({
        token: '',
        channelName: channelName,
        optionalUid: uid,
      });
      this.setState({isError: false});
    } catch (err) {
      showMessage({
        type: 'danger',
        message: err?.message || 'Something went wrong',
      });
      this.setState({isError: true});
    } finally {
      this.setLoading(false);
    }
  };

  toggleAudio = async () => {
    const isMuted = this.state.isAudioMuted;
    await AgoraService.toggleLocalAudio(!isMuted);
    this.setState({
      isAudioMuted: !isMuted,
    });
  };

  toggleVideo = async () => {
    const isMuted = this.state.isVideoMuted;
    await AgoraService.toggleLocalVideo(!isMuted);
    this.setState({
      isVideoMuted: !isMuted,
    });
  };

  switchCamera = async () => {
    await AgoraService.switchCamera();
  };

  endCall = async () => {
    try {
      await AgoraService.leaveChannel();
    } catch (err) {}
    this.props.navigation.goBack();
  };

  render() {
    const {
      isBroadcaster,
      peerIds,
      peerAudioState,
      peerVideoState,
      isAudioMuted,
      isNormalCall,
      uid,
      isVideoMuted,
      isLoading,
      isError,
      isJoined,
    } = this.state;

    console.log({peerAudioState});

    return (
      <ScreenContainer>
        <View style={styles.roleContainer}>
          <StyledText
            textStyle={styles.roleText}>{`Your User ID:${uid}`}</StyledText>
          <StyledText textStyle={styles.roleText}>{`Call Type: ${
            isNormalCall ? 'Normal Call' : 'Live Broadcast'
          }`}</StyledText>
          {!isNormalCall && (
            <StyledText textStyle={styles.roleText}>{`You're role is ${
              isBroadcaster ? 'Broadcaster' : 'Audience'
            }`}</StyledText>
          )}
          <View style={styles.usersCount}>
            <StyledText color={COLORS.WHITE}>{peerIds?.length}</StyledText>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            {peerIds.map((item, index) => {
              return (
                <AgoraView
                  key={`surfaceview-${index}`}
                  style={styles.remoteVideo}
                  containerStyle={styles.remoteVideoContainer}
                  uid={item}
                  isAudioEnabled={peerAudioState[item]}
                  isVideoEnabled={peerVideoState[item]}
                />
              );
            })}
          </ScrollView>
          {!!isJoined && (
            <AgoraView
              style={styles.localVideo}
              containerStyle={styles.localVideoContainer}
              uid={uid}
              showInfo={false}
              isVideoEnabled={!isVideoMuted}
            />
          )}
        </View>
        <View style={styles.buttonBar}>
          {!!isLoading ? (
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          ) : !isError ? (
            <Fragment>
              <ToggleButton
                icon={'camera-flip'}
                isEnabled
                onPress={this.switchCamera}
              />
              <ToggleButton
                icon={isAudioMuted ? 'microphone-off' : 'microphone'}
                isEnabled={!isAudioMuted}
                onPress={this.toggleAudio}
              />
              <ToggleButton
                icon={isVideoMuted ? 'video-off' : 'video'}
                isEnabled={!isVideoMuted}
                onPress={this.toggleVideo}
              />
              <ToggleButton icon="phone-hangup" onPress={this.endCall} />
            </Fragment>
          ) : (
            <Fragment>
              <Button title="Retry" bg={COLORS.RED} onPress={this.init} />
              <Button
                title="Go Back"
                containerStyle={{marginLeft: 20}}
                onPress={this.props.navigation.goBack}
              />
            </Fragment>
          )}
        </View>
      </ScreenContainer>
    );
  }
}

export default VideoScreen;

const ToggleButton = ({icon, isEnabled = false, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isEnabled && styles.buttonEnable]}>
      <Icon name={icon} size={24} color="white" />
    </TouchableOpacity>
  );
};
