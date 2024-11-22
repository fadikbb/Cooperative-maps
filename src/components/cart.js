import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import Navbar from "./navBar";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto">
      <div className="min-h-[64px]">
        <Navbar />
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-[#4d9900]">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border-b border-[#4d9900]/20"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#4d9900]">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="px-4 py-2 bg-[#4d9900] hover:bg-[#4d9900]/90 text-white rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-[#4d9900]">
                Total: ${totalPrice.toFixed(2)}
              </h2>
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-4 px-6 py-2 bg-[#f8c519] hover:bg-[#f8c519]/90 text-gray-800 font-semibold rounded transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
