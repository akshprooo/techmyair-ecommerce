import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Handbag, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-black/50 border-b border-b-white/50 text-white relative">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-semibold font-[montserrat] z-50"
      >
        TechMy
        <span className="font-bold text-amber-700 text-3xl">Air</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex h-full items-center gap-6">
        <Link
          to="/"
          className="font-[montserrat] line relative inline-block text-lg leading-[170%] cursor-pointer no-underline text-inherit"
        >
          All Products
        </Link>
        <Link
          to="/contact"
          className="font-[montserrat] line relative inline-block text-lg leading-[170%] cursor-pointer no-underline text-inherit"
        >
          Contact
        </Link>
      </div>

      {/* Desktop Icons */}
      <div className="hidden md:flex gap-4 items-center">
        <Link
          to="/cart"
          className="font-[montserrat] bg-amber-700/90 rounded-full p-2"
        >
          <Handbag size={24} />
        </Link>
        <Link
          to="/profile"
          className="font-[montserrat] bg-amber-700/90 rounded-full p-2"
        >
          <User size={24} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden z-50 bg-amber-700/90 p-2 rounded-full"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-black/90 text-white transform transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 font-[montserrat]">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl hover:text-amber-500"
          >
            All Products
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-xl hover:text-amber-500"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-xl hover:text-amber-500"
          >
            <Handbag size={24} /> Cart ({cart?.length || 0})
          </Link>
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-xl hover:text-amber-500"
          >
            <User size={24} /> Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;