import {COLORS} from '@constants/index';
import {StyleSheet} from 'react-native';

const SIZE = 20;
const PADDING = 8;

export default StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZE,
    marginRight: 10,
  },
  radioActive: {
    width: SIZE - PADDING,
    height: SIZE - PADDING,
    borderRadius: SIZE,
    backgroundColor: COLORS.PRIMARY,
  },
});
