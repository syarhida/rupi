
import React, { useState, useEffect } from 'react';
import { MobileNavbar } from './MobileNavbar';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [layoutType, setLayoutType] = useState<'mobile' | 'desktop' | null>(null);

  // Set initial layout type based on device detection
  useEffect(() => {
    setLayoutType(isMobile ? 'mobile' : 'desktop');
  }, [isMobile]);

  // Handle content transition when route changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [children, location.pathname]);

  // Render nothing until we know what type of layout to use
  if (layoutType === null) {
    return null;
  }

  // Once we know the layout type, maintain it throughout the transition
  return (
    <div className="min-h-screen bg-background dark">
      {layoutType === 'mobile' ? (
        <div className="flex flex-col h-screen">
          <main className={`flex-1 overflow-y-auto no-scrollbar pb-16 px-[16px] py-[16px] transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'animate-slide-in'}`}>
            {displayChildren}
          </main>
          <MobileNavbar />
        </div>
      ) : (
        <div className="flex h-screen">
          <Sidebar />
          <main className={`flex-1 overflow-y-auto no-scrollbar p-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'animate-slide-in'}`}>
            {displayChildren}
          </main>
        </div>
      )}
    </div>
  );
}
