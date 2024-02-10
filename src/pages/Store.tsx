import StoreItem from "../components/StoreItem";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/features/actions/products';

export default function Store() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl m-8 text-center">Book Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products && products.map((item: any) => (
          <div key={item.id} className="m-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <StoreItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
