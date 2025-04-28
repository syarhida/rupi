
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionModal } from '@/components/TransactionModal';
import { TransactionList, Transaction, TransactionType } from '@/components/TransactionList';
import { generateSampleTransactions, generateSampleWallets, generateId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(generateSampleTransactions());
  const [wallets] = useState(generateSampleWallets());
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>('expense');
  const { toast } = useToast();

  const handleAddTransaction = (transactionData: {
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
    walletId: string;
    toWalletId?: string;
  }) => {
    const now = new Date();
    
    const newTransaction: Transaction = {
      id: `tx-${generateId()}`,
      type: transactionData.type,
      amount: transactionData.amount,
      description: transactionData.description,
      category: transactionData.category,
      date: now.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      walletId: transactionData.walletId,
      toWalletId: transactionData.toWalletId
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    toast({
      title: `${transactionData.type === 'income' ? 'Income' : 
              transactionData.type === 'expense' ? 'Expense' : 'Transfer'} added`,
      description: `${transactionData.description} has been recorded successfully.`
    });
  };

  const openTransactionModal = (type: TransactionType) => {
    setTransactionType(type);
    setIsTransactionModalOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Transactions</h1>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              onClick={() => openTransactionModal('expense')}
              size="sm"
            >
              <Plus size={16} className="mr-1" /> Expense
            </Button>
            <Button 
              className="bg-rupi-positive hover:bg-rupi-positive/90" 
              onClick={() => openTransactionModal('income')}
              size="sm"
            >
              <Plus size={16} className="mr-1" /> Income
            </Button>
            <Button 
              variant="secondary"
              onClick={() => openTransactionModal('transfer')}
              size="sm"
            >
              <Plus size={16} className="mr-1" /> Transfer
            </Button>
          </div>
        </div>

        <div className="rupi-card">
          <TransactionList transactions={transactions} />
        </div>
      </div>

      <TransactionModal
        open={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSave={handleAddTransaction}
        wallets={wallets.map(wallet => ({ id: wallet.id, name: wallet.name }))}
        type={transactionType}
      />
    </Layout>
  );
};

export default TransactionsPage;
