
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionModal } from '@/components/TransactionModal';
import { TransactionList, Transaction } from '@/components/TransactionList';
import { generateSampleTransactions, generateSampleWallets, generateId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
const ExpensesPage = () => {
  const [transactions, setTransactions] = useState(generateSampleTransactions().filter(tx => tx.type === 'expense'));
  const [wallets] = useState(generateSampleWallets());
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleAddTransaction = (transactionData: {
    type: 'income' | 'expense' | 'transfer';
    amount: number;
    description: string;
    category: string;
    walletId: string;
  }) => {
    const now = new Date();
    const newTransaction = {
      id: `tx-${generateId()}`,
      type: 'expense' as const,
      amount: transactionData.amount,
      description: transactionData.description,
      category: transactionData.category,
      date: now.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      walletId: transactionData.walletId
    };
    setTransactions([newTransaction, ...transactions]);
    toast({
      title: 'Pengeluaran ditambahkan',
      description: `${transactionData.description} berhasil dicatat.`
    });
  };
  return <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mx-0 px-0 py-0">
          <h1 className="text-2xl font-bold text-slate-50">Pengeluaran</h1>
          <Button variant="destructive" onClick={() => setIsTransactionModalOpen(true)}>
            <Plus size={18} className="mr-1" /> Pengeluaran Baru
          </Button>
        </div>

        <div className="rupi-card">
          <TransactionList transactions={transactions} />
        </div>
      </div>

      <TransactionModal open={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} onSave={handleAddTransaction} wallets={wallets.map(wallet => ({
      id: wallet.id,
      name: wallet.name
    }))} type="expense" />
    </Layout>;
};
export default ExpensesPage;
