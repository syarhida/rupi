import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { WalletCard } from '@/components/WalletCard';
import { TransactionList } from '@/components/TransactionList';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileSummary } from '@/components/MobileSummary';
import { generateSampleWallets, generateSampleTransactions, generateId } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletModal } from '@/components/WalletModal';
import { TransactionModal } from '@/components/TransactionModal';
import { FinancialSummary } from '@/components/FinancialSummary';
import { CashflowChart } from '@/components/CashflowChart';
import { TransactionDetailModal } from '@/components/TransactionDetailModal';
interface Wallet {
  id: string;
  name: string;
  balance: number;
  color: string;
}
interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  description: string;
  category: string;
  date: string;
  walletId: string;
  toWalletId?: string;
}
const Index = () => {
  const [wallets, setWallets] = useState<Wallet[]>(generateSampleWallets());
  const [transactions, setTransactions] = useState<Transaction[]>(generateSampleTransactions());
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense' | 'transfer'>('expense');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const isMobile = useIsMobile();
  const {
    toast
  } = useToast();

  // Calculate financial summary
  const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const balance = totalIncome - totalExpense;

  // Add new wallet
  const handleAddWallet = (walletData: {
    name: string;
    initialBalance: number;
    color: string;
  }) => {
    const newWallet = {
      id: `wallet-${generateId()}`,
      name: walletData.name,
      balance: walletData.initialBalance,
      color: walletData.color
    };
    setWallets([...wallets, newWallet]);
    toast({
      title: "Dompet dibuat",
      description: `Dompet ${walletData.name} berhasil dibuat.`
    });
  };

  // Add new transaction
  const handleAddTransaction = (transactionData: {
    type: 'income' | 'expense' | 'transfer';
    amount: number;
    description: string;
    category: string;
    walletId: string;
    toWalletId?: string;
  }) => {
    const now = new Date();

    // Create new transaction
    const newTransaction = {
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

    // Add transaction to list
    setTransactions([newTransaction, ...transactions]);

    // Update wallet balances
    setWallets(wallets.map(wallet => {
      if (wallet.id === transactionData.walletId) {
        // Source wallet
        let newBalance = wallet.balance;
        if (transactionData.type === 'income') {
          newBalance += transactionData.amount;
        } else if (transactionData.type === 'expense') {
          newBalance -= transactionData.amount;
        } else if (transactionData.type === 'transfer') {
          newBalance -= transactionData.amount;
        }
        return {
          ...wallet,
          balance: newBalance
        };
      } else if (wallet.id === transactionData.toWalletId) {
        // Destination wallet for transfers
        return {
          ...wallet,
          balance: wallet.balance + transactionData.amount
        };
      }
      return wallet;
    }));

    // Show success notification
    toast({
      title: `${transactionData.type === 'income' ? 'Pemasukan' : transactionData.type === 'expense' ? 'Pengeluaran' : 'Transfer'} ditambahkan`,
      description: `${transactionData.description} berhasil dicatat.`
    });
  };

  // Update an existing transaction
  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map(tx => tx.id === updatedTransaction.id ? updatedTransaction : tx));
    toast({
      title: "Transaksi diperbarui",
      description: `${updatedTransaction.description} berhasil diperbarui.`
    });
  };

  // Delete a transaction
  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions(transactions.filter(tx => tx.id !== transactionId));
    toast({
      title: "Transaksi dihapus",
      description: "Transaksi berhasil dihapus."
    });
  };

  // Open transaction modal with specific type
  const openTransactionModal = (type: 'income' | 'expense' | 'transfer') => {
    setTransactionType(type);
    setIsTransactionModalOpen(true);
  };

  // Handle transaction click to open detail modal
  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };
  return <Layout>
      <div className="space-y-4 pb-20 md:px-6 px-0">
        {isMobile && <>
            <MobileHeader balance={balance} />
            <MobileSummary income={totalIncome} expense={totalExpense} />
          </>}
        
        {!isMobile && <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-50">Dasbor</h1>
                <p className="text-muted-foreground">Selamat datang!</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setIsWalletModalOpen(true)} variant="outline" className="flex-1 md:flex-none text-slate-50 px-0 text-center">
                  <Plus size={18} className="mr-1" /> Dompet Baru
                </Button>
                <Button onClick={() => openTransactionModal('expense')} variant="destructive" className="flex-1 md:flex-none">
                  <Plus size={18} className="mr-1" /> Pengeluaran
                </Button>
                <Button onClick={() => openTransactionModal('income')} className="flex-1 md:flex-none bg-rupi-positive hover:bg-rupi-positive/90">
                  <Plus size={18} className="mr-1" /> Pemasukan
                </Button>
              </div>
            </div>

            {/* Financial Summary */}
            <FinancialSummary income={totalIncome} expense={totalExpense} balance={balance} />
            
            {/* Wallets */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-slate-50">Dompet Anda</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wallets.map(wallet => <WalletCard key={wallet.id} id={wallet.id} name={wallet.name} balance={wallet.balance} color={wallet.color} />)}
                <button onClick={() => setIsWalletModalOpen(true)} className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-4 h-full text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                  <Plus size={24} />
                  <span className="mt-2">Tambah Dompet</span>
                </button>
              </div>
            </div>
          </>}

        <div className="space-y-4">
          <TransactionList transactions={transactions} showViewAll onTransactionClick={handleTransactionClick} />
        </div>
      </div>

      {/* Floating Action Button for mobile */}
      {isMobile && <Button onClick={() => openTransactionModal('expense')} size="lg" className="fixed bottom-20 right-4 h-14 w-14 rounded-full p-0 text-slate-50 bg-emerald-500 hover:bg-emerald-400">
          <Plus className="h-6 w-6" />
        </Button>}

      {/* Modals */}
      <WalletModal open={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} onSave={handleAddWallet} />
      
      <TransactionModal open={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} onSave={handleAddTransaction} wallets={wallets.map(wallet => ({
      id: wallet.id,
      name: wallet.name
    }))} type={transactionType} />

      <TransactionDetailModal transaction={selectedTransaction} wallets={wallets.map(wallet => ({
      id: wallet.id,
      name: wallet.name
    }))} open={!!selectedTransaction} onClose={() => setSelectedTransaction(null)} onUpdate={handleUpdateTransaction} onDelete={handleDeleteTransaction} />
    </Layout>;
};
export default Index;