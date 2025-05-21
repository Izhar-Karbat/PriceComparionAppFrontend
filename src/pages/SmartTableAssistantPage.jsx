import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SmartTableAssistantPage = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: t('aiAssistantWelcome', 'Hello! I\'m your Smart Table Assistant. I can help you find the best prices, compare products, and assist with your shopping. How can I help you today?'),
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Suggested questions
  const suggestedQuestions = [
    t('suggestedQuestion1', 'Where can I find the cheapest milk?'),
    t('suggestedQuestion2', 'Compare prices for Pampers diapers'),
    t('suggestedQuestion3', 'Show me the best deals on coffee this week'),
    t('suggestedQuestion4', 'What\'s the price difference between Osem and Telma pasta?'),
  ];
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse;
      
      // Simple pattern matching for demo purposes
      if (text.toLowerCase().includes('milk') || text.toLowerCase().includes('חלב')) {
        aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          text: t('aiMilkResponse', 'I found the best prices for milk:\n\n1. Victory - Tnuva Milk 3% (1L): ₪5.90\n2. Shufersal Deal - Tnuva Milk 3% (1L): ₪6.20\n3. Rami Levy - Tnuva Milk 3% (1L): ₪6.30\n\nWould you like me to add any of these to your smart table?'),
          timestamp: new Date(),
          withAction: true,
          actionType: 'comparison',
          data: [
            { store: 'Victory', brand: 'Tnuva', product: 'Milk 3% (1L)', price: 5.90 },
            { store: 'Shufersal Deal', brand: 'Tnuva', product: 'Milk 3% (1L)', price: 6.20 },
            { store: 'Rami Levy', brand: 'Tnuva', product: 'Milk 3% (1L)', price: 6.30 },
          ]
        };
      } else if (text.toLowerCase().includes('pampers') || text.toLowerCase().includes('diapers') || text.toLowerCase().includes('חיתולים')) {
        aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          text: t('aiDiapersResponse', 'Here\'s a comparison of Pampers diapers prices:\n\n1. Super-Pharm - Pampers Premium (Size 3, 68 units): ₪84.90\n2. Shufersal Online - Pampers Premium (Size 3, 68 units): ₪89.90\n3. Be Pharm - Pampers Premium (Size 3, 68 units): ₪79.90 (ON SALE!)\n\nWould you like me to add any of these to your smart table?'),
          timestamp: new Date(),
          withAction: true,
          actionType: 'comparison',
          data: [
            { store: 'Super-Pharm', brand: 'Pampers', product: 'Premium Size 3 (68 units)', price: 84.90 },
            { store: 'Shufersal Online', brand: 'Pampers', product: 'Premium Size 3 (68 units)', price: 89.90 },
            { store: 'Be Pharm', brand: 'Pampers', product: 'Premium Size 3 (68 units)', price: 79.90, onSale: true },
          ]
        };
      } else if (text.toLowerCase().includes('coffee') || text.toLowerCase().includes('קפה')) {
        aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          text: t('aiCoffeeResponse', 'I found these coffee deals this week:\n\n1. Rami Levy - Elite Turkish Coffee (200g): ₪14.90 (was ₪19.90)\n2. Shufersal - Landwer Turkish Coffee (200g): ₪16.90\n3. AM:PM - Jacobs Espresso Beans (500g): ₪39.90 (Buy 1 Get 1 50% off)\n\nWould you like to see more details or add these to your smart table?'),
          timestamp: new Date(),
          withAction: true,
          actionType: 'deals',
          data: [
            { store: 'Rami Levy', brand: 'Elite', product: 'Turkish Coffee (200g)', price: 14.90, oldPrice: 19.90 },
            { store: 'Shufersal', brand: 'Landwer', product: 'Turkish Coffee (200g)', price: 16.90 },
            { store: 'AM:PM', brand: 'Jacobs', product: 'Espresso Beans (500g)', price: 39.90, promotion: 'Buy 1 Get 1 50% off' },
          ]
        };
      } else if (text.toLowerCase().includes('pasta') || text.toLowerCase().includes('osem') || text.toLowerCase().includes('telma') || text.toLowerCase().includes('פסטה')) {
        aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          text: t('aiPastaResponse', 'Here\'s a comparison between Osem and Telma pasta products:\n\n• Osem Spaghetti (500g): ₪6.90 on average\n• Telma Spaghetti (500g): ₪5.90 on average\n\n• Osem Penne (500g): ₪7.50 on average\n• Telma Penne (500g): ₪6.20 on average\n\nTelma is generally 15-20% cheaper than Osem for similar pasta products. Would you like specific store prices?'),
          timestamp: new Date(),
          withAction: true,
          actionType: 'brandComparison',
          data: {
            categoryName: 'Pasta (500g)',
            brands: ['Osem', 'Telma'],
            products: [
              { type: 'Spaghetti', prices: [6.90, 5.90] },
              { type: 'Penne', prices: [7.50, 6.20] },
            ]
          }
        };
      } else {
        // Generic response
        aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          text: t('aiGenericResponse', 'I\'ll help you with that. To find the best prices, I need to know what product you\'re looking for. Could you provide more details about the specific product or brand you\'re interested in?'),
          timestamp: new Date(),
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handle adding products to smart table
  const handleAddToSmartTable = (data) => {
    console.log('Adding to smart table:', data);
    
    // Simulate adding to smart table
    setTimeout(() => {
      const confirmationMessage = {
        id: messages.length + 1,
        type: 'ai',
        text: t('aiAddToSmartTableConfirmation', 'I\'ve added these items to your smart table. You can view and edit them anytime from the Smart Table section. Is there anything else you\'d like to compare?'),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, confirmationMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
              }`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                </div>
              )}
              
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] relative ${
                  message.type === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">
                  {message.text}
                </div>
                
                {message.withAction && message.actionType === 'comparison' && (
                  <div className="mt-3 bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">{t('priceComparison', 'Price Comparison')}</h4>
                    <div className="space-y-2">
                      {message.data.map((item, index) => (
                        <div key={index} className={`flex justify-between items-center py-1 px-2 rounded ${item.onSale ? 'bg-green-50' : ''}`}>
                          <div>
                            <div className="font-medium">{item.store}</div>
                            <div className="text-sm text-gray-600">{item.brand} {item.product}</div>
                          </div>
                          <div className={`font-medium ${item.onSale ? 'text-green-600' : ''}`}>
                            ₪{item.price.toFixed(2)}
                            {item.onSale && <span className="text-xs ml-1">{t('sale', 'SALE')}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handleAddToSmartTable(message.data)}
                      className="mt-3 w-full py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/20"
                    >
                      {t('addToSmartTable', 'Add to Smart Table')}
                    </button>
                  </div>
                )}
                
                {message.withAction && message.actionType === 'deals' && (
                  <div className="mt-3 bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">{t('weeklyDeals', 'Weekly Deals')}</h4>
                    <div className="space-y-2">
                      {message.data.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-1 px-2 rounded bg-green-50">
                          <div>
                            <div className="font-medium">{item.store}</div>
                            <div className="text-sm text-gray-600">{item.brand} {item.product}</div>
                            {item.promotion && (
                              <div className="text-xs text-green-600">{item.promotion}</div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-green-600">₪{item.price.toFixed(2)}</div>
                            {item.oldPrice && (
                              <div className="text-xs text-gray-500 line-through">₪{item.oldPrice.toFixed(2)}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handleAddToSmartTable(message.data)}
                      className="mt-3 w-full py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/20"
                    >
                      {t('addToSmartTable', 'Add to Smart Table')}
                    </button>
                  </div>
                )}
                
                {message.withAction && message.actionType === 'brandComparison' && (
                  <div className="mt-3 bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">{t('brandComparison', 'Brand Comparison')}</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left py-1">{message.data.categoryName}</th>
                          {message.data.brands.map((brand, i) => (
                            <th key={i} className="text-right py-1">{brand}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {message.data.products.map((product, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="py-2 px-1">{product.type}</td>
                            {product.prices.map((price, j) => (
                              <td key={j} className="text-right py-2 px-1">₪{price.toFixed(2)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      onClick={() => handleAddToSmartTable(message.data)}
                      className="mt-3 w-full py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/20"
                    >
                      {t('compareInSmartTable', 'Compare in Smart Table')}
                    </button>
                  </div>
                )}
                
                <div className="text-xs opacity-70 mt-1 text-right">
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <div className="rounded-2xl px-6 py-4 bg-gray-100 text-gray-800 rounded-tl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      
      {/* Suggested questions */}
      {messages.length < 3 && (
        <div className="px-4 pb-4">
          <div className="text-sm font-medium text-gray-600 mb-2">
            {t('suggestedQuestions', 'Suggested Questions')}
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="bg-gray-100 text-gray-800 rounded-full px-3 py-2 text-sm hover:bg-gray-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center max-w-md mx-auto">
          <form
            className="flex w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('askQuestion', 'Ask a question...')}
              className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-primary text-white p-3 rounded-r-lg disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
        <div className="text-xs text-center text-gray-500 mt-2">
          {t('aiAssistantDisclaimer', 'This smart assistant provides price information based on recent data. Actual prices may vary.')}
        </div>
      </div>
    </div>
  );
};

export default SmartTableAssistantPage;