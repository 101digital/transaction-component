import { defaultsDeep } from '@banking-component/core';
import { StyleSheet } from 'react-native';
import { TransactionComponentStyle } from './types';

const useMergeStyles = (style?: TransactionComponentStyle) => {
  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    carouselWrap: {
      paddingLeft: 10,
    },
    paginationWrap: {
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
