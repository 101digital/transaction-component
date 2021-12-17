# `@banking-component/transaction-component`

Manage transactions of linked wallets

## Table Of Content

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Assets And Multiple Languages](#assets-and-multiple-languages)
- [API Reference](#api-reference)
  - [TransactionService](#transactionservice)
  - [TransactionContext](#transactioncontext)
  - [TransactionComponent](#transactioncomponent)

## Features

- Display aggregated wallet
- Show all transaction of a wallet and total money in, out

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://github.com/101digital/transaction-component.git
```

- Installed [@banking-component/core](/packages/core)
- Installed [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)

If have any issue while installing, can see [Issue While Installing Sub-Component](https://github.com/101digital/react-native-banking-components/blob/master/README.md)

## Quick Start

- `TransactionService` is initiated should be from `App.ts`

```javascript
import { TransactionService } from '@banking-component/transaction-component';

TransactionService.instance().initClients({
  walletClient: createAuthorizedApiClient(wallet), // Your Axios authorized client Wallet Url
});
```

- Wrapped the app with `TransactionProvider`

```javascript
import { TransactionProvider } from '@banking-component/transaction-component';

const App = () => {
  return (
    <View>
      <TransactionProvider>{/* YOUR APP COMPONENTS */}</TransactionProvider>
    </View>
  );
};

export default App;
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props inside each component

- In order to do multiple languages, you need to pass `i18n` (`i18n` should be configurated in the app level) into `TransactionComponent` as a root props. And then, you have to copy and paste all attributes of `transaction_component` in [texts](transaction-component-data.json) into your app locale file. You can also change text value, but DON'T change the key.

- Example

```javascript
const TestScreen = () => {
  return (
    <View>
      <TransactionComponent
        Root={{
          props: {
            i18n: i18n,
            formatCurrency: currencyFormatter,
          },
        }}
      />
    </View>
  );
};

export default TestScreen;
```

## API Reference

### TransactionService

Manage transaction services connect to BE. First of all, you need init `TransactionService` soon, should be from `App.ts`

List of functions:

- `getTransactions(walletIds: string, pageNumber?: number)`: get transaction by walletId, support paging

### TransactionContext

```javascript
export interface TransationContextData {
  transactions: WalletTransaction[]; // transactions list
  isLoadingTransaction: boolean; // fetching transaction status
  isRefreshingTransaction: boolean; // refreshing transaction status
  transactionError?: Error; // Error while fetch transaction
  clearTransactionError: () => void; // Clear all transaction error
  fetchTransactions: (walletId?: string, pageNumber?: number) => void; // fetch transactions by wallet id and page
  refreshTransactions: (walletId?: string) => void; // refresh transactions
  getTransactionPaging: (walletId?: string) => Paging | undefined; // get current paging of transction
  groupTransactions: (walletId?: string) => GroupedTransactions | undefined; // group transaction by transaction date
  getTransactionSummary: (walletId?: string) => TransactionSummary | undefined; // get transaction summary by walletId
}
```

### TransactionComponent

- Props, styles and component can be found [here](./src/types.ts)

- Example

```javascript
import { currencyFormatter } from '@/helpers/currency-formatter';
import { TransactionComponent, TransactionContext } from '@banking-component/transaction-component';
import { WalletContext } from '@banking-component/wallet-component';
import { Wallet } from '@banking-component/core';
import { AlertModal } from 'react-native-theme-component';

const { width } = Dimensions.get('window');

export type TransactionScreenParams = {
  wallet?: Wallet,
};

const TransactionsScreen = ({ navigation, route }: TransactionScreenProps) => {
  const initWallet = route?.params?.wallet;

  const { transactionError, clearTransactionError } = useContext(TransactionContext);
  const { wallets, getAggregatedWallets } = useContext(WalletContext);

  const handleAddBankAccountPressed = () => {
    navigation.navigate(Route.SELECT_BANK);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TransactionComponent
          CarouselItem={{
            props: {
              carouselItemWidth: width - 32, // wallet carousel item width
              carouselWidth: width,
            },
          }}
          Root={{
            props: {
              wallets: wallets,
              aggregatedWallets: getAggregatedWallets(),
              initWallet,
              formatCurrency: currencyFormatter,
            },
          }}
          EmptyWallet={{
            props: {
              onLinkAccountPressed: handleAddBankAccountPressed,
            },
          }}
        />
      </SafeAreaView>
      <AlertModal
        isVisible={!isEmpty(transactionError?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill='red' />}
        onClose={clearTransactionError}
        onConfirmed={clearTransactionError}
        message={transactionError?.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 40,
  },
  transactionsList: {
    paddingBottom: 16,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#DEDEDE',
    marginHorizontal: 30,
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  dot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    paddingHorizontal: 2,
    backgroundColor: palette.primary,
  },
  dotContainer: {
    marginHorizontal: 4,
  },
});

export default TransactionsScreen;
```
