
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface MobileSummaryProps {
  income: number;
  expense: number;
}

export function MobileSummary({ income, expense }: MobileSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl bg-rupi-positive/10 p-4">
        <div className="flex items-center space-x-2 text-rupi-positive">
          <ArrowUpRight className="h-5 w-5" />
          <span>Income</span>
        </div>
        <p className="mt-2 text-xl font-semibold text-rupi-positive">
          {formatCurrency(income)}
        </p>
      </div>

      <div className="rounded-2xl bg-rupi-negative/10 p-4">
        <div className="flex items-center space-x-2 text-rupi-negative">
          <ArrowDownLeft className="h-5 w-5" />
          <span>Expenses</span>
        </div>
        <p className="mt-2 text-xl font-semibold text-rupi-negative">
          {formatCurrency(expense)}
        </p>
      </div>
    </div>
  );
}
