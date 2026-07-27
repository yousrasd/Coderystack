// @ts-nocheck

import config from "@/config/config.json";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "twitter", label: "X (Twitter)", Icon: FaXTwitter },
  { key: "github", label: "GitHub", Icon: FaGithub },
];

const SocialIcons = ({ className = "", linkClassName = "", iconSize = 16 }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {socials.map(({ key, label, Icon }) => (
      <a
        key={key}
        href={config.social[key]}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-border-color text-primary-color transition-colors hover:border-secondary-color hover:text-secondary-color dark:border-border-color-dark ${linkClassName}`}
      >
        <Icon size={iconSize} />
      </a>
    ))}
  </div>
);

export default SocialIcons;
