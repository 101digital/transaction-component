import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { TransactionService } from '../service/transaction-service';
import {
  WalletTransaction,
  Paging,
  GroupedTransactions,
  TransactionSummary,
  groupBy,
  orderBy,
  Transaction,
} from '@banking-component/core';

export interface TransationContextData {
  transactions: WalletTransaction[];
  isLoadingTransaction: boolean;
  isRefreshingTransaction: boolean;
  transactionError?: Error;
  clearTransactionError: () => void;
  fetchTransactions: (walletId?: string, pageNumber?: number) => void;
  refreshTransactions: (walletId?: string) => void;
  getTransactionPaging: (walletId?: string) => Paging | undefined;
  groupTransactions: (walletId?: string) => GroupedTransactions | undefined;
  getTransactionSummary: (walletId?: string) => TransactionSummary | undefined;
  clearTransactions: () => void;
}

export const transactionDefaultValue: TransationContextData = {
  transactions: [],
  isLoadingTransaction: false,
  isRefreshingTransaction: false,
  fetchTransactions: () => null,
  clearTransactionError: () => null,
  refreshTransactions: () => null,
  getTransactionPaging: () => undefined,
  groupTransactions: () => undefined,
  getTransactionSummary: () => undefined,
  clearTransactions: () => undefined,
};

export const TransactionContext = React.createContext<TransationContextData>(
  transactionDefaultValue
);

export function useTransactionContextValue(): TransationContextData {
  const [_transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [_transactionError, setTransactionError] = useState<Error | undefined>(
    undefined
  );
  const [_isLoading, setLoading] = useState(false);
  const [_isRefreshing, setRefreshing] = useState(false);

  const fetchTransactions = useCallback(
    async (walletId?: string, pageNumber?: number) => {
      if (!walletId) {
        return;
      }
      try {
        setLoading(true);
        const { data, paging, summary } =
          await TransactionService.instance().getTransactions(
            walletId,
            pageNumber
          );
        const index = _transactions.findIndex((ts) => ts.walletId === walletId);
        if (index === -1) {
          // is transactions not existed, add new
          setTransactions([
            ..._transactions,
            { walletId, data, paging, summary },
          ]);
        } else {
          // update transactions
          setTransactions(
            _transactions.map((ts) => {
              if (ts.walletId === walletId) {
                return {
                  ...ts,
                  data: [...ts.data, ...data],
                  paging: paging,
                  summary: summary,
                };
              }
              return ts;
            })
          );
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setTransactionError(error as Error);
      }
    },
    [setTransactions, _transactions]
  );

  const refreshTransactions = useCallback(
    async (walletId?: string) => {
      if (!walletId) {
        return;
      }
      try {
        setRefreshing(true);
        const { data, paging, summary } =
          await TransactionService.instance().getTransactions(walletId, 1);
        const index = _transactions.findIndex((ts) => ts.walletId === walletId);
        if (index === -1) {
          // is transactions not existed, add new
          setTransactions([
            ..._transactions,
            { walletId, data, paging, summary },
          ]);
        } else {
          // update transactions
          setTransactions(
            _transactions.map((ts) => {
              if (ts.walletId === walletId) {
                return {
                  ...ts,
                  data: data,
                  paging: paging,
                  summary: summary,
                };
              }
              return ts;
            })
          );
        }
        setRefreshing(false);
      } catch (error) {
        setRefreshing(false);
        setTransactionError(error as Error);
      }
    },
    [setTransactions, _transactions]
  );

  const clearTransactionError = useCallback(() => {
    setTransactionError(undefined);
  }, []);

  const getTransactionPaging = useCallback(
    (walletId?: string) => {
      if (!walletId) {
        return undefined;
      }
      const transaction = _transactions.find(
        (item) => item.walletId === walletId
      );
      return transaction?.paging;
    },
    [_transactions]
  );

  const groupTransactions = useCallback(
    (walletId?: string) => {
      if (!walletId) {
        return [];
      }
      const walletTransaction = _transactions.find(
        (item) => item.walletId === walletId
      );
      const data = walletTransaction?.data;
      if (!data) {
        return [];
      }

      const sortedByDate = orderBy<Transaction>(
        data,
        [(txn: any) => new Date(txn.txnDateTime)],
        ['desc']
      );
      const group = groupBy<Transaction>(
        sortedByDate,
        (transaction: Transaction) =>
          moment(transaction.txnDateTime).format('DD MMM YYYY')
      );
      return Object.keys(group).map((key) => ({
        section: key,
        data: orderBy<Transaction>(group[key], ['txnId'], ['desc']),
      }));
    },
    [_transactions]
  );

  const getTransactionSummary = useCallback(
    (walletId?: string) => {
      if (!walletId) {
        return undefined;
      }
      const walletTransaction = _transactions.find(
        (item) => item.walletId === walletId
      );
      const summary = walletTransaction?.summary;

      if (!summary) {
        return undefined;
      }
      return summary;
    },
    [_transactions]
  );

  const clearTransactions = useCallback(() => {
    setTransactions([]);
  }, []);

  return useMemo(
    () => ({
      transactions: _transactions,
      fetchTransactions,
      transactionError: _transactionError,
      clearTransactionError,
      isLoadingTransaction: _isLoading,
      refreshTransactions,
      isRefreshingTransaction: _isRefreshing,
      getTransactionPaging,
      groupTransactions,
      getTransactionSummary,
      clearTransactions,
    }),
    [_transactions, _transactionError, _isLoading, _isRefreshing]
  );
}
