import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowDownLeft, ArrowUpRight, ArrowRight, Wallet } from 'lucide-react';

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
  
  const formatDate = (date: string) => {
    const d = new Date(date);
    return {
      day: d.getDate(),
      month: d.toLocaleString('default', { month: 'long' }),
      weekday: d.toLocaleString('default', { weekday: 'long' })
    };
  };

  const groupedTransactions = displayedTransactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, dayTransactions]) => {
        const { day, month, weekday } = formatDate(date);
        const dayTotal = dayTransactions.reduce((sum, tx) => 
          sum + (tx.type === 'expense' ? -tx.amount : tx.amount), 0
        );

        return (
          <div key={date} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{month} {day}</h3>
                <p className="text-sm text-muted-foreground">{weekday}</p>
              </div>
              <span className={dayTotal >= 0 ? 'text-rupi-positive' : 'text-rupi-negative'}>
                {formatCurrency(dayTotal)}
              </span>
            </div>

            <div className="space-y-2">
              {dayTransactions.map((transaction) => (
                <div key={transaction.id} className="rupi-surface p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-full p-2 ${
                        transaction.type === 'expense' ? 'bg-rupi-negative/10 text-rupi-negative' :
                        transaction.type === 'income' ? 'bg-rupi-positive/10 text-rupi-positive' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {transaction.type === 'expense' ? <ArrowDownLeft className="h-5 w-5" /> :
                         transaction.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> :
                         <ArrowRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                      <span className={`font-medium ${
                        transaction.type === 'expense' ? 'text-rupi-negative' :
                        transaction.type === 'income' ? 'text-rupi-positive' :
                        'text-muted-foreground'
                      }`}>
                        {transaction.type === 'expense' ? '-' : 
                         transaction.type === 'income' ? '+' : ''}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
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
