import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
interface MobileHeaderProps {
  balance: number;
}
export function MobileHeader({
  balance
}: MobileHeaderProps) {
  return <div className="space-y-2 pt-4 py-0">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-50">Halo, Pengguna!</h1>
        <Button variant="ghost" size="icon" className="rounded-full text-slate-50 bg-neutral-900 hover:bg-neutral-800">
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-4xl font-bold tracking-tight text-slate-50">
        {formatCurrency(balance)}
      </p>
    </div>;
}