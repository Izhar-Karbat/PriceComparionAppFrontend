import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
// Note: These will be created later, but we set up the routing structure now
import Home from "../pages/Home";
import Supermarket from "../pages/Supermarket";
import PharmaHome from "../pages/PharmaHome";
import ElectronicsHome from "../pages/ElectronicsHome";
import Cart from "../pages/Cart";
import Stats from "../pages/Stats";
import SmartTable from "../pages/SmartTable";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ReceiptScanner from "../pages/ReceiptScanner";
import NearbyStores from "../pages/NearbyStores";
import ProductDetail from "../pages/ProductDetail";
import SearchResults from "../pages/SearchResults";
import Account from "../pages/Account";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core navigation */}
        <Route path="/" element={<Home />} />
        
        {/* Supermarket section */}
        <Route path="/supermarket" element={<Supermarket />} />
        <Route path="/supermarket/product/:id" element={<ProductDetail />} />
        <Route path="/supermarket/search" element={<SearchResults />} />
        
        {/* Pharma section */}
        <Route path="/pharma" element={<PharmaHome />} />
        <Route path="/pharma/product/:id" element={<ProductDetail />} />
        <Route path="/pharma/search" element={<SearchResults />} />
        
        {/* Electronics section */}
        <Route path="/electronics" element={<ElectronicsHome />} />
        <Route path="/electronics/product/:id" element={<ProductDetail />} />
        <Route path="/electronics/search" element={<SearchResults />} />
        
        {/* Shared features */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/smart-table" element={<SmartTable />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/scanner" element={<ReceiptScanner />} />
        <Route path="/nearby-stores" element={<NearbyStores />} />
        
        {/* User account */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}