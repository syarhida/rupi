import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, Circle } from 'lucide-react';
interface FinancialSummaryProps {
  income: number;
  expense: number;
  balance: number;
}
export function FinancialSummary({
  income,
  expense,
  balance
}: FinancialSummaryProps) {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rupi-card">
        <div className="flex items-center">
          <div className="bg-rupi-positive/10 text-rupi-positive rounded-full p-2 mr-3">
            <ArrowUpRight size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Pemasukan</p>
            <p className="text-lg font-bold text-slate-50">{formatCurrency(income)}</p>
          </div>
        </div>
      </div>

      <div className="rupi-card">
        <div className="flex items-center">
          <div className="bg-rupi-negative/10 text-rupi-negative rounded-full p-2 mr-3">
            <ArrowDownLeft size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Pengeluaran</p>
            <p className="text-lg font-bold text-slate-50">{formatCurrency(expense)}</p>
          </div>
        </div>
      </div>

      <div className="rupi-card">
        <div className="flex items-center">
          <div className="bg-muted text-muted-foreground rounded-full p-2 mr-3">
            <Circle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Saldo</p>
            <p className={`text-lg font-bold ${balance >= 0 ? 'text-rupi-positive' : 'text-rupi-negative'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>
    </div>;
}