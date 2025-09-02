import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import AuthPage from "./pages/AuthPage";
import Product from "./pages/Product";
import { ToastContainer } from "react-toastify";
import CheckoutPage from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Credit from "./components/Credit";

function App() {
  return (
    <div className="min-h-screen w-full bg-zinc-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<AuthPage />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/success" element={<OrderSuccess />} />
          </Routes>
          <Credit />
          <ToastContainer position="bottom-center" autoClose={1000} />
    </div>
  );
}

export default App;
