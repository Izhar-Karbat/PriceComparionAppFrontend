import React from 'react';
import Header from './Header';
import BottomTabBar from './BottomTabBar';

const MobileLayout = ({ 
  children, 
  title = null, 
  showHeader = true, 
  showBackButton = false, 
  showBottomNav = true, 
  showLanguageToggle = true,
  headerActions = []
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHeader && (
        <Header 
          title={title} 
          showBackButton={showBackButton} 
          showLanguageToggle={showLanguageToggle}
          actions={headerActions}
        />
      )}
      
      <main className={`flex-grow px-4 pb-20 ${showHeader ? 'pt-20' : 'pt-4'}`}>
        {children}
      </main>
      
      {showBottomNav && <BottomTabBar />}
    </div>
  );
};

export default MobileLayout;