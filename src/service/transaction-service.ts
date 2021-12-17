type TransactionClient = {
  walletClient: any;
};

export class TransactionService {
  private static _instance: TransactionService = new TransactionService();

  private _walletClient?: any;

  constructor() {
    if (TransactionService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use TransactionService.getInstance() instead of new.'
      );
    }
    TransactionService._instance = this;
  }

  public static instance(): TransactionService {
    return TransactionService._instance;
  }

  public initClients = (clients: TransactionClient) => {
    this._walletClient = clients.walletClient;
  };

  getTransactions = async (walletIds: string, pageNumber?: number) => {
    if (this._walletClient) {
      const response = await this._walletClient.get('transactions', {
        params: {
          walletIds: walletIds,
          pageNumber,
          pageSize: 10,
        },
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };
}
