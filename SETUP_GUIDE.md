# Price Comparison App - Setup Guide

## Environment Setup

### 1. Dependencies Installation
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

Update `EXPO_PUBLIC_API_URL` based on your setup:
- **iOS Simulator**: `http://localhost:5001`
- **Android Emulator**: `http://10.0.2.2:5001`
- **Physical Device**: `http://YOUR_COMPUTER_IP:5001`

### 3. Backend Setup
Ensure your backend server is running on port 5001. The app expects:
- Authentication endpoints: `/api/login`, `/api/register`
- Cart endpoints: `/api/carts`, `/api/carts/:id/items`
- Product data endpoints

### 4. Running the App
```bash
# Start Expo development server
npm start

# Run on iOS (requires Mac with Xcode)
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Project Structure

- `/screens` - React Native screen components
- `/components` - Reusable UI components
- `/context` - React Context providers (Auth, Cart)
- `/theme` - Design system (colors, fonts, spacing)
- `/old_files` - Legacy code (to be cleaned up)
- `/metriks-ui` - Separate Vite/React web app

## Key Features

1. **Authentication**: User login/signup with secure token storage
2. **Shopping Cart**: Add/remove items, quantity management
3. **Product Search**: Browse and search products
4. **Store Locator**: Find nearby stores
5. **Price Comparison**: Compare prices across retailers

## Data Flow

1. **Cart Context** (`/context/CartContext.js`):
   - Uses `masterproductid` as unique identifier
   - Syncs with backend when authenticated
   - Falls back to local state when offline

2. **Auth Context** (`/context/AuthContext.js`):
   - Manages user authentication state
   - Stores tokens securely using expo-secure-store

## Troubleshooting

1. **Network Issues**: Check API_URL configuration matches your backend
2. **TypeScript Errors**: Run `npm install` to ensure all types are installed
3. **Cart Not Loading**: Verify backend endpoints are accessible