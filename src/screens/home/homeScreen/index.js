import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {
  Input,
  Switch,
  ScreenContainer,
  StyledText,
  Radio,
  Button,
} from '@components/atoms';
import {COLORS} from '@constants/index';
import {requestCameraAndAudioPermission} from '@utils/permission';
import styles from './styles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appId:
        '554a1c88a9ec467489287e66e77cf44e' ||
        Config?.AGORA_APP_ID ||
        '554a1c88a9ec467489287e66e77cf44e',
      channelName: 'test-abc',
      isBroadcaster: false,
      isNormalCall: true,
    };
  }

  setBroadcast = isBroadcaster => {
    this.setState({isBroadcaster});
  };

  handleSubmit = async () => {
    try {
      await requestCameraAndAudioPermission();
      const {appId, channelName, isBroadcaster, isNormalCall} = this.state;
      if (appId && channelName) {
        this.props.navigation.navigate('Video', {
          appId,
          channelName,
          isBroadcaster,
          isNormalCall,
          uid: Math.floor(Math.random() * 100),
        });
      }
    } catch (err) {
      console.log({err});
    }
  };

  render() {
    const {appId, channelName, isBroadcaster, isNormalCall} = this.state;
    return (
      <ScreenContainer>
        <View style={styles.header}>
          <StyledText size={24} color="white">
            {'Agora Video SDK Demo app'}
          </StyledText>
        </View>
        <View style={styles.body}>
          <Input
            label="App ID"
            onChangeText={appId => this.setState({appId})}
            value={appId}
            editable={false}
          />
          <Input
            label="Channel Name"
            onChangeText={channelName => this.setState({channelName})}
            value={channelName}
          />
          <View style={styles.section}>
            <StyledText size={16}>{'Choose call type'}</StyledText>
            <View style={styles.radioRow}>
              <Radio
                label="Normal Call"
                isActive={isNormalCall}
                onPress={() => this.setState({isNormalCall: true})}
              />
              <Radio
                label="Live Broadcast"
                isActive={!isNormalCall}
                onPress={() => this.setState({isNormalCall: false})}
              />
            </View>
            {!isNormalCall && (
              <Switch
                label="Become Broadcaster ?"
                value={isBroadcaster}
                onValueChange={this.setBroadcast}
              />
            )}
          </View>
          <Button title="Start Call" onPress={this.handleSubmit} />
        </View>
      </ScreenContainer>
    );
  }
}

export default HomeScreen;
