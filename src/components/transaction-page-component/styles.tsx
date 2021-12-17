import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { TransactionPageStyle } from '../../types';

const useMergeStyles = (style?: TransactionPageStyle) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transactionListStyle: {
      paddingBottom: 16,
    },
    dividerStyle: {
      flex: 1,
      height: 1,
      backgroundColor: '#DEDEDE',
      marginHorizontal: 30,
    },
    sectionWrapStyle: {
      margin: 15,
      flexDirection: 'row',
    },
    sectionTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 13,
      color: '#094884',
    },
    sectionText2Style: {
      fontFamily: fonts.medium,
      fontSize: 10,
      color: '#094884',
      lineHeight: 15,
    },
    footerWrap: {
      paddingVertical: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
