import React, { ReactNode, useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { BNoTransactionIcon } from '../../assets/images';
import { EmptyTransactionStyle } from '../../types';
import useMergeStyles from './styles';

export type EmptyTransactionProps = {
  i18n?: any;
  emptyIcon?: ReactNode;
  message?: string;
  style?: EmptyTransactionStyle;
};

const EmptyTransactionComponent = (props: EmptyTransactionProps) => {
  const { emptyIcon, message, style, i18n } = props;

  const styles: EmptyTransactionStyle = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.iconStyle}>{emptyIcon ?? <BNoTransactionIcon />}</View>
      <Text style={styles.messageStyle}>
        {message ?? i18n?.t('transaction_component.msg_no_transaction') ?? 'No Transactions Found'}
      </Text>
    </View>
  );
};

export default EmptyTransactionComponent;
