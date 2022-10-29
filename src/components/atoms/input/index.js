import React from 'react';
import {View, Text, TextInput} from 'react-native';
import StyledText from '../styledText';
import styles from './styles';

const Input = ({label = null, ...props}) => {
  return (
    <View style={styles.container}>
      {!!label && <StyledText textStyle={styles.formLabel}>{label}</StyledText>}
      <TextInput style={styles.formInput} {...props} />
    </View>
  );
};

export default Input;
