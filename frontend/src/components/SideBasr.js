import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiTable,
  HiHome,
  HiShoppingCart,
  HiBookmark,
} from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import "../css/sidebar.css";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function Sidebars() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(cookie.get("USER-TOKEN"));
  }, cookie.get("USER-TOKEN"));

  const handleLogout = () => {
    cookie.remove("USER-TOKEN", { path: "/" });
    setToken(null);
  };

  useEffect(() => {
    if (localStorage.getItem("toggleSidebar") === "false") {
      let side = document.querySelector(".sidebar");
      side.classList.add("hidden");
    }
  }, [localStorage.getItem("toggleSidebar")]);

  return (
    <Sidebar className="sidebar md" aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-7">
          <Sidebar.Item href="#" icon={HiHome}>
            <Link to="/">Home</Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingCart} label="3">
            Carts
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiBookmark}>
            Favorites
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BsShop}>
            <Link to="/products">Products</Link>
          </Sidebar.Item>
          {token ? (
            <Sidebar.Item icon={IoLogOut}>
              <button onClick={handleLogout}>Log out</button>
            </Sidebar.Item>
          ) : (
            <>
              <Sidebar.Item icon={HiArrowSmRight}>
                <Link to="/signin">Sign In</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiTable}>
                <Link to="/signup">Sign Up</Link>
              </Sidebar.Item>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
