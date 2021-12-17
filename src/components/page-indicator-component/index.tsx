import React from 'react';
import { View } from 'react-native';
import { DotStyle } from '../../types';
import useMergeStyles from './styles';

export type PageIndicatorProps = {
  isActive: boolean;
  activeOpacity?: number;
  inactiveOpacity?: number;
  style?: DotStyle;
};

const PageIndicatorComponent = (props: PageIndicatorProps) => {
  const { activeOpacity, inactiveOpacity, isActive, style } = props;

  const styles: DotStyle = useMergeStyles(style);
  const _activeOpacity = activeOpacity ?? 1;
  const _inActiveOpacity = inactiveOpacity ?? 0.6;

  return <View style={[styles.dot, { opacity: isActive ? _activeOpacity : _inActiveOpacity }]} />;
};

export default PageIndicatorComponent;
