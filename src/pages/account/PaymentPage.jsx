import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PaymentPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  
  // Billing address state
  const [country, setCountry] = useState('Israel');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  
  // Form validation
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Get plan details from location state
  const planId = location.state?.planId || 'premium';
  const billingPeriod = location.state?.billingPeriod || 'monthly';
  const amount = location.state?.amount || 4.99;
  
  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format expiry date (MM/YY)
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  // Handle card number input
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: null });
    }
  };
  
  // Handle expiry date input
  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
    
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: null });
    }
  };
  
  // Validate the payment form
  const validateForm = () => {
    const newErrors = {};
    
    if (!cardholderName.trim()) {
      newErrors.cardholderName = t('cardholderNameRequired', 'Cardholder name is required');
    }
    
    if (!cardNumber.trim()) {
      newErrors.cardNumber = t('cardNumberRequired', 'Card number is required');
    } else if (cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = t('cardNumberInvalid', 'Card number is invalid');
    }
    
    if (!expiryDate.trim()) {
      newErrors.expiryDate = t('expiryDateRequired', 'Expiry date is required');
    } else if (expiryDate.length < 5) {
      newErrors.expiryDate = t('expiryDateInvalid', 'Expiry date is invalid');
    }
    
    if (!cvv.trim()) {
      newErrors.cvv = t('cvvRequired', 'CVV is required');
    } else if (cvv.length < 3) {
      newErrors.cvv = t('cvvInvalid', 'CVV is invalid');
    }
    
    if (!streetAddress.trim()) {
      newErrors.streetAddress = t('streetAddressRequired', 'Street address is required');
    }
    
    if (!city.trim()) {
      newErrors.city = t('cityRequired', 'City is required');
    }
    
    if (!zip.trim()) {
      newErrors.zip = t('zipRequired', 'Postal code is required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        
        // Redirect to account page after successful payment
        setTimeout(() => {
          navigate('/account');
        }, 3000);
      }, 2000);
    }
  };
  
  return (
    <div className="py-4">
      {isSuccess ? (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t('paymentSuccess', 'Payment Successful!')}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {t('paymentSuccessMessage', 'Your payment has been processed successfully. You will be redirected to your account page.')}
          </p>
          
          <div className="animate-pulse text-green-600 text-sm">
            {t('redirecting', 'Redirecting...')}
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t('orderSummary', 'Order Summary')}
              </h3>
            </div>
            
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between mb-3">
                <span className="font-medium">{t('plan', 'Plan')}</span>
                <span className="capitalize">{planId}</span>
              </div>
              
              <div className="flex justify-between mb-3">
                <span className="font-medium">{t('billingCycle', 'Billing Cycle')}</span>
                <span className="capitalize">{billingPeriod}</span>
              </div>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('total', 'Total')}</span>
                <span>${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t('paymentMethod', 'Payment Method')}
              </h3>
            </div>
            
            <div className="px-4 py-5 sm:px-6">
              {/* Payment Method Selection */}
              <div className="mb-5">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-3 border rounded-lg flex justify-center items-center ${
                      paymentMethod === 'card' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-300'
                    }`}
                  >
                    <svg className="h-6 w-6 text-gray-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>{t('creditCard', 'Credit Card')}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex-1 p-3 border rounded-lg flex justify-center items-center ${
                      paymentMethod === 'paypal' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-300'
                    }`}
                  >
                    <svg className="h-6 w-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.755.755 0 0 1-.544-.232.764.764 0 0 1-.198-.57L4.109.656A.753.753 0 0 1 4.854 0h6.915c2.466 0 4.217.534 5.31 1.622.988.982 1.478 2.243 1.478 3.78 0 .742-.12 1.482-.345 2.235-.249.786-.611 1.49-1.088 2.12a6.73 6.73 0 0 1-1.6 1.573c-.654.453-1.4.827-2.26 1.134-.845.299-1.73.455-2.71.455h-2.673l-.698 8.416a.76.76 0 0 1-.758.666l-.003.001z" />
                      <path d="M19.031 6.163c0 1.422-.518 2.624-1.513 3.581-1.053 1.01-2.553 1.521-4.477 1.521h-2.694l-.727 8.78h-3.655l1.924-20.48h6.889c1.886 0 3.347.486 4.343 1.452.988.959 1.483 2.203 1.483 3.728l-.002.001z" />
                    </svg>
                    <span>PayPal</span>
                  </button>
                </div>
              </div>
              
              {/* Credit Card Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('cardholderName', 'Cardholder Name')}
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        placeholder="John Doe"
                        value={cardholderName}
                        onChange={(e) => {
                          setCardholderName(e.target.value);
                          if (errors.cardholderName) setErrors({ ...errors, cardholderName: null });
                        }}
                        className={`block w-full p-3 border ${
                          errors.cardholderName ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                      />
                      {errors.cardholderName && <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('cardNumber', 'Card Number')}
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className={`block w-full p-3 border ${
                          errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                      />
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('expiryDate', 'Expiry Date')}
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          maxLength={5}
                          className={`block w-full p-3 border ${
                            errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                        />
                        {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('cvv', 'CVV')}
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setCvv(value);
                            if (errors.cvv) setErrors({ ...errors, cvv: null });
                          }}
                          maxLength={4}
                          className={`block w-full p-3 border ${
                            errors.cvv ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                        />
                        {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="save-card"
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                        {t('saveCardForFuture', 'Save this card for future payments')}
                      </label>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        {t('billingAddress', 'Billing Address')}
                      </h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('country', 'Country')}
                          </label>
                          <select
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="Israel">Israel</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('streetAddress', 'Street Address')}
                          </label>
                          <input
                            type="text"
                            id="streetAddress"
                            value={streetAddress}
                            onChange={(e) => {
                              setStreetAddress(e.target.value);
                              if (errors.streetAddress) setErrors({ ...errors, streetAddress: null });
                            }}
                            className={`block w-full p-3 border ${
                              errors.streetAddress ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                          />
                          {errors.streetAddress && <p className="mt-1 text-sm text-red-600">{errors.streetAddress}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('city', 'City')}
                            </label>
                            <input
                              type="text"
                              id="city"
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                                if (errors.city) setErrors({ ...errors, city: null });
                              }}
                              className={`block w-full p-3 border ${
                                errors.city ? 'border-red-300' : 'border-gray-300'
                              } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                            />
                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('postalCode', 'Postal Code')}
                            </label>
                            <input
                              type="text"
                              id="zip"
                              value={zip}
                              onChange={(e) => {
                                setZip(e.target.value);
                                if (errors.zip) setErrors({ ...errors, zip: null });
                              }}
                              className={`block w-full p-3 border ${
                                errors.zip ? 'border-red-300' : 'border-gray-300'
                              } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                            />
                            {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:bg-primary/70 disabled:cursor-not-allowed flex justify-center"
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('processing', 'Processing...')}
                          </>
                        ) : (
                          <>
                            {t('pay', 'Pay')} ${amount.toFixed(2)}
                          </>
                        )}
                      </button>
                      
                      <p className="mt-4 text-center text-xs text-gray-500">
                        {t('securePaymentMessage', 'Your payment information is secure. We use encrypted SSL security to ensure your data is protected.')}
                      </p>
                    </div>
                  </div>
                </form>
              )}
              
              {/* PayPal Form */}
              {paymentMethod === 'paypal' && (
                <div className="text-center py-6">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-blue-500 mx-auto">
                      <path d="M6.823 21.323c-1.297 0-2.5-.779-2.99-2.02-.161-.4-.218-.632-.391-1.702-.378-2.351.785-4.011 3.123-4.449 0 0 1.159-.265 3.295-.234 1.85.027 1.735.447.359.519-3.103.162-3.501.232-3.501.232-1.607.091-2.506 1.143-2.265 2.766.111.747.148.908.286 1.246.4.982 1.263 1.28 2.131.802.608-.336 1.072-.58 1.733-2.111.5-1.16.874-3.139.993-3.988.117-.843-.311-1.339-1.003-1.482-.754-.155-2.129.81-2.129.81s.507-2.292 3.375-2.581c0 0 3.045-.561 3.046 2.189 0 0 .058 1.301-1.347 4.435-1.595 3.565-2.156 4.069-3.001 4.415-.657.269-1.158.36-1.714.153zm5.559-8.124c.083-.437.15-.789.208-1.141.433-2.578.406-2.832-.112-3.176-.6-.398-1.509-.444-2.38-.41-.798.03-1.440.098-1.982.187 0 0 .143-.83.234-1.139.347-1.236.8-1.678 1.741-1.822.687-.106 1.137.016 2.343.201 2.103.323 2.856-.422 3.207-1.479.543-1.63.174-3.149-.576-3.83-1.062-.962-2.594-1.44-4.539-1.44-1.916 0-3.143.433-4.176 1.034C3.742 1.652 3.085 3.4 2.952 5.472c-.136 2.118.613 3.894 1.669 4.795.837.714 1.93 1.044 3.104.977 2.325-.133 3.576-.885 4.204-1.566-.101.535-.238 1.096-.32 1.446-.181.78-.405 1.693-.405 1.693s-.71.138-.995.138c-.579 0-.947-.253-1.057-.783-.08-.384-.04-.624-.04-.624h-2.274c-.118.84-.315 1.92-.178 2.791.175 1.109.914 1.802 2.156 1.895 1.225.091 2.075-.127 2.626-.531.562-.413.871-.832 1.121-1.875.149-.618.358-1.695.56-2.741.179-.93.36-1.796.54-2.482.267 1.04.895 1.892 2.016 2.542 1.15.668 2.34.765 3.096.682.76-.084 1.507-.405 2.085-.86.716-.564 1.131-1.175 1.489-1.904.55-1.122.693-2.193.654-3.512-.05-1.727-.8-3.097-1.897-3.742-1.08-.634-2.453-.497-3.328.318-.382.357-.699.771-.765 1.333-.11.932.186 1.678.957 2.046.55.262 1.895.094 1.736-.916-.043-.27-.196-.56-.49-.764-.31-.215-.096-.416.087-.515.502-.268 1.245.138 1.409.886.188.857-.359 2.065-2.238 2.132-1.301.047-2.607-.358-2.935-1.991-.313-1.558.545-3.284 2.636-4.108 2.072-.817 4.97-.283 6.04 1.554.757 1.299.928 2.875.455 4.636-.467 1.738-1.401 2.739-2.928 3.199-.929.28-2.338.243-3.373-.397-.97-.6-1.198-1.157-1.198-1.157-.194.749-.412 1.555-.412 1.555s.337.76 1.195 1.345c1.568 1.067 4.02 1.092 6.078.04 1.789-.913 2.82-2.391 3.423-4.296.349-1.107.437-3.212-.17-4.902-1.212-3.368-5.158-4.606-8.953-4.32-3.075.235-4.674 1.41-5.665 2.242C.385 2.73-.298 4.339.11 6.852c.553 3.392 2.95 3.414 2.95 3.414-.126.78-.325 1.759-.462 2.48-.143.752-.31 1.478-.536 2.153-.309.912-.728 1.574-1.328 2.094-.779.674-1.797 1.089-3.11 1.132-1.255.041-2.234-.253-2.912-.922-1.264-1.246-1.718-4.184-1.034-7.344.683-3.157 2.42-5.723 4.213-7.175C-.435 4.605 2.55 2.7 5.225 2.086c3.482-.8 7.032.297 8.776 1.908.657.607 1.096 1.346 1.333 2.114.341 1.12.203 2.312-.145 3.361-.249.751-.582 1.386-.927 1.745-.209.218-.331.293-.602.445-.268.152-.684.112-.935-.093-.445-.361-1.356-.865-1.356-.865h-.122c0-.01-.242 1.334-.24 1.332.003.046.204.189.371.336.613.544 1.496.956 2.556.956.878 0 1
                    .675-.332 2.27-.92.596-.59 1.075-1.198 1.27-1.676.193-.477.266-.87.364-1.8z" />
                    </svg>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {t('paypalMessage', 'You will be redirected to PayPal to complete your payment.')}
                  </p>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('processing', 'Processing...')}
                      </>
                    ) : (
                      <>
                        {t('continueToPaypal', 'Continue to PayPal')}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPage;