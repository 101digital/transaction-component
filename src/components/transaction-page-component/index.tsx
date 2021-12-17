import moment from 'moment';
import React, { ReactNode, useContext } from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
  SectionList,
  Text,
  View,
} from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { TransactionContext } from '../../context/transaction-context';
import { Transaction, Wallet, isEmpty } from '@banking-component/core';
import { TransactionItemStyle, TransactionPageStyle } from '../../types';
import TransactionItemComponent from '../transaction-item-component';
import useMergeStyles from './styles';

export type TransactionPageProps = {
  wallet: Wallet;
  wallets: Wallet[];
  emptyPlaceholder: ReactNode;
  loadingIndicator?: ReactNode;
  style?: TransactionPageStyle;
  itemStyle?: TransactionItemStyle;
  sectionHeader?: (date: string) => React.ReactElement | null;
  renderItem?: (index: number, item: Transaction) => React.ReactElement | null;
  onItemPress?: (transaction: Transaction) => void;
  formatCurrency: (amount: number, code: string) => string;
};

const TransactionPageComponent = (props: TransactionPageProps) => {
  const {
    wallet,
    style,
    loadingIndicator,
    emptyPlaceholder,
    sectionHeader,
    renderItem,
    itemStyle,
    formatCurrency,
    onItemPress,
    wallets,
  } = props;
  const { colors } = useContext(ThemeContext);

  const styles = useMergeStyles(style);

  const {
    fetchTransactions,
    refreshTransactions,
    isLoadingTransaction,
    isRefreshingTransaction,
    getTransactionPaging,
    groupTransactions,
  } = useContext(TransactionContext);
  const groupedTransactions = groupTransactions(wallet.walletId);
  const paging = getTransactionPaging(wallet.walletId);

  const loadMoreTransactions = () => {
    if (paging) {
      const { pageNumber, totalRecords, pageSize } = paging;
      if (wallet.walletId && !isLoadingTransaction && pageNumber * pageSize < totalRecords) {
        fetchTransactions(wallet.walletId, pageNumber + 1);
      }
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 40;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  if (isLoadingTransaction && isEmpty(groupedTransactions)) {
    return (
      <View style={styles.containerStyle}>
        {loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
      </View>
    );
  }

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={isRefreshingTransaction}
        onRefresh={() => {
          refreshTransactions(wallet.walletId);
        }}
        tintColor={colors.primaryColor}
      />
    );
  };

  if (!groupedTransactions || isEmpty(groupedTransactions)) {
    return (
      <ScrollView
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={renderRefreshControl()}
      >
        {emptyPlaceholder}
      </ScrollView>
    );
  }

  return (
    <SectionList
      removeClippedSubviews={false}
      contentContainerStyle={styles.transactionListStyle}
      sections={groupedTransactions}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item) => item.txnId}
      renderItem={({ item, index }) => {
        return (
          renderItem?.(index, item) ?? (
            <TransactionItemComponent
              wallets={wallets}
              transaction={item}
              isFromAggregated={wallet.isAggregated}
              style={itemStyle}
              formatCurrency={formatCurrency}
              onItemPress={() => {
                onItemPress?.(item);
              }}
            />
          )
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.dividerStyle} />}
      ListFooterComponent={() => {
        if (isLoadingTransaction) {
          return (
            <View style={styles.footerWrap}>
              {loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
            </View>
          );
        }
        return <View />;
      }}
      refreshControl={renderRefreshControl()}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          loadMoreTransactions();
        }
      }}
      onEndReachedThreshold={0.1}
      scrollEventThrottle={400}
      renderSectionHeader={({ section: { section } }) => {
        if (sectionHeader !== undefined) {
          return sectionHeader(section);
        }
        const date = moment(section, 'DD MMM YYYY');
        return (
          <View style={styles.sectionWrapStyle}>
            <Text style={styles.sectionTextStyle}>{date.format('D')}</Text>
            <Text style={styles.sectionText2Style}>{date.format('Do').replace(/\d+/g, '')}</Text>
            <Text style={styles.sectionTextStyle}>{date.format(' MMM YYYY')}</Text>
          </View>
        );
      }}
    />
  );
};

export default TransactionPageComponent;
