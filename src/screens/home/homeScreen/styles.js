import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '@constants/index';

export default StyleSheet.create({
  header: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: SCREEN_PADDING,
  },
  section: {
    marginTop: 10,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
