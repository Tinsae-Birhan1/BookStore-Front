import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";
import AddCart from "./AddCart";
type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;

};

export default function StoreItem({ id, title, price, image }: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <div className="h-98 w-64 border border-grey bg-white overflow-hidden">
      <div className="flex justify-center items-center  w-full pt-6">
        <img src={image} alt={title} className="flex justify-center h-52 object-cover w-1/2" />
      </div>

      <div className="flex flex-col p-6">
        <div className="flex flex-col  items-center justify-between mb-4">
          <h2 className="text-md">{title.length > 20 ? title.substring(0, 20) + "..." : title}</h2>
          <p className="text-xl text-gray-400">{formatCurrency(price)}</p>
        </div>
        <div>
          {quantity === 0 ? (
            <button
              className="w-full bg-green-600 p-2 rounded-md text-white"
              onClick={() => increaseCartQuantity(id)}
            >
              + Add to cart
            </button>
          ) : (
            <AddCart quantity={quantity} id={id} />
          )}
        </div>
      </div>
    </div>
  );
}
