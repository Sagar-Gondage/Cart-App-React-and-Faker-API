import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Home from "./components/Home";
import "./styles.css";
import Cart from "./components/Cart";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        
      </Routes>
    </div>
  );
}
