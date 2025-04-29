
import React from 'react';
import { Home, Wallet, ArrowDownLeft, ArrowUpRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
export function MobileNavbar() {
  const navigation = [{
    name: 'Beranda',
    href: '/',
    icon: Home
  }, {
    name: 'Dompet',
    href: '/wallets',
    icon: Wallet
  }, {
    name: 'Pengeluaran',
    href: '/expenses',
    icon: ArrowDownLeft
  }, {
    name: 'Pemasukan',
    href: '/income',
    icon: ArrowUpRight
  }, {
    name: 'Pengaturan',
    href: '/settings',
    icon: Settings
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10">
      <nav className="flex justify-around rounded-none">
        {navigation.map(item => <Link key={item.name} to={item.href} className="flex flex-col items-center py-2.5 px-3 text-sm">
            <item.icon className={`h-6 w-6 ${item.href === '/' ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
            <span className={`text-xs mt-1 ${item.href === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              {item.name}
            </span>
          </Link>)}
      </nav>
    </div>;
}
