"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Mobile menu icon

const Header = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex justify-between items-center p-4 px-8 md:px-16 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl">
      {/* Logo / Title */}
      <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">
        Confidence Assessment Tool
      </h1>

      {/* Desktop Navigation */}
      <nav>
        <ul className="hidden md:flex gap-10 text-white font-medium list-none">
          <li
            className={`hover:text-yellow-300 transition duration-300 cursor-pointer font-semibold text-lg ${
              path === "/dashboard" && "text-yellow-300 text-xl font-semibold"
            }`}
          >
            Dashboard
          </li>
          <li
            className={`hover:text-yellow-300 transition duration-300 cursor-pointer font-semibold text-lg ${
              path === "/questions" && "text-yellow-300 text-xl font-semibold"
            }`}
          >
            Questions
          </li>
          <li
            className={`hover:text-yellow-300 transition duration-300 cursor-pointer font-semibold text-lg ${
              path === "/upgrade" && "text-yellow-300 text-xl font-semibold"
            }`}
          >
            Upgrade
          </li>
          <li
            className={`hover:text-yellow-300 transition duration-300 cursor-pointer font-semibold text-lg ${
              path === "/how-it-works" &&
              "text-yellow-300 text-xl font-semibold"
            }`}
          >
            How it Works?
          </li>
          {/* User Button (Always Visible) */}
          <UserButton />
        </ul>
      </nav>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-white text-2xl cursor-pointer flex items-center gap-4">
        {/* User Button (Visible in Mobile) */}
        <UserButton />
        {/* Menu Toggle */}
        <FiMenu onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white bg-opacity-90 rounded-lg shadow-md p-4 flex flex-col gap-4 text-black font-medium z-10">
          <ul className="list-none">
            <li
              className={`hover:text-blue-500 transition duration-300 cursor-pointer font-semibold text-lg ${
                path === "/dashboard" && "text-blue-500 font-semibold"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </li>
            <li
              className={`hover:text-blue-500 transition duration-300 cursor-pointer font-semibold text-lg ${
                path === "/questions" && "text-blue-500 font-semibold"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Questions
            </li>
            <li
              className={`hover:text-blue-500 transition duration-300 cursor-pointer font-semibold text-lg ${
                path === "/upgrade" && "text-blue-500 font-semibold"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Upgrade
            </li>
            <li
              className={`hover:text-blue-500 transition duration-300 cursor-pointer font-semibold text-lg ${
                path === "/how-it-works" && "text-blue-500 font-semibold"
              }`}
              onClick={() => setIsOpen(false)}
            >
              How it Works?
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
