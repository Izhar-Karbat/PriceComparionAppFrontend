import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ResetPasswordPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError(t('emailRequired', 'Email is required'));
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Reset password for:', email);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    i18n.changeLanguage(currentLang === 'he' ? 'en' : 'he');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={() => navigate('/login')}
          className="text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <button 
          onClick={toggleLanguage}
          className="px-3 py-1 rounded-full border border-gray-300"
        >
          {i18n.language === 'he' ? 'EN' : 'עב'}
        </button>
      </div>
      
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold mb-1">
            {t('resetPasswordTitle', 'Reset Your Password')}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {t('resetPasswordSubtitle', 'Enter your email to receive a password reset link')}
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
              {t('resetPasswordSuccess', 'Check your email for a password reset link')}
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {t('email', 'Email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-3 px-4 rounded-full font-medium hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {t('resetPassword', 'Reset Password')}
                </button>
              </div>
            </form>
          )}
          
          <p className="mt-8 text-center text-sm text-gray-500">
            <Link to="/login" className="font-semibold text-primary hover:text-primary/80">
              {t('backToLogin', 'Back to Login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;