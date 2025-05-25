import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReceiptUploader from '../../components/ReceiptUploader';
import SmartCartItem from '../../components/SmartCartItem';

const ReceiptUploadPage = () => {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [detectedItems, setDetectedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const handleReceiptUpload = (file) => {
    console.log('Receipt uploaded:', file.name);
    // In a real app, this would send the file to a backend service
  };
  
  const handleScan = (imageData) => {
    setIsScanning(true);
    
    // Simulate backend processing delay
    setTimeout(() => {
      // Mock detected items from receipt
      const mockItems = [
        {
          id: 'r1',
          name: 'Milk 3% Tnuva',
          price: 6.90,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/50/FFFFFF/000000?text=Milk',
          retailer: 'Shufersal'
        },
        {
          id: 'r2',
          name: 'Bread - White',
          price: 7.50,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/50/FFFFFF/000000?text=Bread',
          retailer: 'Shufersal'
        },
        {
          id: 'r3',
          name: 'Eggs (Large) - 12 units',
          price: 14.90,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/50/FFFFFF/000000?text=Eggs',
          retailer: 'Shufersal'
        },
        {
          id: 'r4',
          name: 'Chocolate - Milk',
          price: 5.90,
          quantity: 2,
          imageUrl: 'https://via.placeholder.com/50/FFFFFF/000000?text=Chocolate',
          retailer: 'Shufersal'
        },
        {
          id: 'r5',
          name: 'Yogurt - Greek Style',
          price: 8.90,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/50/FFFFFF/000000?text=Yogurt',
          retailer: 'Shufersal'
        }
      ];
      
      setDetectedItems(mockItems);
      setSelectedItems(mockItems);
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };
  
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prevSelectedItems => {
      const isCurrentlySelected = prevSelectedItems.some(item => item.id === itemId);
      
      if (isCurrentlySelected) {
        return prevSelectedItems.filter(item => item.id !== itemId);
      } else {
        const itemToAdd = detectedItems.find(item => item.id === itemId);
        return [...prevSelectedItems, itemToAdd];
      }
    });
  };
  
  const handleQuantityChange = (itemId, newQuantity) => {
    setSelectedItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const handleCreateSmartCart = () => {
    // In a real app, this would create a smart cart with the selected items
    console.log('Creating smart cart with items:', selectedItems);
    // Navigate to cart page or show confirmation
    alert(t('smartCartCreated', 'Smart cart created successfully!'));
  };
  
  const totalSelectedItems = selectedItems.length;
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="pb-20">
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
        <h2 className="text-lg font-semibold mb-3">{t('uploadReceiptTitle', 'Upload Receipt')}</h2>
        <p className="text-gray-600 mb-4">{t('uploadReceiptDescription', 'Upload your receipt to automatically add items to your cart')}</p>
        
        <ReceiptUploader
          onUpload={handleReceiptUpload}
          onScan={handleScan}
        />
      </div>
      
      {isScanning && (
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <div className="flex flex-col items-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
            <h3 className="text-lg font-medium">{t('scanningReceipt', 'Scanning Receipt...')}</h3>
            <p className="text-gray-500 text-center mt-2">{t('scanningDescription', 'We are analyzing your receipt to identify items and prices')}</p>
          </div>
        </div>
      )}
      
      {scanComplete && (
        <>
          <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
            <h2 className="text-lg font-semibold mb-1">{t('detectedItems', 'Detected Items')}</h2>
            <p className="text-gray-600 mb-4">{t('selectItemsDescription', 'Select items you want to add to your smart cart')}</p>
            
            <div className="mb-3 flex items-center">
              <input
                type="checkbox"
                id="selectAll"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded"
                checked={selectedItems.length === detectedItems.length}
                onChange={() => {
                  if (selectedItems.length === detectedItems.length) {
                    setSelectedItems([]);
                  } else {
                    setSelectedItems([...detectedItems]);
                  }
                }}
              />
              <label htmlFor="selectAll" className="ml-2 text-sm font-medium">
                {t('selectAll', 'Select All')} ({detectedItems.length})
              </label>
            </div>
            
            <div className="space-y-3">
              {detectedItems.map(item => (
                <div key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`item-${item.id}`}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded"
                    checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                  />
                  <label htmlFor={`item-${item.id}`} className="ml-2 flex-1">
                    <SmartCartItem 
                      item={item}
                      onUpdateQuantity={(_, qty) => handleQuantityChange(item.id, qty)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-gray-600">{t('selectedItems', 'Selected')}:</span>
                <span className="font-semibold ml-1">{totalSelectedItems} {t('items', 'items')}</span>
              </div>
              <div>
                <span className="text-gray-600">{t('total', 'Total')}:</span>
                <span className="font-semibold ml-1">₪{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              className="w-full bg-primary text-white py-3 px-6 rounded-full font-medium hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={selectedItems.length === 0}
              onClick={handleCreateSmartCart}
            >
              {t('createSmartCart', 'Create Smart Cart')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReceiptUploadPage;