import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { WalletCard } from '@/components/WalletCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WalletModal } from '@/components/WalletModal';
import { generateSampleWallets, generateId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
interface Wallet {
  id: string;
  name: string;
  balance: number;
  color: string;
}
const WalletsPage = () => {
  const [wallets, setWallets] = useState<Wallet[]>(generateSampleWallets());
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleAddWallet = (walletData: {
    name: string;
    initialBalance: number;
    color: string;
  }) => {
    const newWallet: Wallet = {
      id: `wallet-${generateId()}`,
      name: walletData.name,
      balance: walletData.initialBalance,
      color: walletData.color
    };
    setWallets([...wallets, newWallet]);
    toast({
      title: "Wallet created",
      description: `Your ${walletData.name} wallet has been created successfully.`
    });
  };
  return <Layout>
      <div className="space-y-6 px-px">
        <div className="flex justify-between items-center py-0 px-0">
          <h1 className="text-2xl font-bold text-slate-50">Dompet Saya</h1>
          <Button onClick={() => setIsWalletModalOpen(true)}>
            <Plus size={18} className="mr-1" /> New Wallet
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map(wallet => <WalletCard key={wallet.id} id={wallet.id} name={wallet.name} balance={wallet.balance} color={wallet.color} />)}
          <button onClick={() => setIsWalletModalOpen(true)} className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-4 h-full text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
            <Plus size={24} />
            <span className="mt-2">Add Wallet</span>
          </button>
        </div>
      </div>

      <WalletModal open={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} onSave={handleAddWallet} />
    </Layout>;
};
export default WalletsPage;