import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ReceiptUploader = ({ onUpload, onScan }) => {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };
  
  const handleFiles = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      
      onUpload && onUpload(file);
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const handleScan = () => {
    if (!uploadedImage) return;
    
    setIsLoading(true);
    
    // Simulate scanning process
    setTimeout(() => {
      onScan && onScan(uploadedImage);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col items-center">
        <div 
          className={`border-2 border-dashed w-full rounded-xl p-8 mb-4 text-center transition-colors ${dragActive ? 'border-primary bg-primary/5' : uploadedImage ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!uploadedImage ? (
            <div className="flex flex-col items-center justify-center h-48">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-lg font-medium text-gray-700">{t('dropReceiptHere', 'Drop receipt image here')}</p>
              <p className="text-sm text-gray-500">{t('orClickBelow', 'or click below to browse files')}</p>
              <button
                type="button"
                onClick={handleButtonClick}
                className="mt-4 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary/90"
              >
                {t('uploadReceiptButton', 'Upload Receipt Image')}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48">
              <div className="relative w-full h-full">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded receipt" 
                  className="max-h-full max-w-full mx-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            multiple={false}
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>
        
        {uploadedImage && (
          <button
            type="button"
            onClick={handleScan}
            disabled={isLoading}
            className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('scanning', 'Scanning...')}
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                </svg>
                {t('scanReceipt', 'Scan Receipt')}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReceiptUploader;