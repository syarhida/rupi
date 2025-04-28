import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
interface WalletModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (wallet: {
    name: string;
    initialBalance: number;
    color: string;
  }) => void;
}
const colorOptions = [{
  value: 'bg-rupi-accent',
  label: 'Green'
}, {
  value: 'bg-blue-500',
  label: 'Blue'
}, {
  value: 'bg-purple-500',
  label: 'Purple'
}, {
  value: 'bg-orange-500',
  label: 'Orange'
}, {
  value: 'bg-pink-500',
  label: 'Pink'
}];
export function WalletModal({
  open,
  onClose,
  onSave
}: WalletModalProps) {
  const [name, setName] = useState('');
  const [initialBalance, setInitialBalance] = useState('0');
  const [color, setColor] = useState('bg-rupi-accent');
  const {
    toast
  } = useToast();
  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Wallet name is required",
        variant: "destructive"
      });
      return;
    }
    const balance = parseFloat(initialBalance) || 0;
    onSave({
      name,
      initialBalance: balance,
      color
    });

    // Reset form
    setName('');
    setInitialBalance('0');
    setColor('bg-rupi-accent');
    onClose();
  };
  return <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dompet Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Wallet Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Cash Wallet" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="initial-balance">Initial Balance (Rp)</Label>
            <Input id="initial-balance" type="number" value={initialBalance} onChange={e => setInitialBalance(e.target.value)} placeholder="0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Wallet Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger id="color">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map(option => <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${option.value}`}></div>
                      {option.label}
                    </div>
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-400">Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}