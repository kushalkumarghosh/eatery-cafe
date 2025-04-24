import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import About from "./components/Home/About.jsx";
import Menu from "./components/Home/Menu.jsx";
import Reservation from "./components/Home/Reservation.jsx";
import Contact from "./components/Home/Contact.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Admin from "./components/Admin/Dashboard.jsx";
import Success from "./components/Payment/Success.jsx";
import Cancel from "./components/Payment/Cancel.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="payment/success" element={<Success />} />
        <Route path="payment/cancel" element={<Cancel />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="admin-dashboard" element={<Admin />} />
    </Routes>
  );
};

export default App;
