import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MapViewer = ({ initialLocation, markers = [], onMarkerClick, showUserLocation = true }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(initialLocation);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (showUserLocation && navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(t('locationError', 'Could not get your location. Please enable location services.'));
          setIsLoading(false);
        }
      );
    } else if (showUserLocation) {
      setError(t('browserNotSupported', 'Geolocation is not supported by this browser.'));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [showUserLocation, t]);

  // In a real implementation, this would use a mapping library like Google Maps, Mapbox, or Leaflet
  // For the mockup, we'll render a simple map representation
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      {isLoading ? (
        <div className="h-96 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-500">{t('loadingMap', 'Loading map...')}</p>
          </div>
        </div>
      ) : error ? (
        <div className="h-96 flex items-center justify-center bg-gray-100 p-4">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500 mx-auto mb-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <p className="text-red-500 font-medium">{error}</p>
            <button 
              className="mt-4 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary/90"
              onClick={() => window.location.reload()}
            >
              {t('tryAgain', 'Try Again')}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative h-96 bg-gray-200">
          {/* Mock map image - in a real implementation, this would be a map component */}
          <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-200">
            <div className="relative h-full w-full overflow-hidden">
              {/* Grid lines to simulate map */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-blue-300/30"></div>
                ))}
              </div>
              
              {/* Roads */}
              <div className="absolute left-0 right-0 top-1/2 h-4 bg-gray-300 transform -translate-y-1/2"></div>
              <div className="absolute top-0 bottom-0 left-1/4 w-4 bg-gray-300 transform -translate-x-1/2"></div>
              <div className="absolute top-0 bottom-0 left-3/4 w-4 bg-gray-300 transform -translate-x-1/2"></div>
              <div className="absolute left-0 right-0 top-1/4 h-4 bg-gray-300 transform -translate-y-1/2"></div>
              <div className="absolute left-0 right-0 top-3/4 h-4 bg-gray-300 transform -translate-y-1/2"></div>
              
              {/* User location marker */}
              {showUserLocation && (
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                    <div className="relative h-6 w-6 bg-blue-600 border-2 border-white rounded-full"></div>
                  </div>
                </div>
              )}
              
              {/* Store markers */}
              {markers.map((marker, index) => (
                <div 
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ 
                    left: `${30 + (index * 15)}%`, 
                    top: `${30 + (index * 10)}%`
                  }}
                  onClick={() => onMarkerClick && onMarkerClick(marker)}
                >
                  <div className="flex flex-col items-center">
                    <div className={`h-8 w-8 flex items-center justify-center rounded-full border-2 border-white ${marker.isSelected ? 'bg-green-600' : 'bg-red-500'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded-md shadow-md">
                      <p className="text-xs font-medium">{marker.name}</p>
                      <p className="text-xs text-gray-500">{marker.distance} km</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button className="bg-white p-2 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button className="bg-white p-2 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <button className="bg-white p-2 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Optional: Map filter/search controls */}
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div>
            <select className="block w-full p-2 border border-gray-300 rounded-md">
              <option value="all">{t('allStores', 'All Stores')}</option>
              <option value="supermarkets">{t('supermarkets', 'Supermarkets')}</option>
              <option value="pharmacies">{t('pharmacies', 'Pharmacies')}</option>
              <option value="electronics">{t('electronics', 'Electronics')}</option>
            </select>
          </div>
          
          <div>
            <select className="block w-full p-2 border border-gray-300 rounded-md">
              <option value="5">{t('within', 'Within')} 5 {t('km')}</option>
              <option value="10">{t('within', 'Within')} 10 {t('km')}</option>
              <option value="20">{t('within', 'Within')} 20 {t('km')}</option>
              <option value="50">{t('within', 'Within')} 50 {t('km')}</option>
            </select>
          </div>
          
          <button className="bg-primary text-white py-2 px-4 rounded-full hover:bg-primary/90">
            {t('apply', 'Apply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapViewer;