import { useShoppingCart } from "../Setting/PaymentControl";
import CartItem from "./CartProduct";
import StoreItem from "./ItemCard";
// import storeItems from "../data/items.json";
import formatCurrency from "../utilities/Currency";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { products, loading, error } = useSelector((state: any) => state.products);
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <div
      className={`fixed top-0 max-w-md h-full right-0 z-50 bg-slate-50 shadow-xl ease-in-out duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
        } p-4`}
    >
      {isOpen && (
        <button
          className="text-4xl text-black items-center cursor-pointer fixed right-10 top-3 z-50 m-0"
          onClick={closeCart}
        >
          x
        </button>
      )}
      <div>
        <h2 className="text-4xl mb-6">Cart</h2>
        <div className="flex gap-4 flex-col mb-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className=" font-extrabold text-2xl text-right">
          {`Total: ` +
            formatCurrency(
              cartItems.reduce((total, CartItem) => {
                const item = products.find((i: any) => i.id === CartItem.id);
                return total + (item?.price || 0) * CartItem.quantity;
              }, 0)
            )}
        </div>
        <Link to="/checkout">
          <button className="px-4 py-4 bg-green-600 text-white w-full mt-3 rounded shadow font-bold hover:bg-green-700">
            Checkout
          </button>
        </Link>

      </div>
    </div>
  );
}
