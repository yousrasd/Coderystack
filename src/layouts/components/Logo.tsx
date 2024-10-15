import { useEffect, useState } from "react";
import config from "@/config/config.json";
import { globalTheme as globalThemeConfig } from "@/store/themeStore";
import { useStore } from "@nanostores/react";

const Logo = () => {
  const { logo, logo_dark, logo_width, logo_height, logo_text, title } =
    config.site;
  const globalTheme = useStore(globalThemeConfig || "light");

  const width = logo_width.replace("px", "");
  const height = logo_height.replace("px", "");

  return (
    <a href="/">
      {logo ? (
        <img
          width={width}
          height={height}
          src={globalTheme == "light" ? logo : logo_dark}
          alt={title}
          style={{
            height: logo_height,
            width: logo_width,
          }}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </a>
  );
};

export default Logo;
