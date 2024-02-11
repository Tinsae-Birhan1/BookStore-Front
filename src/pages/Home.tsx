import StoreItem from "../components/ItemCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/Functions/actions/products';

export default function Store() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.products);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    const initialLength = products.length;
    setLoading(true);
    dispatch(fetchProducts() as any)
      .then(() => {
        setLoading(false);
        const finalLength = products.length;
        console.log("Items fetched:", finalLength - initialLength);
      })
      .catch(() => setLoading(false));
  };

  const handleScroll = () => {
    console.log("Scrolling...");
    console.log("Inner height:", window.innerHeight);
    console.log("Scroll Y:", window.scrollY);
    console.log("Document height:", document.documentElement.offsetHeight);
    if (
      window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 200 &&
      !loading
    ) {
      console.log("Fetching data...");
      fetchData();
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="container mx-auto mt-8" style={{ minHeight: '100vh' }}>
      <h1 className="text-4xl m-8 text-center">Book Store</h1>

      <div className="flex flex-wrap justify-center px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products && products.map((item: any) => (
          <div key={item.id} className="m-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
            <StoreItem {...item} />
          </div>
        ))}
      </div>
      {loading && <div className="text-center">Loading...</div>}
    </div>
  );
}
