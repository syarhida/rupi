
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
const SettingsPage = () => {
  const [accentColor, setAccentColor] = useState('green');
  const [currency, setCurrency] = useState('IDR');
  const {
    toast
  } = useToast();
  const handleSaveSettings = () => {
    toast({
      title: "Pengaturan tersimpan",
      description: "Preferensi Anda telah diperbarui."
    });
  };
  return <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-50">Pengaturan</h1>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="appearance">Tampilan</TabsTrigger>
            <TabsTrigger value="preferences">Preferensi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-6">
            <div className="rupi-card space-y-4">
              <h2 className="text-xl font-bold text-slate-50">Tema</h2>
              
              <div className="grid gap-2">
                <Label htmlFor="accent-color">Warna Aksen</Label>
                <Select value={accentColor} onValueChange={setAccentColor}>
                  <SelectTrigger id="accent-color">
                    <SelectValue placeholder="Pilih warna aksen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">Hijau</SelectItem>
                    <SelectItem value="blue">Biru</SelectItem>
                    <SelectItem value="purple">Ungu</SelectItem>
                    <SelectItem value="orange">Jingga</SelectItem>
                    <SelectItem value="pink">Merah Muda</SelectItem>
                  </SelectContent>
                </Select>
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
    </Layout>;
};
export default SettingsPage;
