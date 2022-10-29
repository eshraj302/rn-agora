import {COLORS} from '@constants/index';
import React from 'react';
import {View, Switch} from 'react-native';
import StyledText from '../styledText';
import styles from './styles';

const SwitchComponent = ({
  label = '',
  value = false,
  onValueChange = undefined,
}) => {
  return (
    <View style={styles.container}>
      <StyledText color={COLORS.WHITE} textStyle={{marginRight: 20}}>
        {label}
      </StyledText>
      <Switch
        value={value}
        thumbColor={COLORS.WHITE}
        trackColor={{true: COLORS.PRIMARY, false: COLORS.GREY}}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default SwitchComponent;
