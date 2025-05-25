import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  onClick?: () => void;
};

const StatCard = ({ title, value, icon, trend, color = 'bg-primary', onClick }: StatCardProps) => {
  return (
    <div
      className={`p-4 rounded-xl shadow-sm bg-white cursor-pointer transition hover:shadow-md ${onClick ? 'hover:translate-y-[-2px]' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-500 text-sm">{title}</p>
        {icon && (
          <div className={`p-2 rounded-full ${color} bg-opacity-10`}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end">
        <p className="text-xl font-bold">{value}</p>
        
        {trend && (
          <div className={`ml-2 flex items-center text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span>
              {trend.isPositive ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
            </span>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;