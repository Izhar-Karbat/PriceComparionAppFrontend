import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const Signup = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !password) {
      alert(t('fillAllFields', 'Please fill all fields'));
      return;
    }
    
    if (!agreeTerms) {
      alert(t('agreeToTerms', 'Please agree to terms and conditions'));
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home after successful signup
      navigate('/');
    }, 1500);
  };
  
  const handleSocialSignup = (provider: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home after successful signup
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Back button */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col justify-center px-6 py-6">
        <div className="mx-auto w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('createAccount', 'Create an Account')}
            </h1>
            <p className="text-gray-600">
              {t('signupDescription', 'Sign up to start saving on your shopping')}
            </p>
          </div>
          
          {/* Signup form */}
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('fullName', 'Full Name')}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('fullNamePlaceholder', 'Enter your name')}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('email', 'Email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('password', 'Password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('passwordRequirements', 'Password should be at least 8 characters')}
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                {t('agreeToTermsText', 'I agree to the')} 
                <a href="#" className="text-primary"> {t('termsAndConditions', 'Terms and Conditions')} </a>
                {t('and', 'and')} 
                <a href="#" className="text-primary"> {t('privacyPolicy', 'Privacy Policy')}</a>
              </label>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? t('signingUp', 'Signing Up...') : t('signUp', 'Sign Up')}
            </Button>
          </form>
          
          {/* Social signup */}
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
                type="button"
                onClick={() => handleSocialSignup('google')}
                className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialSignup('facebook')}
                className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white"
              >
                <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialSignup('apple')}
                className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.378-3.066c-.835 1.022-2.208 1.806-3.547 1.702-.156-1.299.546-2.662 1.364-3.545.835-1.026 2.247-1.806 3.408-1.897.143 1.327-.416 2.636-1.225 3.74z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('alreadyHaveAccount', 'Already have an account?')}{' '}
              <Link to="/login" className="text-primary font-medium">
                {t('login', 'Log In')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;