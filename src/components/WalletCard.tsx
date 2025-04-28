
import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface WalletCardProps {
  name: string;
  balance: number;
  id: string;
  color?: string;
}

export function WalletCard({ name, balance, id, color = "bg-rupi-accent" }: WalletCardProps) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-sm ${color} text-rupi-accent-foreground h-full flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm opacity-80">{name}</h3>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
          <path d="M7 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="mt-3">
        <p className="text-xl font-bold">{formatCurrency(balance)}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs opacity-80">ID: {id.substring(0, 8)}</div>
        </div>
      </div>
    </div>
  );
}
