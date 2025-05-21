import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

type ScannedItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
};

const ReceiptScanner = () => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setScannedItems([]);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setScannedItems([]);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const scanReceipt = () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    
    // Simulate API call to scan receipt
    setTimeout(() => {
      // Mock scanned items
      const mockItems: ScannedItem[] = [
        { id: 1, name: 'Milk 3% Tnuva', price: 6.90, quantity: 1, selected: true },
        { id: 2, name: 'Eggs Large (12)', price: 14.50, quantity: 1, selected: true },
        { id: 3, name: 'Bread White', price: 8.90, quantity: 1, selected: true },
        { id: 4, name: 'Tomatoes 1kg', price: 7.90, quantity: 1, selected: true },
        { id: 5, name: 'Paper Towels', price: 12.90, quantity: 1, selected: true },
      ];
      
      setScannedItems(mockItems);
      setIsScanning(false);
    }, 2000);
  };
  
  const toggleItemSelection = (id: number) => {
    setScannedItems(scannedItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };
  
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setScannedItems(scannedItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const selectAll = () => {
    setScannedItems(scannedItems.map(item => ({ ...item, selected: true })));
  };
  
  const deselectAll = () => {
    setScannedItems(scannedItems.map(item => ({ ...item, selected: false })));
  };
  
  const addToSmartTable = () => {
    // In a real app, this would add selected items to a smart table
    const selectedItems = scannedItems.filter(item => item.selected);
    if (selectedItems.length === 0) return;
    
    alert(`Added ${selectedItems.length} items to smart table`);
  };
  
  return (
    <Layout
      title={t('scanReceipt')}
      showBackButton={true}
    >
      <div className="space-y-4">
        {!selectedImage ? (
          <div
            className="bg-white rounded-xl shadow-sm p-4 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-60"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            
            <p className="text-gray-500 mb-4">{t('dragOrTap', 'Drag & drop receipt image or tap to browse')}</p>
            
            <Button
              variant="primary"
              onClick={triggerFileInput}
            >
              {t('uploadImage', 'Upload Image')}
            </Button>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="relative h-60 mb-4">
              <img
                src={selectedImage}
                alt="Receipt"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {scannedItems.length === 0 ? (
              <Button
                variant="primary"
                fullWidth
                onClick={scanReceipt}
                disabled={isScanning}
              >
                {isScanning 
                  ? t('scanning', 'Scanning Receipt...') 
                  : t('scanNow', 'Scan Receipt')}
              </Button>
            ) : (
              <>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{t('scannedItems', 'Scanned Items')}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={selectAll}
                      className="text-sm text-primary"
                    >
                      {t('selectAll', 'Select All')}
                    </button>
                    <button
                      onClick={deselectAll}
                      className="text-sm text-gray-500"
                    >
                      {t('deselectAll', 'Deselect All')}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {scannedItems.map(item => (
                    <div 
                      key={item.id}
                      className="flex items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleItemSelection(item.id)}
                        className="mr-3 h-5 w-5 text-primary rounded"
                      />
                      
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">₪{item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 bg-gray-200 rounded-full"
                        >
                          -
                        </button>
                        
                        <span>{item.quantity}</span>
                        
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 bg-gray-200 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  onClick={addToSmartTable}
                >
                  {t('addToSmartTable', 'Add to Smart Table')}
                </Button>
              </>
            )}
          </div>
        )}
        
        <div className="bg-gray-100 rounded-xl p-4">
          <h3 className="font-semibold mb-2">{t('scanTips', 'Tips for best results')}</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>{t('tipFlatSurface', 'Place receipt on a flat surface')}</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>{t('tipGoodLighting', 'Ensure good lighting')}</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>{t('tipFullReceipt', 'Include the full receipt in the image')}</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiptScanner;