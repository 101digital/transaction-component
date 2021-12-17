import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { EmptyTransactionStyle } from '../../types';

const useMergeStyles = (style?: EmptyTransactionStyle) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
    },
    messageStyle: {
      fontSize: 15,
      color: '#094884',
      lineHeight: 23,
      marginTop: 15,
      fontFamily: fonts.medium,
    },
    iconStyle: {
      width: 100,
      height: 100,
      alignSelf: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
