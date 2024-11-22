import { useState } from "react";
import NavBar from "../components/navBar";
import { Link } from "react-router-dom";
import Scanner from "../components/Scanner";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Scanner state

  return (
    <div className="container mx-auto bg-gray-100 min-h-screen">
      <NavBar />
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#4d9900" }}
            >
              Welcome to Our Store
            </h1>
            <p className="text-xl mb-6 text-gray-700">
              Discover amazing products and shop now!
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 text-lg font-semibold 
            text-white rounded-lg transition-all duration-300
            hover:scale-105 shadow-lg"
              style={{
                backgroundColor: "#4d9900",
                borderColor: "rgba(248,197,25,255)",
                borderWidth: "2px",
              }}
            >
              Shop Now
            </Link>
          </div>

          {/* Product Image */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div
              className="w-full max-w-md h-96 bg-cover bg-center rounded-xl shadow-2xl 
            transform hover:scale-105 transition-transform duration-300 relative overflow-hidden"
              style={{
                backgroundImage:
                  'url("https://media.istockphoto.com/id/672450320/photo/shopping-carts-in-the-supermarket.webp?a=1&b=1&s=612x612&w=0&k=20&c=9Io7biYxOrq6oTpARBabHE4r0zwfyVR5ohblhJuxZNs=")',
                backgroundSize: "cover",
                borderColor: "rgba(248,197,25,255)",
                borderWidth: "4px",
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>
      {/* categories section */}
      <Categories />
      {/* Featured Products Section */}
      <FeaturedProducts />
      {/* Fixed button for Scanning  */}
      <button
        onClick={() => setIsScannerOpen(true)}
        className="fixed bottom-6 right-6 bg-[#4d9900] hover:bg-[rgba(248,197,25,255)] text-white hover:text-[#4d9900] p-4 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2 z-40 group"
      >
        <svg
          className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          {/* Top-left */}
          <path
            d="M7 8H4V4H8V7"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          {/* Top-right */}
          <path
            d="M17 8H20V4H16V7"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          {/* Bottom-left */}
          <path
            d="M7 16H4V20H8V17"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          {/* Bottom-right */}
          <path
            d="M17 16H20V20H16V17"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        </svg>
        <span className="font-medium">Scan Product</span>
      </button>
      {/* Scanner Component */}
      <Scanner isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-[#4d9900] to-[#62bf00] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Us Today!</h2>
          <p className="text-lg text-white mb-8">
            Sign up for exclusive offers and updates.
          </p>
          <button className="bg-[#f8c519] hover:bg-[#f8d549] text-gray-800 font-bold py-3 px-8 rounded-lg transform transition hover:scale-105 shadow-lg">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
