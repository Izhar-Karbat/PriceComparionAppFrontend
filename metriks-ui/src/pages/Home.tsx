import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  
  // Mock data for recent stats
  const recentStats = [
    { id: 1, title: 'Total Savings', value: '₪320.50' },
    { id: 2, title: 'Scanned Items', value: '26' },
    { id: 3, title: 'Best Deal', value: '35% off' },
  ];
  
  // Mock categories
  const categories = [
    { id: 1, name: t('supermarket'), path: '/supermarket', icon: '🛒' },
    { id: 2, name: t('pharma'), path: '/pharma', icon: '💊' },
    { id: 3, name: t('electronics'), path: '/electronics', icon: '🔌' },
  ];
  
  // Mock quick actions
  const quickActions = [
    { 
      id: 1, 
      name: t('scanReceipt'), 
      icon: '📷', 
      color: 'bg-blue-500', 
      path: '/scanner' 
    },
    { 
      id: 2, 
      name: t('smartTable'), 
      icon: '📊', 
      color: 'bg-green-500', 
      path: '/smart-table' 
    },
    { 
      id: 3, 
      name: t('nearbyStores'), 
      icon: '📍', 
      color: 'bg-purple-500', 
      path: '/nearby-stores' 
    },
  ];
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <Layout
      title="Metriks"
      showBackButton={false}
      showCart={true}
      headerActions={
        <button onClick={toggleLanguage} className="text-sm font-medium text-primary">
          {language === 'en' ? 'עב' : 'EN'}
        </button>
      }
    >
      <div className={`space-y-6 ${language === 'he' ? 'text-right' : 'text-left'}`}>
        {/* Welcome section */}
        <div>
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Welcome to Metriks' : 'ברוכים הבאים למטריקס'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Compare prices, track expenses, save money' 
              : 'השוואת מחירים, מעקב אחר הוצאות, חיסכון בכסף'}
          </p>
        </div>
        
        {/* Quick actions */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            {language === 'en' ? 'Quick Actions' : 'פעולות מהירות'}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map(action => (
              <div 
                key={action.id}
                onClick={() => handleNavigate(action.path)}
                className={`flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm cursor-pointer ${action.color} bg-opacity-10`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <span className="text-sm font-medium text-center">{action.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent stats */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            {language === 'en' ? 'Your Stats' : 'הסטטיסטיקה שלך'}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {recentStats.map(stat => (
              <div 
                key={stat.id}
                className="p-3 bg-white rounded-xl shadow-sm"
              >
                <p className="text-xs text-gray-500">{stat.title}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => navigate('/stats')}
            >
              {language === 'en' ? 'View All Stats' : 'צפה בכל הסטטיסטיקות'}
            </Button>
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            {language === 'en' ? 'Categories' : 'קטגוריות'}
          </h2>
          <div className="space-y-3">
            {categories.map(category => (
              <div 
                key={category.id}
                onClick={() => handleNavigate(category.path)}
                className="flex items-center p-4 bg-white rounded-xl shadow-sm cursor-pointer"
              >
                <div className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-gray-100 rounded-full">
                  {category.icon}
                </div>
                <span className="font-medium">{category.name}</span>
                <div className="ml-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;