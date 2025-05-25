import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

type TableItem = {
  id: number;
  name: string;
  quantity: number;
};

const SmartTable = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<TableItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTable, setGeneratedTable] = useState<any | null>(null);
  
  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newItem = {
        id: Date.now(),
        name: inputValue.trim(),
        quantity: 1,
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };
  
  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const handlePaste = () => {
    // In a real app, this would parse a clipboard text
    const mockItems = [
      { id: Date.now() + 1, name: 'Milk 3%', quantity: 1 },
      { id: Date.now() + 2, name: 'Eggs Large', quantity: 1 },
      { id: Date.now() + 3, name: 'Bread', quantity: 1 },
    ];
    
    setItems([...items, ...mockItems]);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };
  
  const handleGenerateTable = () => {
    if (items.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate API call to generate price comparison table
    setTimeout(() => {
      // Mock response data
      const table = {
        items: items.map(item => ({
          ...item,
          prices: [
            { 
              storeName: 'Shufersal',
              price: (Math.random() * 10 + 5).toFixed(2),
              inStock: Math.random() > 0.2
            },
            { 
              storeName: 'Rami Levy',
              price: (Math.random() * 10 + 5).toFixed(2),
              inStock: Math.random() > 0.2
            },
            { 
              storeName: 'Victory',
              price: (Math.random() * 10 + 5).toFixed(2),
              inStock: Math.random() > 0.2
            }
          ]
        })),
        totals: {
          Shufersal: (Math.random() * 100 + 50).toFixed(2),
          'Rami Levy': (Math.random() * 100 + 50).toFixed(2),
          Victory: (Math.random() * 100 + 50).toFixed(2)
        },
        recommendation: 'Rami Levy'
      };
      
      setGeneratedTable(table);
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <Layout
      title={t('smartTable')}
      showBackButton={true}
    >
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-3">{t('createSmartTable', 'Create Smart Table')}</h2>
          <p className="text-gray-600 text-sm mb-4">
            {t('smartTableDescription', 'Add items to your list and generate a price comparison across different stores')}
          </p>
          
          <div className="flex mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('enterItemName', 'Enter item name...')}
              className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleAddItem}
              className="bg-primary text-white px-4 py-2 rounded-r-lg"
            >
              {t('add', 'Add')}
            </button>
          </div>
          
          <div className="flex justify-end mb-4">
            <button 
              onClick={handlePaste}
              className="text-primary text-sm font-medium"
            >
              {t('pasteFromClipboard', 'Paste from clipboard')}
            </button>
          </div>
          
          {items.length > 0 ? (
            <div className="space-y-2 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mr-2">
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
                  
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 mb-4">
              {t('noItemsAdded', 'No items added yet')}
            </div>
          )}
          
          <Button
            variant="primary"
            fullWidth
            onClick={handleGenerateTable}
            disabled={items.length === 0 || isGenerating}
          >
            {isGenerating 
              ? t('generating', 'Generating...') 
              : t('generateTable', 'Generate Price Comparison')}
          </Button>
        </div>
        
        {generatedTable && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-3">{t('priceComparison', 'Price Comparison')}</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2 text-left">{t('item', 'Item')}</th>
                    <th className="py-2 px-2 text-right">Shufersal</th>
                    <th className="py-2 px-2 text-right">Rami Levy</th>
                    <th className="py-2 px-2 text-right">Victory</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedTable.items.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 px-2">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">x{item.quantity}</div>
                      </td>
                      {item.prices.map((price: any, index: number) => (
                        <td key={index} className="py-2 px-2 text-right">
                          {price.inStock ? (
                            <span className="font-medium">₪{price.price}</span>
                          ) : (
                            <span className="text-red-500 text-sm">Out of stock</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-2 font-bold">{t('total', 'Total')}</td>
                    <td className="py-2 px-2 text-right font-bold">₪{generatedTable.totals['Shufersal']}</td>
                    <td className="py-2 px-2 text-right font-bold">₪{generatedTable.totals['Rami Levy']}</td>
                    <td className="py-2 px-2 text-right font-bold">₪{generatedTable.totals['Victory']}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-lg">
              <p className="font-medium">
                {t('recommendation', 'Recommendation')}: {generatedTable.recommendation}
              </p>
              <p className="text-sm">
                {t('bestDeal', 'This store offers the best overall price for your items')}
              </p>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button 
                variant="outline" 
                fullWidth
              >
                {t('saveTable', 'Save Table')}
              </Button>
              <Button 
                variant="outline" 
                fullWidth
              >
                {t('share', 'Share')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SmartTable;