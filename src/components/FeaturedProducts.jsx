import React from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductCard = ({ id, name, price, category, imageUrl }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent event bubbling if clicked within Link
    const product = {
      id,
      name,
      price,
      category,
      image: imageUrl,
      quantity: 1,
    };
    dispatch(addToCart(product));
    alert(`${name} has been added to your cart.`);
  };
  return (
    <div className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button className="bg-white p-2 rounded-full hover:bg-[#4d9900] hover:text-white transition-colors duration-300">
            <Heart className="h-5 w-5" />
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-white p-2 rounded-full hover:bg-[#4d9900] hover:text-white transition-colors duration-300"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-sm text-[#4d9900] font-medium">{category}</span>

        {/* Name */}
        <h3 className="mt-1 text-lg font-semibold text-gray-800 line-clamp-1">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-[#4d9900]">${price}</span>
          <div
            className="h-8 w-8 rounded-full bg-[rgba(248,197,25,255)] flex items-center justify-center cursor-pointer hover:bg-[#4d9900] transition-colors duration-300 group"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/products/${id}`}
          className="mt-4 w-full py-2 px-4 bg-[#4d9900] hover:bg-[rgba(248,197,25,255)] text-white hover:text-[#4d9900] rounded-md transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <Eye className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-medium">View Details</span>
        </Link>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-[rgba(248,197,25,255)] group-hover:w-full transition-all duration-500" />
    </div>
  );
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/products.json");
        setProducts(response.data); // Set the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50">
      {/* Section Header */}
      <div className="container mx-auto mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4" style={{ color: "#4d9900" }}>
          Featured Products
        </h2>
        <p className="text-gray-600 mb-6">
          Discover our handpicked selection of premium products
        </p>
        <div
          className="w-24 h-1 mx-auto rounded-full"
          style={{ backgroundColor: "rgba(248,197,25,255)" }}
        />
      </div>

      {/* Products Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            products
              .slice(0, 4)
              .map((product, index) => <ProductCard key={index} {...product} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
