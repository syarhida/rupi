
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/components/TransactionList';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formatCurrency } from '@/lib/utils';
import { Edit, Trash2 } from 'lucide-react';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  wallets: { id: string; name: string }[];
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedTransaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  walletId: z.string().min(1, "Wallet is required"),
  toWalletId: z.string().optional(),
});

export function TransactionDetailModal({
  transaction,
  wallets,
  open,
  onClose,
  onUpdate,
  onDelete
}: TransactionDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: transaction?.description || '',
      amount: transaction?.amount || 0,
      category: transaction?.category || '',
      walletId: transaction?.walletId || '',
      toWalletId: transaction?.toWalletId || ''
    },
    values: {
      description: transaction?.description || '',
      amount: transaction?.amount || 0,
      category: transaction?.category || '',
      walletId: transaction?.walletId || '',
      toWalletId: transaction?.toWalletId || ''
    }
  });

  const resetState = () => {
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    if (!transaction) return;
    
    onUpdate({
      ...transaction,
      description: values.description,
      amount: values.amount,
      category: values.category,
      walletId: values.walletId,
      toWalletId: transaction.type === 'transfer' ? values.toWalletId : undefined
    });

    handleClose();
  };

  const handleDelete = () => {
    if (!transaction) return;
    onDelete(transaction.id);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {transaction && !isEditing && !isDeleting && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Transaction Details</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                View, edit, or delete this transaction
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{transaction.description}</h3>
                <span className={`font-bold ${
                  transaction.type === 'expense' ? 'text-rupi-negative' :
                  transaction.type === 'income' ? 'text-rupi-positive' :
                  'text-muted-foreground'
                }`}>
                  {transaction.type === 'expense' ? '-' : 
                   transaction.type === 'income' ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="capitalize">{transaction.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p>{transaction.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p>{transaction.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Wallet</p>
                  <p>{wallets.find(w => w.id === transaction.walletId)?.name || 'Unknown'}</p>
                </div>
                {transaction.type === 'transfer' && transaction.toWalletId && (
                  <div>
                    <p className="text-muted-foreground">To Wallet</p>
                    <p>{wallets.find(w => w.id === transaction.toWalletId)?.name || 'Unknown'}</p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="flex sm:justify-between !justify-between">
              <Button 
                variant="destructive"
                onClick={() => setIsDeleting(true)}
                className="gap-2"
              >
                <Trash2 size={16} /> Delete
              </Button>
              <Button 
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit size={16} /> Edit
              </Button>
            </DialogFooter>
          </>
        )}

        {transaction && isEditing && (
          <>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
              <DialogDescription>
                Make changes to your transaction here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Category" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="walletId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a wallet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wallets.map((wallet) => (
                            <SelectItem key={wallet.id} value={wallet.id}>
                              {wallet.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {transaction.type === 'transfer' && (
                  <FormField
                    control={form.control}
                    name="toWalletId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Wallet</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a wallet" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {wallets.map((wallet) => (
                              <SelectItem key={wallet.id} value={wallet.id}>
                                {wallet.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}

        {transaction && isDeleting && (
          <>
            <DialogHeader>
              <DialogTitle>Delete Transaction</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this transaction? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="p-4 border rounded-md bg-muted/10">
                <h4 className="font-medium">{transaction.description}</h4>
                <p className="text-sm text-muted-foreground">{transaction.date} • {formatCurrency(transaction.amount)}</p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDeleting(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
