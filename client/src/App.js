import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Newnav from "./components/newnavbar/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/Footer";
import SignIn from "./components/signup_sign/Sign_in";
import SignUp from "./components/signup_sign/Sign_up";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";

function App() {
  return (
    <>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
