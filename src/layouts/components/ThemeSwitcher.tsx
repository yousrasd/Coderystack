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
      className="max-lg:mt-4 lg:mt-0 p-2 border border-border-color dark:border-border-color-dark rounded-md hover:border-primary-color transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <BsFillMoonStarsFill size={18} className="text-text-heading" />
      ) : (
        <BsSunFill size={18} className="text-text-heading-dark" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
