
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface MobileHeaderProps {
  balance: number;
}

export function MobileHeader({ balance }: MobileHeaderProps) {
  return (
    <div className="space-y-2 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hi there</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-4xl font-bold tracking-tight">
        {formatCurrency(balance)}
      </p>
    </div>
  );
}
