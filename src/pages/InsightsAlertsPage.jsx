import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const InsightsAlertsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('insights'); // 'insights' or 'alerts'
  
  // Mock insights data
  const insights = [
    {
      id: 1,
      type: 'price_drop',
      title: t('insightPriceDropTitle', 'Price Drop Alert'),
      description: t('insightPriceDropDesc', 'Tnuva Milk 3% is now 15% cheaper at Rami Levy compared to last month.'),
      date: '2024-05-18',
      category: 'groceries',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      color: 'bg-green-100 text-green-800',
      action: { label: t('viewPrice', 'View Price'), path: '/supermarket/search' },
    },
    {
      id: 2,
      type: 'savings_opportunity',
      title: t('insightSavingsTitle', 'Savings Opportunity'),
      description: t('insightSavingsDesc', 'Switch from Gillette to Schick for shaving products and save up to 20%.'),
      date: '2024-05-17',
      category: 'personal_care',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      color: 'bg-blue-100 text-blue-800',
      action: { label: t('compare', 'Compare'), path: '/pharma/smart-table' },
    },
    {
      id: 3,
      type: 'shopping_trend',
      title: t('insightTrendTitle', 'Shopping Trend'),
      description: t('insightTrendDesc', 'Your household spends 30% more on snacks compared to similar households.'),
      date: '2024-05-15',
      category: 'statistics',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
      color: 'bg-purple-100 text-purple-800',
      action: { label: t('viewStats', 'View Stats'), path: '/supermarket/statistics' },
    },
    {
      id: 4,
      type: 'seasonal_suggestion',
      title: t('insightSeasonalTitle', 'Seasonal Suggestion'),
      description: t('insightSeasonalDesc', 'Summer fruits are now in season. Watermelon prices have dropped by 30% this week.'),
      date: '2024-05-14',
      category: 'produce',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
      color: 'bg-orange-100 text-orange-800',
      action: { label: t('viewDeals', 'View Deals'), path: '/supermarket/search' },
    },
    {
      id: 5,
      type: 'store_recommendation',
      title: t('insightStoreTitle', 'Store Recommendation'),
      description: t('insightStoreDesc', 'Based on your recent purchases, you could save ~15% by shopping at Rami Levy instead of Shufersal.'),
      date: '2024-05-12',
      category: 'recommendations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
      color: 'bg-teal-100 text-teal-800',
      action: { label: t('viewStores', 'View Stores'), path: '/map' },
    },
  ];
  
  // Mock alerts data
  const alerts = [
    {
      id: 101,
      type: 'price_alert',
      title: t('alertPriceTitle', 'Price Alert Triggered'),
      description: t('alertPriceDesc', 'Samsung Galaxy S22 is now ₪2,599 at KSP (your alert was set at ₪2,700)'),
      date: '2024-05-18',
      category: 'electronics',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      ),
      color: 'bg-green-100 text-green-800',
      action: { label: t('buyNow', 'Buy Now'), path: '/electronics/search' },
    },
    {
      id: 102,
      type: 'out_of_stock',
      title: t('alertStockTitle', 'Product Available Again'),
      description: t('alertStockDesc', 'Pampers Size 4 Premium is back in stock at Super-Pharm'),
      date: '2024-05-16',
      category: 'baby',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      ),
      color: 'bg-blue-100 text-blue-800',
      action: { label: t('addToCart', 'Add to Cart'), path: '/pharma/search' },
    },
    {
      id: 103,
      type: 'expiration',
      title: t('alertExpirationTitle', 'Expiration Reminder'),
      description: t('alertExpirationDesc', 'Your tracked product "Greek Yogurt" is set to expire in 2 days'),
      date: '2024-05-15',
      category: 'groceries',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      color: 'bg-red-100 text-red-800',
      action: { label: t('replace', 'Replace'), path: '/supermarket/search' },
    },
    {
      id: 104,
      type: 'promotion',
      title: t('alertPromotionTitle', 'Special Promotion'),
      description: t('alertPromotionDesc', '1+1 deal on Coca-Cola products at Victory this weekend only'),
      date: '2024-05-14',
      category: 'deals',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
      ),
      color: 'bg-purple-100 text-purple-800',
      action: { label: t('viewOffer', 'View Offer'), path: '/supermarket/search' },
    },
  ];
  
  // Format date to relative time format (e.g. "2 days ago")
  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return t('today', 'Today');
    } else if (diffDays === 1) {
      return t('yesterday', 'Yesterday');
    } else if (diffDays < 7) {
      return t('daysAgo', '{{count}} days ago', { count: diffDays });
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Handle read all action
  const handleReadAll = () => {
    console.log('Mark all as read');
  };
  
  // Handle navigation to action link
  const handleAction = (path) => {
    navigate(path);
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {t('insightsAndAlerts', 'Insights & Alerts')}
          </h1>
          <p className="text-gray-600 text-sm">
            {t('insightsAndAlertsDesc', 'Personalized savings tips and notifications')}
          </p>
        </div>
        
        <button
          onClick={handleReadAll}
          className="text-primary text-sm font-medium"
        >
          {t('markAllAsRead', 'Mark all as read')}
        </button>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-5">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === 'insights'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('insights')}
          >
            {t('insights', 'Insights')}
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === 'alerts'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('alerts')}
          >
            {t('alerts', 'Alerts')}
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs bg-red-100 text-red-800 rounded-full">
              {alerts.length}
            </span>
          </button>
        </div>
      </div>
      
      {/* Items List */}
      <div className="space-y-4">
        {(activeTab === 'insights' ? insights : alerts).map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex">
                <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center shrink-0 mr-3`}>
                  {item.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <span className="text-xs text-gray-500">{formatRelativeDate(item.date)}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description}
                  </p>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <button
                      onClick={() => handleAction(item.action.path)}
                      className="text-primary text-sm font-medium hover:text-primary/80"
                    >
                      {item.action.label}
                    </button>
                    
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                      </button>
                      
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Settings Card */}
      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">
            {t('notificationSettings', 'Notification Settings')}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium text-gray-800">{t('priceDropAlerts', 'Price Drop Alerts')}</div>
                <div className="text-gray-500">{t('priceDropAlertsDesc', 'Get notified when prices drop on tracked items')}</div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium text-gray-800">{t('stockAlerts', 'Back in Stock Alerts')}</div>
                <div className="text-gray-500">{t('stockAlertsDesc', 'Get notified when out-of-stock items become available')}</div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium text-gray-800">{t('weeklyInsights', 'Weekly Insights')}</div>
                <div className="text-gray-500">{t('weeklyInsightsDesc', 'Receive personalized shopping insights every week')}</div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium text-gray-800">{t('dealAlerts', 'Special Deal Alerts')}</div>
                <div className="text-gray-500">{t('dealAlertsDesc', 'Get notified about promotions and special deals')}</div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <button className="mt-5 w-full text-center text-primary text-sm font-medium py-2 hover:underline">
            {t('manageMoreNotifications', 'Manage more notification settings')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsAlertsPage;