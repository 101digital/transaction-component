import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { TransactionItemStyle } from '../../types';

const useMergeStyles = (style?: TransactionItemStyle) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      borderRadius: 8,
      paddingVertical: 24,
      backgroundColor: 'white',
      paddingHorizontal: 15,
      marginHorizontal: 15,
    },
    leftWrapStyle: {
      flex: 1,
      marginRight: 8,
    },
    rightWrapStyle: {},
    descriptionTextStyle: {
      lineHeight: 20,
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#094884',
    },
    walletNameTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 10,
      color: '#094884',
    },
    amountTextStyle: {
      lineHeight: 20,
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#094884',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
