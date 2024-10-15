import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { globalTheme as globalThemeConfig } from "@/store/themeStore";

const ThemeSwitcher: React.FC = () => {
  // Get initial theme from localStorage or default theme
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

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Menu state
  const [menuVisible, setMenuVisible] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleTheme} className="flex max-lg:mt-4 lg:mt-0">
        {theme === "light" ? (
          <BsFillMoonStarsFill size={25} className="hover:text-primary-color" />
        ) : (
          <BsSunFill
            size={25}
            className="hover:text-primary-color text-amber-500"
          />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
