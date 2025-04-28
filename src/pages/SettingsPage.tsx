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
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
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
                <Label htmlFor="accent-color">Accent Color</Label>
                <Select value={accentColor} onValueChange={setAccentColor}>
                  <SelectTrigger id="accent-color">
                    <SelectValue placeholder="Select accent color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <div className="rupi-card space-y-4">
              <h2 className="text-xl font-bold text-slate-50">Wilayah</h2>
              
              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDR">Indonesian Rupiah (Rp)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
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