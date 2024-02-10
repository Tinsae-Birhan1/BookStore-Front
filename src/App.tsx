import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
function App() {
  return (
    <ShoppingCartProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Store />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </ShoppingCartProvider>
  );
}

export default App;
