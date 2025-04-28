
import React from 'react';
import { Home, Wallet, ArrowDownLeft, ArrowUpRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MobileNavbar() {
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Wallets', href: '/wallets', icon: Wallet },
    { name: 'Expense', href: '/expenses', icon: ArrowDownLeft },
    { name: 'Income', href: '/income', icon: ArrowUpRight },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10">
      <nav className="flex justify-around">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex flex-col items-center py-2.5 px-3 text-sm"
          >
            <item.icon
              className={`h-6 w-6 ${item.href === '/' ? 'text-primary' : 'text-muted-foreground'}`}
              aria-hidden="true"
            />
            <span className={`text-xs mt-1 ${item.href === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
