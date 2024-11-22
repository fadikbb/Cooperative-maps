import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="fixed w-full z-50 bg-[#4d9900] shadow-lg"
      style={{ backgroundColor: "#4d9900" }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with enhanced styling */}
        <div className="text-3xl font-extrabold text-white tracking-wider">
          <Link
            to="/"
            className="hover:text-[rgba(248,197,25,255)] transition-all duration-300"
          >
            BrandName
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to={`/`}
            className="text-white text-lg font-medium 
                         hover:text-[rgba(248,197,25,255)]
                         hover:scale-105 
                         transition-all 
                         duration-300 
                         px-3 py-2 
                         rounded-lg 
                         hover:bg-green-800/30"
          >
            Home
          </Link>
          <Link
            to={`/Products`}
            className="text-white text-lg font-medium 
                         hover:text-[rgba(248,197,25,255)]
                         hover:scale-105 
                         transition-all 
                         duration-300 
                         px-3 py-2 
                         rounded-lg 
                         hover:bg-green-800/30"
          >
            Products
          </Link>
          <Link
            to={`/cart`}
            className="text-white text-lg font-medium 
                         hover:text-[rgba(248,197,25,255)]
                         hover:scale-105 
                         transition-all 
                         duration-300 
                         px-3 py-2 
                         rounded-lg 
                         hover:bg-green-800/30"
          >
            Cart
          </Link>
          <Link
            to={`/about`}
            className="text-white text-lg font-medium 
                         hover:text-[rgba(248,197,25,255)]
                         hover:scale-105 
                         transition-all 
                         duration-300 
                         px-3 py-2 
                         rounded-lg 
                         hover:bg-green-800/30"
          >
            About
          </Link>
          <Link
            to={`/contact`}
            className="text-white text-lg font-medium 
                         hover:text-[rgba(248,197,25,255)]
                         hover:scale-105 
                         transition-all 
                         duration-300 
                         px-3 py-2 
                         rounded-lg 
                         hover:bg-green-800/30"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button  */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none 
                       hover:bg-green-800/30 
                       p-2 rounded-md 
                       transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with enhanced design */}
      {/* {["Home", "Products", "About", "Contact"] */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-[#408000] text-white py-4 px-4 space-y-2 shadow-lg`}
      >
        <Link
          to={`/`}
          className="block text-lg 
                       hover:text-[rgba(248,197,25,255)]
                       hover:bg-green-800/30 
                       transition-all 
                       duration-300 
                       px-4 py-2 
                       rounded-lg"
        >
          Home
        </Link>
        <Link
          to={`/products`}
          className="block text-lg 
                       hover:text-[rgba(248,197,25,255)]
                       hover:bg-green-800/30 
                       transition-all 
                       duration-300 
                       px-4 py-2 
                       rounded-lg"
        >
          Products
        </Link>
        <Link
          to={`/about`}
          className="block text-lg 
                       hover:text-[rgba(248,197,25,255)]
                       hover:bg-green-800/30 
                       transition-all 
                       duration-300 
                       px-4 py-2 
                       rounded-lg"
        >
          About
        </Link>
        <Link
          to={`/contact`}
          className="block text-lg 
                       hover:text-[rgba(248,197,25,255)]
                       hover:bg-green-800/30 
                       transition-all 
                       duration-300 
                       px-4 py-2 
                       rounded-lg"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
