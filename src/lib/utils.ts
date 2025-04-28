
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Sample data generation functions
export function generateSampleWallets() {
  return [
    { 
      id: 'wallet-1', 
      name: 'Cash', 
      balance: 2500000, 
      color: 'bg-rupi-accent' 
    },
    { 
      id: 'wallet-2', 
      name: 'Bank BCA', 
      balance: 15000000, 
      color: 'bg-blue-500' 
    },
    { 
      id: 'wallet-3', 
      name: 'E-Wallet', 
      balance: 750000, 
      color: 'bg-purple-500' 
    }
  ];
}

export function generateSampleTransactions() {
  const now = new Date();
  
  return [
    { 
      id: 'tx-1', 
      type: 'income' as const, 
      amount: 10000000, 
      description: 'Monthly Salary', 
      category: 'Salary', 
      date: formatDate(now), 
      walletId: 'wallet-2' 
    },
    { 
      id: 'tx-2', 
      type: 'expense' as const, 
      amount: 1500000, 
      description: 'Apartment Rent', 
      category: 'Housing', 
      date: formatDate(new Date(now.getTime() - 86400000)), 
      walletId: 'wallet-2' 
    },
    { 
      id: 'tx-3', 
      type: 'expense' as const, 
      amount: 250000, 
      description: 'Groceries', 
      category: 'Food & Drinks', 
      date: formatDate(new Date(now.getTime() - 172800000)), 
      walletId: 'wallet-1' 
    },
    { 
      id: 'tx-4', 
      type: 'transfer' as const, 
      amount: 1000000, 
      description: 'Transfer to Cash', 
      category: 'Transfer', 
      date: formatDate(new Date(now.getTime() - 259200000)), 
      walletId: 'wallet-2', 
      toWalletId: 'wallet-1' 
    },
    { 
      id: 'tx-5', 
      type: 'income' as const, 
      amount: 500000, 
      description: 'Freelance Project', 
      category: 'Business', 
      date: formatDate(new Date(now.getTime() - 345600000)), 
      walletId: 'wallet-3' 
    }
  ];
}

export function generateSampleCashflowData() {
  return [
    { name: "Jan", income: 9500000, expense: 7200000 },
    { name: "Feb", income: 9800000, expense: 7500000 },
    { name: "Mar", income: 10200000, expense: 7900000 },
    { name: "Apr", income: 10500000, expense: 8100000 },
    { name: "May", income: 11000000, expense: 8500000 },
    { name: "Jun", income: 10500000, expense: 7800000 }
  ];
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
}
