import React from 'react';
import { useTranslation } from 'react-i18next';

const InsightCard = ({ insight, onClick }) => {
  const { t } = useTranslation();
  
  // Mapping insight types to icon and color classes
  const typeConfig = {
    price_drop: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
        </svg>
      ),
      bg: 'bg-green-100',
      text: 'text-green-800',
      iconBg: 'bg-green-200'
    },
    price_increase: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      bg: 'bg-red-100',
      text: 'text-red-800',
      iconBg: 'bg-red-200'
    },
    better_deal: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      ),
      bg: 'bg-indigo-100',
      text: 'text-indigo-800',
      iconBg: 'bg-indigo-200'
    },
    recommendation: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      iconBg: 'bg-blue-200'
    },
    alert: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      ),
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      iconBg: 'bg-yellow-200'
    }
  };
  
  const config = typeConfig[insight.type] || typeConfig.alert;

  return (
    <div 
      className={`${config.bg} ${config.text} p-4 rounded-2xl mb-3 shadow-sm`}
      onClick={onClick}
    >
      <div className="flex">
        <div className={`${config.iconBg} p-2 rounded-full mr-3`}>
          {config.icon}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{insight.title}</h3>
          <p className="text-sm mb-2">{insight.description}</p>
          
          {insight.date && (
            <div className="text-xs opacity-75 mt-2">
              {new Date(insight.date).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
      
      {insight.cta && (
        <div className="mt-2 text-right">
          <button className={`font-medium text-sm ${config.text}`}>
            {insight.cta}
          </button>
        </div>
      )}
    </div>
  );
};

export default InsightCard;