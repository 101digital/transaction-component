import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { DotStyle } from '../../types';

const useMergeStyles = (style?: DotStyle) => {
  const { colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    dot: {
      width: 19,
      height: 3,
      borderRadius: 3,
      margin: 3,
      backgroundColor: colors.primaryColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
