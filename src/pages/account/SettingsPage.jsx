import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t } = useTranslation();
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+972 50 123 4567',
    notifications: {
      priceAlerts: true,
      weeklyDigest: true,
      newStores: false,
      promotions: true,
    },
    dataSharing: {
      analytics: true,
      personalizedOffers: false,
    },
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleNotificationToggle = (setting) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [setting]: !formData.notifications[setting],
      },
    });
  };
  
  const handleDataSharingToggle = (setting) => {
    setFormData({
      ...formData,
      dataSharing: {
        ...formData.dataSharing,
        [setting]: !formData.dataSharing[setting],
      },
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setUserData(formData);
      setIsSaving(false);
      setIsEditing(false);
      setSuccessMessage(t('settingsSaved', 'Your settings have been saved'));
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="py-4">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t('personalInfo', 'Personal Information')}
            </h3>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200"
              >
                {t('edit', 'Edit')}
              </button>
            ) : null}
          </div>
        </div>
        
        <div className="px-4 py-5 sm:px-6">
          {!isEditing ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">{t('fullName', 'Full Name')}</h4>
                <p className="mt-1">{userData.name}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">{t('email', 'Email')}</h4>
                <p className="mt-1">{userData.email}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">{t('phone', 'Phone Number')}</h4>
                <p className="mt-1">{userData.phone}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('fullName', 'Full Name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('email', 'Email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('phone', 'Phone Number')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center"
                  >
                    {isSaving ? (
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {t('save', 'Save')}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200"
                  >
                    {t('cancel', 'Cancel')}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t('notificationSettings', 'Notification Settings')}
          </h3>
        </div>
        
        <div className="px-4 py-5 sm:px-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{t('priceAlerts', 'Price Alerts')}</h4>
                <p className="text-sm text-gray-500">{t('priceAlertsDesc', 'Get notified when prices drop on your tracked items')}</p>
              </div>
              <button 
                onClick={() => isEditing && handleNotificationToggle('priceAlerts')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                } ${formData.notifications.priceAlerts ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.notifications.priceAlerts ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{t('weeklyDigest', 'Weekly Digest')}</h4>
                <p className="text-sm text-gray-500">{t('weeklyDigestDesc', 'Receive a weekly summary of savings and price changes')}</p>
              </div>
              <button 
                onClick={() => isEditing && handleNotificationToggle('weeklyDigest')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                } ${formData.notifications.weeklyDigest ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.notifications.weeklyDigest ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{t('newStores', 'New Stores')}</h4>
                <p className="text-sm text-gray-500">{t('newStoresDesc', 'Get notified when new stores are added near you')}</p>
              </div>
              <button 
                onClick={() => isEditing && handleNotificationToggle('newStores')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                } ${formData.notifications.newStores ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.notifications.newStores ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{t('promotions', 'Promotions & Deals')}</h4>
                <p className="text-sm text-gray-500">{t('promotionsDesc', 'Receive notifications about special promotions and deals')}</p>
              </div>
              <button 
                onClick={() => isEditing && handleNotificationToggle('promotions')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                } ${formData.notifications.promotions ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.notifications.promotions ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data & Privacy */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t('dataPrivacy', 'Data & Privacy')}
          </h3>
        </div>
        
        <div className="px-4 py-5 sm:px-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{t('analytics', 'Usage Analytics')}</h4>
                <p className="text-sm text-gray-500">{t('analyticsDesc', 'Help us improve by sharing anonymous usage data')}</p>
              </div>
              <button 
                onClick={() => isEditing && handleDataSharingToggle('analytics')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                } ${formData.dataSharing.analytics ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.dataSharing.analytics ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{t('personalizedOffers', 'Personalized Offers')}</h4>
                <p className="text-sm text-gray-500">{t('personalizedOffersDesc', 'Allow us to share your data with partners for personalized offers')}</p>
              </div>
              <button 
                onClick={() => isEditing && handleDataSharingToggle('personalizedOffers')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                } ${formData.dataSharing.personalizedOffers ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.dataSharing.personalizedOffers ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="text-primary text-sm font-medium">
              {t('downloadData', 'Download my data')}
            </button>
            <p className="mt-1 text-xs text-gray-500">
              {t('downloadDataDesc', 'Request a copy of all your personal data we have stored')}
            </p>
          </div>
          
          <div className="mt-4">
            <button className="text-red-600 text-sm font-medium">
              {t('deleteAccount', 'Delete my account')}
            </button>
            <p className="mt-1 text-xs text-gray-500">
              {t('deleteAccountDesc', 'Permanently delete your account and all associated data')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;