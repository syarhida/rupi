
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionModal } from '@/components/TransactionModal';
import { TransactionList, Transaction, TransactionType } from '@/components/TransactionList';
import { generateSampleTransactions, generateSampleWallets, generateId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { TransactionDetailModal } from '@/components/TransactionDetailModal';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(generateSampleTransactions());
  const [wallets] = useState(generateSampleWallets());
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>('expense');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
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
      title: `${transactionData.type === 'income' ? 'Pemasukan' : transactionData.type === 'expense' ? 'Pengeluaran' : 'Transfer'} ditambahkan`,
      description: `${transactionData.description} berhasil dicatat.`
    });
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map(tx => 
      tx.id === updatedTransaction.id ? updatedTransaction : tx
    ));
    toast({
      title: "Transaksi diperbarui",
      description: `${updatedTransaction.description} berhasil diperbarui.`
    });
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions(transactions.filter(tx => tx.id !== transactionId));
    toast({
      title: "Transaksi dihapus",
      description: "Transaksi berhasil dihapus."
    });
  };

  const openTransactionModal = (type: TransactionType) => {
    setTransactionType(type);
    setIsTransactionModalOpen(true);
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-50">Transaksi</h1>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              onClick={() => openTransactionModal('expense')} 
              size="sm"
              className="transition-all duration-200 hover:scale-105"
            >
              <Plus size={16} className="mr-1" /> Pengeluaran
            </Button>
            <Button 
              onClick={() => openTransactionModal('income')} 
              size="sm" 
              className="bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 hover:scale-105"
            >
              <Plus size={16} className="mr-1" /> Pemasukan
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => openTransactionModal('transfer')} 
              size="sm"
              className="transition-all duration-200 hover:scale-105"
            >
              <Plus size={16} className="mr-1" /> Transfer
            </Button>
          </div>
        </div>

        <div className="rupi-card transition-all duration-300 hover:shadow-lg">
          <TransactionList 
            transactions={transactions} 
            onTransactionClick={handleTransactionClick}
          />
        </div>
      </div>

      <TransactionModal 
        open={isTransactionModalOpen} 
        onClose={() => setIsTransactionModalOpen(false)} 
        onSave={handleAddTransaction} 
        wallets={wallets.map(wallet => ({
          id: wallet.id,
          name: wallet.name
        }))} 
        type={transactionType} 
      />

      <TransactionDetailModal
        transaction={selectedTransaction}
        wallets={wallets.map(wallet => ({
          id: wallet.id,
          name: wallet.name
        }))}
        open={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onUpdate={handleUpdateTransaction}
        onDelete={handleDeleteTransaction}
      />
    </Layout>
  );
};

export default TransactionsPage;
