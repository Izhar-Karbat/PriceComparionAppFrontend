import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AccountPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    memberSince: '2023-05-15',
    subscription: 'Free',
  };
  
  // Define account sections
  const accountSections = [
    {
      id: 'personal',
      title: t('personalInfo', 'Personal Information'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      onClick: () => navigate('/settings'),
    },
    {
      id: 'language',
      title: t('languageSettings', 'Language Settings'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
        </svg>
      ),
      onClick: () => navigate('/language'),
    },
    {
      id: 'subscription',
      title: t('subscriptionPlans', 'Subscription Plans'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
      ),
      onClick: () => navigate('/pricing'),
    },
    {
      id: 'payment',
      title: t('paymentMethods', 'Payment Methods'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      onClick: () => navigate('/payment'),
    },
    {
      id: 'orders',
      title: t('orderHistory', 'Order History'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
      ),
      onClick: () => navigate('/order-history'),
    },
    {
      id: 'logout',
      title: t('logout', 'Logout'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
      ),
      onClick: () => navigate('/login'),
    },
  ];

  return (
    <div className="py-4">
      {/* User Profile Card */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="bg-primary/10 py-6 px-4 flex items-center">
          {/* User Avatar */}
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
            {user.name.charAt(0)}
          </div>
          
          {/* User Info */}
          <div className="ml-4 flex-grow">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
          
          {/* Edit Button */}
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 text-sm">{t('memberSince', 'Member Since')}:</span>
            <span className="font-medium">{new Date(user.memberSince).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">{t('currentPlan', 'Current Plan')}:</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {user.subscription}
            </span>
          </div>
        </div>
      </div>
      
      {/* Account Sections */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {accountSections.map((section) => (
            <li key={section.id}>
              <button
                onClick={section.onClick}
                className={`w-full px-4 py-3 flex items-center hover:bg-gray-50 ${
                  section.id === 'logout' ? 'text-red-600' : ''
                }`}
              >
                <div className={`${section.id === 'logout' ? 'text-red-600' : 'text-gray-600'}`}>
                  {section.icon}
                </div>
                <span className="ml-3 font-medium">{section.title}</span>
                {section.id !== 'logout' && (
                  <svg
                    className="ml-auto h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* App Version */}
      <div className="mt-8 text-center text-gray-500 text-xs">
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default AccountPage;