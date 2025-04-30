
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileSummaryProps {
  income: number;
  expense: number;
}

export function MobileSummary({
  income,
  expense
}: MobileSummaryProps) {
  return <div className="grid grid-cols-2 gap-4">
      <Link 
        to="/income" 
        className="rounded-2xl p-4 bg-emerald-500 transition-transform duration-200 hover:scale-102 active:scale-98"
      >
        <div className="flex items-center space-x-2 text-rupi-positive">
          <ArrowUpRight className="h-5 w-5" />
          <span className="text-slate-50 font-semibold text-sm">Pemasukan</span>
        </div>
        <p className="mt-2 text-slate-50 font-extrabold text-base">
          {formatCurrency(income)}
        </p>
      </Link>

      <Link 
        to="/expenses" 
        className="rounded-2xl p-4 bg-neutral-300 transition-transform duration-200 hover:scale-102 active:scale-98"
      >
        <div className="flex items-center space-x-2 text-rupi-negative">
          <ArrowDownLeft className="h-5 w-5" />
          <span className="text-sm font-semibold text-neutral-800">Pengeluaran</span>
        </div>
        <p className="mt-2 font-extrabold text-base text-neutral-800">
          {formatCurrency(expense)}
        </p>
      </Link>
    </div>;
}
