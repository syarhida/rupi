
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const [currency, setCurrency] = useState('IDR');
  const [accountName, setAccountName] = useState('Pengguna');
  const { toast } = useToast();

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedAccountName = localStorage.getItem('accountName');
    if (savedAccountName) {
      setAccountName(savedAccountName);
    }
    
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleSaveSettings = () => {
    // Save settings to localStorage
    localStorage.setItem('accountName', accountName);
    localStorage.setItem('currency', currency);
    
    toast({
      title: "Pengaturan tersimpan",
      description: "Preferensi Anda telah diperbarui."
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-50">Pengaturan</h1>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="account">Akun</TabsTrigger>
            <TabsTrigger value="preferences">Preferensi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <div className="rupi-card space-y-4">
              <h2 className="text-xl font-bold text-slate-50">Informasi Akun</h2>
              
              <div className="grid gap-2">
                <Label htmlFor="account-name">Nama Akun</Label>
                <Input
                  id="account-name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                />
              </div>
              
              <Button onClick={handleSaveSettings} className="bg-emerald-500 hover:bg-emerald-400 text-slate-50">Simpan</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <div className="rupi-card space-y-4">
              <h2 className="text-xl font-bold text-slate-50">Wilayah</h2>
              
              <div className="grid gap-2">
                <Label htmlFor="currency">Mata Uang</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Pilih mata uang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDR">Rupiah Indonesia (Rp)</SelectItem>
                    <SelectItem value="USD">Dolar Amerika ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveSettings} className="bg-emerald-500 hover:bg-emerald-400">Simpan</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
