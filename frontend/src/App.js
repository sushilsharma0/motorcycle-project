import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import Sidebars from "./components/SideBasr";
import AllProducts from "./pages/products/AllProducts";
import { useState } from "react";
import Cookies from "universal-cookie";
const cookie = new Cookies();
function App() {
  return (
    <>
      <Navbar
      />
      <span
        className="grid"
        style={{
          gridTemplateColumns: "16% 84%",
        }}
      >
        <span>
          <Sidebars
          />
        </span>
        <span>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/products" element={<AllProducts />} />
          </Routes>
        </span>
      </span>
    </>
  );
}

export default App;
