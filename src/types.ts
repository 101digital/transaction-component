import { ReactNode } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  Transaction,
  TransactionSummary,
  Wallet,
  EmptyWalletThemeProps,
} from '@banking-component/core';

export type TransactionComponentProps = {
  Root: {
    style?: TransactionComponentStyle;
    props: {
      i18n?: any;
      initWallet?: Wallet;
      wallets: Wallet[];
      aggregatedWallets: Wallet[];
      isLoadingWallets?: boolean;
      formatCurrency: (amount: number, code: string) => string;
    };
    components?: {
      loadingIndicator?: ReactNode;
    };
  };
  CarouselItem: {
    style?: CarouselItemStyle;
    props: {
      carouselWidth: number;
      carouselItemWidth: number;
      primaryLabel?: string;
      summaryLabel?: string;
      moneyInLabel?: string;
      moneyOutLabel?: string;
    };
    components?: {
      renderSummary?: (
        summary?: TransactionSummary
      ) => React.ReactElement | null;
      tickIcon?: ReactNode;
      moneyInIcon?: ReactNode;
      moneyOutIcon?: ReactNode;
    };
  };
  Pagination?: {
    style?: DotStyle;
    props?: {
      activeOpacity?: number;
      inactiveOpacity?: number;
    };
  };
  EmptyTransaction?: {
    style?: EmptyTransactionStyle;
    props?: {
      emptyMessage?: string;
    };
    components?: {
      emptyIcon?: ReactNode;
    };
  };
  TransactionPage?: {
    style?: TransactionPageStyle;
    component?: {
      sectionHeader?: (date: string) => React.ReactElement | null;
      renderItem?: (
        index: number,
        item: Transaction
      ) => React.ReactElement | null;
    };
    props?: {
      onItemPress?: (transaction: Transaction) => void;
    };
  };
  TransactionItem?: {
    style?: TransactionItemStyle;
  };
  EmptyWallet?: EmptyWalletThemeProps;
};

export type TransactionComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  carouselWrap?: StyleProp<ViewStyle>;
  paginationWrap?: StyleProp<ViewStyle>;
};

export type EmptyTransactionStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
};

export type CarouselItemStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  imageWrapStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  walletWrapStyle?: StyleProp<ViewStyle>;
  walletNameTextStyle?: StyleProp<TextStyle>;
  walletNumberTextStyle?: StyleProp<TextStyle>;
  balanceTextStyle?: StyleProp<TextStyle>;
  primaryTextStyle?: StyleProp<TextStyle>;
  summaryTextStyle?: StyleProp<TextStyle>;
  moneyInWrapStyle?: StyleProp<ViewStyle>;
  moneyOutWrapStyle?: StyleProp<ViewStyle>;
  moneyLabelTextStyle?: StyleProp<TextStyle>;
  moneyValueTextStyle?: StyleProp<TextStyle>;
};

export type DotStyle = {
  dot?: StyleProp<ViewStyle>;
};

export type TransactionPageStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  transactionListStyle?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
};

export type TransactionItemStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  leftWrapStyle?: StyleProp<ViewStyle>;
  rightWrapStyle?: StyleProp<ViewStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
  walletNameTextStyle?: StyleProp<TextStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
};
