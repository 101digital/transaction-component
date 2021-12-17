import React, { ReactNode } from 'react';
import { TransactionContext, useTransactionContextValue } from './transaction-context';

export type TransactionProviderProps = {
  children: ReactNode;
};

const TransactionProvider = (props: TransactionProviderProps) => {
  const { children } = props;
  const transactionContextData = useTransactionContextValue();

  return (
    <TransactionContext.Provider value={transactionContextData}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
