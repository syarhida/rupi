import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionModal } from '@/components/TransactionModal';
import { TransactionList, Transaction } from '@/components/TransactionList';
import { generateSampleTransactions, generateSampleWallets, generateId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
const IncomePage = () => {
  const [transactions, setTransactions] = useState(generateSampleTransactions().filter(tx => tx.type === 'income'));
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
      type: 'income' as const,
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
      title: 'Income added',
      description: `${transactionData.description} has been recorded successfully.`
    });
  };
  return <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center px-[16px] py-[16px]">
          <h1 className="text-2xl font-bold text-slate-50">Income</h1>
          <Button onClick={() => setIsTransactionModalOpen(true)} className="text-slate-50 bg-emerald-500 hover:bg-emerald-400 font-bold">
            <Plus size={18} className="mr-1" /> New Income
          </Button>
        </div>

        <div className="rupi-card">
          <TransactionList transactions={transactions} />
        </div>
      </div>

      <TransactionModal open={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} onSave={handleAddTransaction} wallets={wallets.map(wallet => ({
      id: wallet.id,
      name: wallet.name
    }))} type="income" />
    </Layout>;
};
export default IncomePage;