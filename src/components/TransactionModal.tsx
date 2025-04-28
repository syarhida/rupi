
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TransactionType } from './TransactionList';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (transaction: {
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
    walletId: string;
    toWalletId?: string;
  }) => void;
  wallets: { id: string; name: string }[];
  type?: TransactionType;
}

const EXPENSE_CATEGORIES = [
  'Food & Drinks', 'Transportation', 'Housing', 'Entertainment', 
  'Shopping', 'Utilities', 'Health', 'Education', 'Other'
];

const INCOME_CATEGORIES = [
  'Salary', 'Bonus', 'Investment', 'Gift', 'Business', 'Other'
];

export function TransactionModal({ 
  open, 
  onClose, 
  onSave, 
  wallets, 
  type = 'expense' 
}: TransactionModalProps) {
  const [transactionType, setTransactionType] = useState<TransactionType>(type);
  const [amount, setAmount] = useState('0');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [walletId, setWalletId] = useState('');
  const [toWalletId, setToWalletId] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Description is required",
        variant: "destructive",
      });
      return;
    }

    if (!walletId) {
      toast({
        title: "Error",
        description: "Please select a wallet",
        variant: "destructive",
      });
      return;
    }

    if (transactionType === 'transfer' && (!toWalletId || toWalletId === walletId)) {
      toast({
        title: "Error",
        description: "Please select different wallets for transfer",
        variant: "destructive",
      });
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    onSave({
      type: transactionType,
      amount: parsedAmount,
      description,
      category: category || (transactionType === 'income' ? 'Other Income' : 'Other Expense'),
      walletId,
      toWalletId: transactionType === 'transfer' ? toWalletId : undefined,
    });
    
    // Reset form
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTransactionType(type);
    setAmount('0');
    setDescription('');
    setCategory('');
    setWalletId('');
    setToWalletId('');
  };

  // Set categories based on transaction type
  const categories = transactionType === 'income' 
    ? INCOME_CATEGORIES
    : transactionType === 'expense'
    ? EXPENSE_CATEGORIES
    : ['Transfer'];

  // Set title based on transaction type
  const title = 
    transactionType === 'income' ? 'Add Income' :
    transactionType === 'expense' ? 'Add Expense' : 'Transfer Money';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Transaction Type</Label>
            <div className="flex rounded-md overflow-hidden">
              <button
                type="button"
                className={`flex-1 py-2 ${
                  transactionType === 'expense'
                    ? 'bg-rupi-negative text-white'
                    : 'bg-secondary text-secondary-foreground'
                }`}
                onClick={() => setTransactionType('expense')}
              >
                Expense
              </button>
              <button
                type="button"
                className={`flex-1 py-2 ${
                  transactionType === 'income'
                    ? 'bg-rupi-positive text-white'
                    : 'bg-secondary text-secondary-foreground'
                }`}
                onClick={() => setTransactionType('income')}
              >
                Income
              </button>
              <button
                type="button"
                className={`flex-1 py-2 ${
                  transactionType === 'transfer'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-secondary-foreground'
                }`}
                onClick={() => setTransactionType('transfer')}
              >
                Transfer
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (Rp)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`e.g. ${
                transactionType === 'income' 
                  ? 'Salary payment' 
                  : transactionType === 'expense'
                  ? 'Lunch at restaurant'
                  : 'Transfer to savings'
              }`}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="wallet">
              {transactionType === 'transfer' ? 'From Wallet' : 'Wallet'}
            </Label>
            <Select value={walletId} onValueChange={setWalletId}>
              <SelectTrigger id="wallet">
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent>
                {wallets.map((wallet) => (
                  <SelectItem key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {transactionType === 'transfer' && (
            <div className="grid gap-2">
              <Label htmlFor="toWallet">To Wallet</Label>
              <Select value={toWalletId} onValueChange={setToWalletId}>
                <SelectTrigger id="toWallet">
                  <SelectValue placeholder="Select destination wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets
                    .filter((wallet) => wallet.id !== walletId)
                    .map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {transactionType !== 'transfer' && (
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className={
              transactionType === 'income' 
                ? 'bg-rupi-positive hover:bg-rupi-positive/90 text-white' 
                : transactionType === 'expense'
                ? 'bg-rupi-negative hover:bg-rupi-negative/90 text-white'
                : ''
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
