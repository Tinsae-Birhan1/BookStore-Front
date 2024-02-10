import { useShoppingCart } from "../Setting/PaymentControl";
import { useSelector } from 'react-redux';
import formatCurrency from "../utilities/Currency";
import { useState } from "react";

type CartItemProps = {
  id: number;
  quantity: number;
};




export default function PayItem({ id, quantity }: CartItemProps) {
  const { products } = useSelector((state: any) => state.products);
  const item = products && products.find((i: any) => i.id === id);
  const { removeFromCart } = useShoppingCart();
  const [isHovered, setIsHovered] = useState(false);

  if (item == null) return null;

  return (
    <div
      className={`border rounded-md overflow-hidden p-4 transition duration-300 ease-in-out transform hover:scale-105 ${isHovered ? 'shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={item.image} className="h-20 w-32 object-cover mr-4" alt={item.name} />
          <div>
            <p className="text-lg font-semibold">{item.name}</p>
            <p className="text-gray-600">Price: {formatCurrency(item.price)}</p>
            <p className="text-gray-600">Quantity: {quantity}</p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="ml-4 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-red-600 transition duration-300"
            onClick={() => removeFromCart(item.id)}
          >
            pay
          </button>
          <p className="text-lg font-semibold">{formatCurrency(item.price * quantity)}</p>
          <button
            className="ml-4 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300"
            onClick={() => removeFromCart(item.id)}
          >
            Cancel order
          </button>
        </div>
      </div>
    </div>
  );
}
