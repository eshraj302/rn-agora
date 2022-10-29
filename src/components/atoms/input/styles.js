import {SCREEN_PADDING, COLORS} from '@constants/index';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  formLabel: {
    paddingBottom: 10,
    paddingTop: 10,
    color: COLORS.PRIMARY,
  },
  formInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    color: COLORS.PRIMARY,
    borderRadius: 4,
    paddingLeft: 20,
  },
});
