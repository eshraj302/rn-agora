import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  VirtualBackgroundSource,
  VirtualBackgroundSourceType,
  Color,
  ChannelMediaOptions,
  ChannelProfile,
  ClientRole,
  ClientRoleOptions,
} from 'react-native-agora';
import {RtcEngineEvents} from 'react-native-agora/lib/typescript/common/RtcEvents';

class AgoraService {
  static #engine: RtcEngine | null;

  static get engine() {
    return this.#engine;
  }

  static async initialize(appId: string, channelProfile: ChannelProfile) {
    if (!this.#engine) {
      this.#engine = await RtcEngine.create(appId);
    }
    await this.#engine.setChannelProfile(channelProfile);
  }

  static release() {
    return new Promise<void>(async resolve => {
      await this.#engine?.destroy();
      this.#engine = null;
      resolve();
    });
  }

  static addListener<EventType extends keyof RtcEngineEvents>(
    eventType: EventType,
    listener: RtcEngineEvents[EventType],
  ) {
    return this.#engine?.addListener(eventType, listener);
  }

  static setChannelProfile(channelProfile: ChannelProfile) {
    return this.#engine?.setChannelProfile(channelProfile);
  }

  static setClientRole(role: ClientRole) {
    return this.#engine?.setClientRole(role);
  }

  static enableVideo() {
    return this.#engine?.enableVideo();
  }

  static joinChannel({
    token,
    channelName,
    optionalInfo,
    optionalUid,
    options,
  }: {
    token?: string;
    channelName: string;
    optionalInfo?: string;
    optionalUid: number;
    options?: ChannelMediaOptions;
  }) {
    return this.#engine?.joinChannel(
      token,
      channelName,
      optionalInfo,
      optionalUid,
      options,
    );
  }

  static leaveChannel() {
    return this.#engine?.leaveChannel();
  }

  static toggleLocalAudio(isMute: boolean) {
    return this.#engine?.muteLocalAudioStream(isMute);
  }

  static toggleLocalVideo(isMute: boolean) {
    return this.#engine?.muteLocalVideoStream(isMute);
  }

  static switchCamera() {
    return this.#engine?.switchCamera();
  }
}

export default AgoraService;
