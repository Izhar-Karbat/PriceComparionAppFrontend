import React from 'react';
import HeaderBar from './HeaderBar';
import BottomTabBar from './BottomTabBar';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  showBottomNav?: boolean;
  showCart?: boolean;
  showLanguageToggle?: boolean;
  headerActions?: React.ReactNode;
};

const Layout = ({
  children,
  title,
  showHeader = true,
  showBackButton = false,
  showBottomNav = true,
  showCart = false,
  showLanguageToggle = false,
  headerActions,
}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {showHeader && title && (
        <HeaderBar
          title={title}
          showBackButton={showBackButton}
          showCart={showCart}
          showLanguageToggle={showLanguageToggle}
          actions={headerActions}
        />
      )}
      
      <main className={`flex-1 p-4 ${showHeader ? 'pt-20' : 'pt-4'} ${showBottomNav ? 'pb-20' : 'pb-4'}`}>
        {children}
      </main>
      
      {showBottomNav && <BottomTabBar />}
    </div>
  );
};

export default Layout;