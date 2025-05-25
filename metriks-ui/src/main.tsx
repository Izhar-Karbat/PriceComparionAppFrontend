import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CartProvider } from './context/CartContext'
import { LanguageProvider } from './context/LanguageContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LanguageProvider>
  </React.StrictMode>,
)