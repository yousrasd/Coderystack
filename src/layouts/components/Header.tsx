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
    block rounded-full px-3 py-2 text-sm font-semibold transition-colors max-lg:mt-2 lg:inline-block
    ${
      currentPath === menuPath
        ? "bg-primary-color-light text-primary-color dark:text-text-heading-dark"
        : "text-text-body dark:text-text-body-dark hover:bg-surface-muted hover:text-text-heading dark:hover:bg-surface-muted-dark dark:hover:text-text-heading-dark"
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
    <nav className="sticky top-0 z-20 border-b border-border-color/80 bg-bg-primary/90 backdrop-blur dark:border-border-color-dark/80 dark:bg-bg-primary-dark/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-5 py-4 md:px-12">
        <div className="flex items-center gap-3">
          <Logo />
        </div>

        <div className="block lg:hidden" id="humburgerMenu">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-color text-text-heading transition-colors hover:border-primary-color hover:text-primary-color dark:border-border-color-dark dark:text-text-heading-dark"
            aria-label="Toggle navigation"
          >
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
          className={`w-full lg:flex lg:w-auto lg:justify-end
            ${isMenuOpen ? "" : "hidden"}
            lg:visible`}
          id="menuItems"
        >
          <ul className="mt-4 flex flex-col items-center gap-1 rounded-lg border border-border-color bg-surface p-3 text-sm shadow-soft-line dark:border-border-color-dark dark:bg-surface-dark lg:mt-0 lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
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
      </div>
    </nav>
  );
};

export default Navbar;
