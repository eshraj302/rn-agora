import React from 'react';
import {Pressable, View} from 'react-native';
import {COLORS} from '@constants/index';
import styles from './styles';
import StyledText from '../styledText';

const Radio = ({isActive = false, label = '', onPress}) => {
  const borderColor = isActive ? COLORS.PRIMARY : COLORS.WHITE;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.radio, {borderColor}]}>
        {!!isActive && <View style={styles.radioActive} />}
      </View>
      <StyledText color={COLORS.WHITE} textStyle={{marginRight: 20}}>
        {label}
      </StyledText>
    </Pressable>
  );
};

export default Radio;
