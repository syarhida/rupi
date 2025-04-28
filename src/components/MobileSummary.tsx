import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
interface MobileSummaryProps {
  income: number;
  expense: number;
}
export function MobileSummary({
  income,
  expense
}: MobileSummaryProps) {
  return <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl p-4 bg-emerald-500">
        <div className="flex items-center space-x-2 text-rupi-positive">
          <ArrowUpRight className="h-5 w-5" />
          <span className="text-slate-50 text-base font-normal">Income</span>
        </div>
        <p className="mt-2 text-xl text-slate-50 font-bold">
          {formatCurrency(income)}
        </p>
      </div>

      <div className="rounded-2xl p-4 bg-zinc-300">
        <div className="flex items-center space-x-2 text-rupi-negative">
          <ArrowDownLeft className="h-5 w-5" />
          <span className="text-neutral-950">Expenses</span>
        </div>
        <p className="mt-2 text-xl font-bold text-neutral-950">
          {formatCurrency(expense)}
        </p>
      </div>
    </div>;
}