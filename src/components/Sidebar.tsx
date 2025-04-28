
import React from 'react';
import { 
  Home, 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Settings,
  List
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Wallets', href: '/wallets', icon: Wallet },
    { name: 'Expenses', href: '/expenses', icon: ArrowDownLeft },
    { name: 'Income', href: '/income', icon: ArrowUpRight },
    { name: 'Transactions', href: '/transactions', icon: List },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border overflow-y-auto no-scrollbar">
      <div className="p-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-primary mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10 16V8L16 12L10 16Z" fill="currentColor"/>
          </svg>
          <span>RupiFlow</span>
        </h2>
      </div>
      <nav className="space-y-1 px-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`
              flex items-center px-2 py-3 rounded-lg text-foreground hover:bg-primary/10
              ${item.href === '/' ? 'bg-primary/10 text-primary' : ''}
            `}
          >
            <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
