import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PricingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'
  
  // Pricing plans data
  const plans = [
    {
      id: 'free',
      name: t('freePlan', 'Free'),
      price: {
        monthly: 0,
        yearly: 0,
      },
      description: t('freePlanDesc', 'Basic price comparison for occasional shoppers'),
      features: [
        t('feature1Free', 'Basic price comparison'),
        t('feature2Free', '5 price alerts'),
        t('feature3Free', 'Limited store selection'),
        t('feature4Free', 'Ad-supported experience'),
      ],
      popular: false,
      buttonText: t('currentPlan', 'Current Plan'),
      disabled: true,
    },
    {
      id: 'premium',
      name: t('premiumPlan', 'Premium'),
      price: {
        monthly: 4.99,
        yearly: 49.99,
      },
      description: t('premiumPlanDesc', 'Advanced features for regular shoppers'),
      features: [
        t('feature1Premium', 'Advanced price tracking'),
        t('feature2Premium', 'Unlimited price alerts'),
        t('feature3Premium', 'Full store selection'),
        t('feature4Premium', 'Ad-free experience'),
        t('feature5Premium', 'Receipt scanning'),
      ],
      popular: true,
      buttonText: t('getStarted', 'Get Started'),
      disabled: false,
    },
    {
      id: 'family',
      name: t('familyPlan', 'Family'),
      price: {
        monthly: 7.99,
        yearly: 79.99,
      },
      description: t('familyPlanDesc', 'Share with up to 5 family members'),
      features: [
        t('feature1Family', 'Everything in Premium'),
        t('feature2Family', 'Share with 5 family members'),
        t('feature3Family', 'Family shopping lists'),
        t('feature4Family', 'Priority customer support'),
        t('feature5Family', 'Personalized shopping insights'),
      ],
      popular: false,
      buttonText: t('getStarted', 'Get Started'),
      disabled: false,
    },
  ];
  
  const handlePlanSelect = (planId) => {
    console.log(`Selected plan: ${planId}, billing: ${billingPeriod}`);
    
    // Navigate to payment page with selected plan
    navigate('/payment', { 
      state: { 
        planId, 
        billingPeriod,
        amount: plans.find(p => p.id === planId).price[billingPeriod]
      } 
    });
  };
  
  const getSavingsPercentage = (plan) => {
    const monthlyPrice = plan.price.monthly;
    const yearlyPrice = plan.price.yearly;
    
    if (monthlyPrice === 0 || yearlyPrice === 0) return 0;
    
    const monthlyTotal = monthlyPrice * 12;
    const savings = ((monthlyTotal - yearlyPrice) / monthlyTotal) * 100;
    
    return Math.round(savings);
  };

  return (
    <div className="py-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('choosePlan', 'Choose Your Plan')}
        </h1>
        <p className="text-gray-600">
          {t('planSubtitle', 'Select the perfect plan for your shopping needs')}
        </p>
        
        {/* Billing Period Toggle */}
        <div className="mt-6 flex justify-center">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              className={`py-2 px-4 rounded-full text-sm font-medium ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              {t('monthly', 'Monthly')}
            </button>
            <button
              className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              {t('yearly', 'Yearly')}
              {billingPeriod === 'yearly' && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  -20%
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <div className="grid gap-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {plans.map((plan) => {
          const isYearly = billingPeriod === 'yearly';
          const savingsPercent = getSavingsPercentage(plan);
          
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border ${
                plan.popular 
                  ? 'border-primary relative' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 bg-primary text-white text-xs text-center py-1 font-medium">
                  {t('mostPopular', 'Most Popular')}
                </div>
              )}
              
              <div className={`px-6 py-8 ${plan.popular ? 'pt-10' : ''}`}>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ${plan.price[billingPeriod].toFixed(2)}
                  </span>
                  <span className="ml-1 text-gray-500">
                    /{billingPeriod === 'monthly' ? t('month', 'mo') : t('year', 'yr')}
                  </span>
                </div>
                
                {isYearly && plan.id !== 'free' && savingsPercent > 0 && (
                  <div className="mt-1 text-sm text-green-600">
                    {t('savePercent', 'Save {{percent}}%', { percent: savingsPercent })}
                  </div>
                )}
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => !plan.disabled && handlePlanSelect(plan.id)}
                  disabled={plan.disabled}
                  className={`mt-8 w-full py-3 px-4 rounded-lg font-medium ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary/90 disabled:bg-primary/50'
                      : plan.disabled
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-primary border border-primary hover:bg-gray-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* FAQ Section */}
      <div className="mt-10 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {t('frequentlyAskedQuestions', 'Frequently Asked Questions')}
          </h3>
        </div>
        
        <div className="px-6 py-5 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">
              {t('faqQuestion1', 'Can I switch plans later?')}
            </h4>
            <p className="mt-1 text-gray-600 text-sm">
              {t('faqAnswer1', 'Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes will be applied at the start of your next billing cycle.')}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">
              {t('faqQuestion2', 'Do you offer refunds?')}
            </h4>
            <p className="mt-1 text-gray-600 text-sm">
              {t('faqAnswer2', 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied with your purchase, contact our support team for a full refund.')}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">
              {t('faqQuestion3', 'How does family sharing work?')}
            </h4>
            <p className="mt-1 text-gray-600 text-sm">
              {t('faqAnswer3', 'With the Family plan, you can invite up to 5 family members. Each member gets their own account with all Premium features, while sharing shopping lists and price alerts.')}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">
              {t('faqQuestion4', 'What payment methods do you accept?')}
            </h4>
            <p className="mt-1 text-gray-600 text-sm">
              {t('faqAnswer4', 'We accept all major credit cards, PayPal, and Apple Pay. For yearly subscriptions, we also offer bank transfer options.')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Special Offer Banner */}
      <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 text-white text-center">
          <h3 className="text-lg font-medium">
            {t('specialOffer', 'Special Offer for New Users')}
          </h3>
          <p className="mt-1 text-white/90">
            {t('specialOfferDesc', 'Get 3 months of Premium for free when you sign up for an annual plan')}
          </p>
          <button
            onClick={() => handlePlanSelect('premium')}
            className="mt-4 bg-white text-blue-600 py-2 px-6 rounded-lg font-medium hover:bg-gray-100"
          >
            {t('claimOffer', 'Claim Offer')}
          </button>
        </div>
      </div>
      
      {/* Support Contact */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          {t('pricingQuestion', 'Have a question about our pricing? ')}{' '}
          <button className="text-primary font-medium">
            {t('contactSupport', 'Contact our support team')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default PricingPage;