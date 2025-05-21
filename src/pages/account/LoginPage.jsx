import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError(t('emailRequired', 'Email is required'));
      return;
    }
    
    if (!password) {
      setError(t('passwordRequired', 'Password is required'));
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any email/password is accepted
      console.log('Login with:', { email, password, rememberMe });
      setIsLoading(false);
      
      // Navigate to home page after successful login
      navigate('/');
    }, 1500);
  };
  
  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      console.log(`Login with ${provider}`);
      setIsLoading(false);
      
      // Navigate to home page after successful login
      navigate('/');
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
          onClick={() => navigate('/')}
          className="text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
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
            {t('loginTitle', 'Login to Your Account')}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {t('loginSubtitle', 'Access all your saved lists and price alerts')}
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
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
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  {t('password', 'Password')}
                </label>
                <Link to="/reset-password" className="text-sm font-medium text-primary hover:text-primary/80">
                  {t('forgotPassword', 'Forgot password?')}
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                {t('rememberMe', 'Remember me')}
              </label>
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
                {t('login', 'Login')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  {t('orContinueWith', 'Or continue with')}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex justify-center items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="#4285F4"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="flex justify-center items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    fill="#1877F2"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleSocialLogin('Apple')}
                className="flex justify-center items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"
                    fill="#000000"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-500">
            {t('noAccount', 'Don\'t have an account?')}{' '}
            <Link to="/signup" className="font-semibold text-primary hover:text-primary/80">
              {t('signUp', 'Sign up')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;