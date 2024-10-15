// @ts-nocheck

import React, { useEffect, useState } from "react";
import menu from "@/config/menu.json";
import Logo from "@/components/Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { getLangFromUrl, useTranslations } from "@/i18n/utils";

const menuData = menu;

const Navbar = () => {
  const lang = "en";
  const t = useTranslations(lang);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = window.location.pathname;

  const menuItemClassName = (menuPath: any) => `
    block max-lg:mt-4 lg:mt-0 lg:mr-4 lg:inline-block text-base text-gray-800 
    ${
      currentPath === menuPath
        ? "text-primary-color dark:text-primary-color"
        : "dark:text-white hover:text-primary-color"
    }
  `;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleMenuToggle = (event: any) => {
      if (event.target.closest("#humburgerMenu")) {
        toggleMenu();
      }
    };

    document.addEventListener("click", handleMenuToggle);
    return () => {
      document.removeEventListener("click", handleMenuToggle);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap p-main">
      <div className="flex ">
        <Logo />
      </div>

      <div className="block lg:hidden" id="humburgerMenu">
        <button className="flex items-center px-3 py-2 border rounded text-gray-800 dark:text-white border-gray-800 dark:border-white hover:text-primary-color hover:border-primary-color">
          <svg
            id="menuIcon"
            className={`fill-current h-5 w-5 ${isMenuOpen ? "hidden" : ""}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
          <svg
            id="closeIcon"
            className={`fill-current h-5 w-5 ${isMenuOpen ? "" : "hidden"}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Close</title>
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={`w-full block lg:flex lg:w-auto justify-end 
          ${isMenuOpen ? "" : "hidden"} 
          lg:visible`}
        id="menuItems"
      >
        <ul className="text-sm lg:flex-grow flex flex-col lg:flex-row items-center">
          {Object.entries(menuData)
            .filter(([key, { visible }]) => !!visible)
            .map(([key, { url, hidden, translationKey }]) => (
              <li key={key}>
                <a className={menuItemClassName(url)} href={url}>
                  {t(translationKey)}
                </a>
              </li>
            ))}
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
