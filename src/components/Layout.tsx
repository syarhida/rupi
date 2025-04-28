
import React from 'react';
import { MobileNavbar } from './MobileNavbar';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background dark">
      {isMobile ? (
        <div className="flex flex-col h-screen">
          <main className="flex-1 overflow-y-auto no-scrollbar pb-16">{children}</main>
          <MobileNavbar />
        </div>
      ) : (
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto no-scrollbar p-6">{children}</main>
        </div>
      )}
    </div>
  );
}
