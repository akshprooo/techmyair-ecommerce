import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { Handbag, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const { cart } = useCart();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const cartItemCount = cart?.reduce((total, item) => total + (item.qty || 1), 0) || 0;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-black hover:text-blue-500 transition-colors z-50"
            >
              TechMy
              <span className="text-blue-500">Air</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-black hover:text-amber-700 font-medium transition-colors relative ${
                  location.pathname === "/" ? "text-amber-700" : ""
                }`}
              >
                All Products
                {location.pathname === "/" && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-700"></div>
                )}
              </Link>
              
              {/* <Link
                to="/about"
                className={`text-black hover:text-amber-700 font-medium transition-colors relative ${
                  location.pathname === "/about" ? "text-amber-700" : ""
                }`}
              >
                About
                {location.pathname === "/about" && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-700"></div>
                )}
              </Link> */}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-black hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
              >
                <Handbag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <Link
                to="/profile"
                className="flex items-center space-x-2 p-2 text-black hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
              >
                <User size={20} />
                {user && (
                  <span className="text-sm font-medium hidden lg:block">
                    {user.email?.split('@')[0]}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-black hover:text-amber-700 hover:bg-gray-100 rounded-lg transition-colors z-50 relative"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 md:hidden ${
            menuOpen ? 'bg-opacity-50 visible' : 'bg-opacity-0 invisible'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-semibold text-black">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
              {/* User Info */}
              {user && (
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <User size={20} className="text-amber-700" />
                    </div>
                    <div>
                      <p className="font-medium text-black">Welcome back!</p>
                      <p className="text-sm text-gray-600 truncate max-w-[200px]">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-4">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === "/" 
                      ? "bg-amber-50 text-amber-700" 
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  <span className="font-medium">Shop</span>
                </Link>

                {/* <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === "/about" 
                      ? "bg-amber-50 text-amber-700" 
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  <span className="font-medium">About</span>
                </Link> */}

                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg text-black hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Handbag size={20} />
                    <span className="font-medium">Cart</span>
                  </div>
                  {cartItemCount > 0 && (
                    <span className="bg-amber-700 text-white text-xs px-2 py-1 rounded-full font-medium min-w-[20px] text-center">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg text-black hover:bg-gray-100 transition-colors"
                >
                  <User size={20} />
                  <span className="font-medium">Account</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Footer */}
            {!user && (
              <div className="p-4 border-t border-gray-200">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full bg-amber-700 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;