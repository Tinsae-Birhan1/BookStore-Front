import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "../components/CartItem";
import { fetchProducts } from "../redux/features/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Checkout = () => {
  const { closeCart, cartItems, removeFromCart } = useShoppingCart();
  const navigate = useNavigate();
  const { products } = useSelector((state: any) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  console.log(localStorage.getItem('user'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.email) navigate('/login');

    dispatch(fetchProducts() as any);
  }, [dispatch, navigate, user.email]);

  const handleOrder = async () => {
    setIsLoading(true);

    const HOST: string = import.meta.env.VITE_BACKEND_URL;
    const data = {
      items: cartItems,
      amount: cartItems.reduce((total, CartItem) => {
        const item = products.find((i: any) => i.id === CartItem.id);
        return total + (item?.price || 0) * CartItem.quantity;
      }, 0),
    };



    toast.success("Order Placed Successfully");
    cartItems.forEach((item) => removeFromCart(item.id));
    const updatedUser = { ...user, points: user.points - data.amount };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

  };

  return (
    <>
      <div className="p-4">
        <ToastContainer />
        <div className="min-h-screen ">
          <div className="container mx-auto p-10 max-w-screen-lg">
            <div className="bg-white rounded shadow p-8">
              <div className="w-full bg-orange-200 text-yellow-900 px-4 py-2 flex items-center">
                <img
                  src="https://svgsilh.com/svg/151889.svg"
                  className="w-10 block pr-2"
                  alt="points icon"
                />
                <div className="text-sm">
                  You have <b>{user.points} Points</b> on your account{" "}
                </div>
              </div>

              <div>
                <h3 className="text-xl mt-4 font-bold pb-4">Order Summary</h3>
                <div className="flex gap-4 flex-col mb-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
              <button
                onClick={handleOrder}
                className={`px-4 py-4 bg-green-600 text-white w-full mt-3 rounded shadow font-bold hover:bg-green-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Pay'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
