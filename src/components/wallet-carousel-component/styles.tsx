import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { CarouselItemStyle } from '../../types';

const useMergeStyles = (style?: CarouselItemStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      borderWidth: 1,
      borderColor: '#F5F5F5',
      paddingHorizontal: 8,
      paddingVertical: 24,
      backgroundColor: 'white',
      borderRadius: 10,
      marginLeft: 5,
      marginHorizontal: 2,
      marginTop: 15,
    },
    imageWrapStyle: {
      width: 61,
      height: 55,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 7,
    },
    imageStyle: {
      width: 34,
      height: 34,
    },
    walletWrapStyle: {
      height: 55,
      paddingVertical: 2,
      flex: 1,
      justifyContent: 'space-between',
      marginLeft: 8,
    },
    walletNameTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: '#094884',
      lineHeight: 20,
      marginRight: 5,
    },
    walletNumberTextStyle: {
      fontSize: 11,
      fontFamily: fonts.regular,
      color: '#094884',
    },
    balanceTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: '#094884',
      lineHeight: 20,
    },
    primaryTextStyle: {
      fontSize: 13,
      fontFamily: fonts.regular,
      color: colors.primaryColor,
      lineHeight: 20,
      marginLeft: 5,
      marginRight: 8,
    },
    summaryTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: '#094884',
      marginHorizontal: 2,
      lineHeight: 20,
      marginTop: 15,
    },
    moneyInWrapStyle: {
      borderRadius: 8,
      width: 40,
      height: 40,
      backgroundColor: '#E6F8EF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    moneyOutWrapStyle: {
      borderRadius: 8,
      width: 40,
      height: 40,
      backgroundColor: '#FEE9EA',
      justifyContent: 'center',
      alignItems: 'center',
    },
    moneyLabelTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: '#094884',
      lineHeight: 20,
    },
    moneyValueTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: '#094884',
      lineHeight: 20,
    },
    headerStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    walletNameWrapper: {
      flexShrink: 1,
    },
    walletNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    balanceWrapStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    summaryWrapper: {
      flexDirection: 'row',
      marginHorizontal: 2,
      marginTop: 8,
      alignItems: 'center',
    },
    moneyBoxWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    moneyWrapper: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'space-between',
    },
    horizontalDivider: {
      width: 1,
      height: 35,
      backgroundColor: '#AEAEAE',
      marginHorizontal: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
