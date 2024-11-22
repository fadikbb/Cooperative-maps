import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navBar";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get("/products.json");
        const productData = response.data.find((p) => p.id === parseInt(id));
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      alert(`${product.name} has been added to your cart.`);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[400px]">
        <p className="text-xl font-semibold text-[#4d9900]">
          Loading product details...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col">
      <div className="min-h-[64px]">
        <Navbar />
      </div>
      <div className="w-full bg-white rounded-lg border border-[#4d9900]/20 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden border-2 border-[#4d9900]/10 shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <div className="border-b-2 border-[#4d9900]/10 pb-4">
              <h1 className="text-3xl font-bold text-[#4d9900] mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-[#4d9900]/5 p-4 rounded-lg">
                <p className="text-2xl font-semibold text-[#4d9900]">
                  ${product.price}
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-6 bg-[#f8c519] hover:bg-[#f8c519]/90 
                         text-gray-800 font-bold rounded-lg shadow-md 
                         transform transition duration-300 hover:scale-[1.02]
                         flex items-center justify-center gap-2"
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
