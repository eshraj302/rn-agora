import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/index';

const BORDER_RADIUS = 10;

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    overflow: 'hidden'
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BLACK,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  microphone: {
    color: COLORS.WHITE,
    padding: 4,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
  },
  microphoneInActive: {
    backgroundColor: COLORS.RED,
  },
  videoDisabled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  }
});
