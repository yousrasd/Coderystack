import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { globalTheme as globalThemeConfig } from "@/store/themeStore";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || globalThemeConfig.value;
    }
    return globalThemeConfig.value;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    globalThemeConfig.set(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border-color text-text-heading transition-colors hover:border-primary-color hover:text-primary-color dark:border-border-color-dark dark:text-text-heading-dark"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <BsFillMoonStarsFill size={16} />
      ) : (
        <BsSunFill size={16} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
