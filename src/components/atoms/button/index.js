import React from 'react';
import {TouchableOpacity} from 'react-native';
import StyledText from '../styledText';
import {COLORS} from '@constants';
import styles from './styles';

const Button = ({title, bg = COLORS.PRIMARY, containerStyle, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: bg}, containerStyle]}>
      <StyledText color={COLORS.WHITE}>{title}</StyledText>
    </TouchableOpacity>
  );
};

export default Button;
