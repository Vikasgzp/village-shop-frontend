import { BrowserRouter, Routes, Route } from "react-router-dom";

import Categories from "./pages/Categories";
import ShopList from "./pages/ShopList";
import ShopDetail from "./pages/ShopDetail";
import ShopLogin from "./pages/ShopLogin";
import ShopDashboard from "./pages/ShopDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/shops/:category" element={<ShopList />} />
        <Route path="/shop/:id" element={<ShopDetail />} />

        {/* Shopkeeper */}
        <Route path="/shop-login" element={<ShopLogin />} />
        <Route path="/shop-dashboard" element={<ShopDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
