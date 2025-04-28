
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, ArrowRight } from 'lucide-react';

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  walletId: string;
  toWalletId?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
  showViewAll?: boolean;
}

export function TransactionList({ transactions, limit, showViewAll = false }: TransactionListProps) {
  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="space-y-4">
      {displayedTransactions.length === 0 ? (
        <p className="text-center py-6 text-muted-foreground">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {displayedTransactions.map((transaction) => (
            <div key={transaction.id} className="rupi-card flex items-center">
              <div className={`
                rounded-full p-2 mr-3
                ${transaction.type === 'income' ? 'bg-rupi-positive/10 text-rupi-positive' : 
                  transaction.type === 'expense' ? 'bg-rupi-negative/10 text-rupi-negative' : 
                  'bg-muted text-muted-foreground'}
              `}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight size={20} />
                ) : transaction.type === 'expense' ? (
                  <ArrowDownLeft size={20} />
                ) : (
                  <ArrowRight size={20} />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category}</p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'income' ? 'text-rupi-positive' : 
                  transaction.type === 'expense' ? 'text-rupi-negative' : 
                  'text-muted-foreground'
                }`}>
                  {transaction.type === 'income' ? '+' : 
                   transaction.type === 'expense' ? '-' : ''}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showViewAll && transactions.length > 0 && (
        <div className="text-center pt-2">
          <Link to="/transactions" className="text-sm text-primary hover:underline">
            View all transactions
          </Link>
        </div>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';
