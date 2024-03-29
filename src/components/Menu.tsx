import { Link } from "react-router-dom";
import { useShoppingCart } from "../Setting/PaymentControl";
import ShoppingSvg from "./CartIcon";

export default function NavigationBar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="bg-white shadow-sm sticky top-0">
      <div className="flex items-center text-2xl p-4">
        <nav className="mr-auto">
          <Link to={"/"} className="mr-6">
            Home
          </Link>
        </nav>
        <div>
          {user.email ? (
            <Link to={"/"} className="mr-6">
            </Link>
          ) : (
            <Link to={"/login"} className="mr-6">

              <button
                className="text-sm bg-green-600 rounded-md p-2 text-white"
              >
                Login        </button>
            </Link>
          )}
        </div>
        {cartQuantity > 0 && (
          <button
            className="bg-green-600 p-4 rounded-full hover:bg-green-800 relative"
            onClick={openCart}
          >
            {<ShoppingSvg />}
            <div className="absolute bg-red-600 text-white rounded-full p-1 h-6 w-6 text-base flex items-center justify-center right-0 ">
              {cartQuantity}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
