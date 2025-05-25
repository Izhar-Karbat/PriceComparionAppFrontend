import { useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { useLanguage } from '../context/LanguageContext';

const Stats = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('spending');
  
  // Mock spending stats
  const spendingStats = [
    { 
      id: 1, 
      title: t('monthlySpending', 'Monthly Spending'), 
      value: '₪1,250.75',
      trend: { value: 5.2, isPositive: false },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 2, 
      title: t('avgCartValue', 'Avg. Cart Value'), 
      value: '₪168.20',
      trend: { value: 3.8, isPositive: true },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 3, 
      title: t('totalVisits', 'Total Store Visits'), 
      value: '14',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];
  
  // Mock savings stats
  const savingsStats = [
    { 
      id: 1, 
      title: t('totalSaved', 'Total Saved'), 
      value: '₪320.50',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 2, 
      title: t('bestDeal', 'Best Deal Found'), 
      value: '35%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      )
    },
    { 
      id: 3, 
      title: t('savingsRate', 'Savings Rate'), 
      value: '12.4%',
      trend: { value: 2.1, isPositive: true },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    }
  ];
  
  // Mock price trend data
  const priceTrends = [
    { 
      id: 1, 
      title: t('milkPrices', 'Milk Prices'), 
      value: '↓ 5%',
      trend: { value: 5, isPositive: true },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    },
    { 
      id: 2, 
      title: t('eggPrices', 'Egg Prices'), 
      value: '↑ 8%',
      trend: { value: 8, isPositive: false },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      id: 3, 
      title: t('breadPrices', 'Bread Prices'), 
      value: '↔ 0%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      )
    }
  ];
  
  const activeStats = activeTab === 'spending' 
    ? spendingStats 
    : activeTab === 'savings' 
      ? savingsStats 
      : priceTrends;
      
  // Mock spending breakdown data (for the chart)
  const spendingBreakdown = [
    { category: 'Groceries', amount: 620, color: '#4299E1' },
    { category: 'Pharma', amount: 180, color: '#48BB78' },
    { category: 'Electronics', amount: 450, color: '#F59E0B' },
  ];
  
  // Simple visualization for the spending breakdown
  const total = spendingBreakdown.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <Layout
      title={t('stats', 'Statistics')}
      showBackButton={true}
    >
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('spending')}
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === 'spending' 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            {t('spending', 'Spending')}
          </button>
          
          <button
            onClick={() => setActiveTab('savings')}
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === 'savings' 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            {t('savings', 'Savings')}
          </button>
          
          <button
            onClick={() => setActiveTab('prices')}
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === 'prices' 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            {t('prices', 'Prices')}
          </button>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {activeStats.map(stat => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>
        
        {/* Spending breakdown (only show for spending tab) */}
        {activeTab === 'spending' && (
          <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
            <h3 className="font-semibold mb-3">{t('spendingBreakdown', 'Spending Breakdown')}</h3>
            
            <div className="space-y-3">
              {spendingBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{item.category}</span>
                    <span className="text-sm font-medium">₪{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${(item.amount / total) * 100}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="font-medium">{t('total', 'Total')}</span>
              <span className="font-bold">₪{total}</span>
            </div>
          </div>
        )}
        
        {/* Time period selector */}
        <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
          <h3 className="font-semibold mb-3">{t('timeRange', 'Time Range')}</h3>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button className="flex-1 py-2 text-sm font-medium rounded-md bg-white shadow-sm">
              {t('thisMonth', 'This Month')}
            </button>
            
            <button className="flex-1 py-2 text-sm font-medium rounded-md text-gray-500">
              {t('lastMonth', 'Last Month')}
            </button>
            
            <button className="flex-1 py-2 text-sm font-medium rounded-md text-gray-500">
              {t('3Months', '3 Months')}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stats;