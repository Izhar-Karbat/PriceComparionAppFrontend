import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrderHistoryPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'processing', 'completed'
  
  // Mock order data
  const orders = [
    {
      id: 'ORD-2024-5678',
      date: '2024-05-15',
      store: 'Shufersal Online',
      items: [
        { id: 1, name: 'Organic Milk 3%', price: 5.90, quantity: 2 },
        { id: 2, name: 'Whole Wheat Bread', price: 7.50, quantity: 1 },
        { id: 3, name: 'Free-Range Eggs (12)', price: 19.90, quantity: 1 },
      ],
      total: 39.20,
      status: 'delivered',
      deliveryDate: '2024-05-17',
    },
    {
      id: 'ORD-2024-4567',
      date: '2024-05-08',
      store: 'Super-Pharm',
      items: [
        { id: 4, name: 'Facial Cleanser', price: 29.90, quantity: 1 },
        { id: 5, name: 'Multivitamins (60 caps)', price: 49.90, quantity: 1 },
      ],
      total: 79.80,
      status: 'delivered',
      deliveryDate: '2024-05-10',
    },
    {
      id: 'ORD-2024-3456',
      date: '2024-05-03',
      store: 'KSP Electronics',
      items: [
        { id: 6, name: 'Wireless Earbuds', price: 249.90, quantity: 1 },
      ],
      total: 249.90,
      status: 'processing',
      estimatedDelivery: '2024-05-22',
    },
    {
      id: 'ORD-2024-2345',
      date: '2024-04-27',
      store: 'Victory Supermarket',
      items: [
        { id: 7, name: 'Pasta Sauce', price: 12.90, quantity: 2 },
        { id: 8, name: 'Spaghetti', price: 5.50, quantity: 2 },
        { id: 9, name: 'Olive Oil (750ml)', price: 39.90, quantity: 1 },
      ],
      total: 76.70,
      status: 'delivered',
      deliveryDate: '2024-04-29',
    },
    {
      id: 'ORD-2024-1234',
      date: '2024-04-20',
      store: 'Mega Sport',
      items: [
        { id: 10, name: 'Running Shoes', price: 299.90, quantity: 1 },
        { id: 11, name: 'Fitness Tracker', price: 199.90, quantity: 1 },
      ],
      total: 499.80,
      status: 'cancelled',
      cancellationReason: 'Customer request',
    },
  ];
  
  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'processing') return order.status === 'processing';
    if (activeTab === 'completed') return order.status === 'delivered';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    return true;
  });
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format date to localized string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Handle view order details
  const handleViewOrder = (orderId) => {
    console.log(`View order details for: ${orderId}`);
    // In a real app, you would navigate to an order detail page
    // navigate(`/order-details/${orderId}`);
  };
  
  // Handle order reorder
  const handleReorder = (orderId) => {
    console.log(`Reorder items from order: ${orderId}`);
    // In a real app, you would add items to cart and navigate to the cart page
  };

  return (
    <div className="py-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {t('orderHistory', 'Order History')}
        </h1>
        <p className="text-gray-600 text-sm">
          {t('orderHistoryDesc', 'View and manage your past orders')}
        </p>
      </div>
      
      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm ${
              activeTab === 'all' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('all')}
          >
            {t('allOrders', 'All Orders')}
          </button>
          <button
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm ${
              activeTab === 'processing' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('processing')}
          >
            {t('processing', 'Processing')}
          </button>
          <button
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm ${
              activeTab === 'completed' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            {t('delivered', 'Delivered')}
          </button>
          <button
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm ${
              activeTab === 'cancelled' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('cancelled')}
          >
            {t('cancelled', 'Cancelled')}
          </button>
        </div>
      </div>
      
      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('noOrdersFound', 'No orders found')}
          </h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            {activeTab === 'all' 
              ? t('noOrdersYet', 'You haven\'t placed any orders yet. Start shopping to see your orders here.') 
              : t('noOrdersInCategory', 'You don\'t have any orders in this category.')}
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {t('startShopping', 'Start Shopping')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">{order.store}</h3>
                      <span className={`ml-3 text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                        {t(order.status, order.status.charAt(0).toUpperCase() + order.status.slice(1))}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.id} | {formatDate(order.date)}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium">${order.total.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">
                      {order.items.length} {order.items.length === 1 ? t('item', 'item') : t('items', 'items')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50">
                <div className="mb-3">
                  {order.status === 'processing' && (
                    <div className="text-sm">
                      <span className="text-gray-600">{t('estimatedDelivery', 'Estimated Delivery')}:</span> {formatDate(order.estimatedDelivery)}
                    </div>
                  )}
                  
                  {order.status === 'delivered' && (
                    <div className="text-sm">
                      <span className="text-gray-600">{t('deliveredOn', 'Delivered on')}:</span> {formatDate(order.deliveryDate)}
                    </div>
                  )}
                  
                  {order.status === 'cancelled' && (
                    <div className="text-sm">
                      <span className="text-gray-600">{t('cancellationReason', 'Cancellation Reason')}:</span> {order.cancellationReason}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="text-sm font-medium text-gray-700 py-1.5 px-3 rounded border border-gray-300 hover:bg-gray-100"
                  >
                    {t('viewDetails', 'View Details')}
                  </button>
                  
                  {(order.status === 'delivered' || order.status === 'cancelled') && (
                    <button
                      onClick={() => handleReorder(order.id)}
                      className="text-sm font-medium text-primary py-1.5 px-3 rounded border border-primary hover:bg-primary/5"
                    >
                      {t('reorder', 'Reorder')}
                    </button>
                  )}
                  
                  {order.status === 'processing' && (
                    <button className="text-sm font-medium text-gray-700 py-1.5 px-3 rounded border border-gray-300 hover:bg-gray-100">
                      {t('trackOrder', 'Track Order')}
                    </button>
                  )}
                </div>
              </div>
              
              {/* Preview of items */}
              <div className="px-4 py-3 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {t('orderItems', 'Order Items')}
                </h4>
                
                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <span className="text-gray-800">{item.quantity} × </span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <div className="text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  {order.items.length > 2 && (
                    <div className="text-sm text-primary font-medium">
                      + {order.items.length - 2} {t('moreItems', 'more items')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Help Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="font-medium text-gray-900">
            {t('needHelp', 'Need Help With Your Order?')}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col space-y-3">
            <button className="flex items-center text-gray-700 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              {t('orderFAQ', 'Order FAQs')}
            </button>
            
            <button className="flex items-center text-gray-700 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              {t('contactSupport', 'Contact Support')}
            </button>
            
            <button className="flex items-center text-gray-700 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              {t('returnPolicy', 'Return Policy')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Download Invoice Section */}
      {filteredOrders.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            {t('needInvoice', 'Need an invoice or receipt? ')}
            <button className="text-primary font-medium">
              {t('downloadInvoices', 'Download All Invoices')}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;