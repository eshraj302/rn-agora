import {COLORS, SCREEN_PADDING} from '@constants/index';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  body: {
    flex: 1,
  },
  roleContainer: {
    padding: SCREEN_PADDING,
  },
  roleText: {
    fontSize: 16,
    lineHeight: 20,
  },
  buttonBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  contentContainerStyle: {
    paddingHorizontal: SCREEN_PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  localVideo: {
    height: 200,
    width: 150,
    borderRadius: 20,
    overflow: 'hidden',
  },

  localVideoContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },

  remoteVideo: {
    height: 150,
    aspectRatio: 1,
  },
  remoteVideoContainer: {
    marginBottom: SCREEN_PADDING,
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLORS.RED,
    marginRight: 10,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonEnable: {
    backgroundColor: COLORS.GREY,
  },
  buttonText: {
    color: 'white',
  },
  usersCount: {
    backgroundColor: COLORS.RED,
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    top: SCREEN_PADDING,
    right: SCREEN_PADDING,
  },
});
