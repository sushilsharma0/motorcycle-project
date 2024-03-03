import React, { useEffect } from "react";
import { Menu, Search } from "lucide-react";
import Cookies from "universal-cookie";
import { TextInput } from "flowbite-react";

const cookie = new Cookies();

export default function Navbar() {
  const toggleSidebar = () => {};
  return (
    <div className="relative w-full bg-[#de9a9a]">
      <div className="mx-auto flex max-w-[90rem] h-[80px] items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span></span>
          <span className="font-bold">motorCycle</span>
        </div>
        <span className="flex items-center gap-2">
          <TextInput className="self-center" placeholder="search.." />
          <Search />
        </span>

        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleSidebar} className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
