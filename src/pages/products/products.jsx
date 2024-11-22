import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import NavBar from "../../components/navBar";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice"; // Adjust path as needed

const ProductCard = ({
  id,
  name,
  price,
  description,
  imageUrl,
  category = "Product",
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    const product = {
      id,
      name,
      price,
      imageUrl,
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

        {/* Description */}
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{description}</p>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-[#4d9900]">${price}</span>
          <div
            onClick={handleAddToCart}
            className="h-8 w-8 rounded-full bg-[rgba(248,197,25,255)] flex items-center justify-center cursor-pointer hover:bg-[#4d9900] transition-colors duration-300 group"
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

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/products.json");
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching products.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4d9900] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-[#4d9900]">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold my-4 text-[#4d9900]">
              Our Products
            </h1>
            <p className="text-gray-600 mb-6">
              Explore our wide range of quality products
            </p>
            <div className="w-24 h-1 mx-auto rounded-full bg-[rgba(248,197,25,255)]" />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <p className="col-span-full text-center text-xl text-gray-500">
                No products available.
              </p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
