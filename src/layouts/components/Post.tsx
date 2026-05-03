// @ts-nocheck

import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
  solarizedlight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useStore } from "@nanostores/react";
import rehypeRaw from "rehype-raw";

import config from "@/config/config.json";
import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import { translations } from "@/i18n/translations";
import { globalTheme as globalThemeConfig } from "@/store/themeStore";
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

export interface PostProps {
  post: {
    body: string;
    id?: string;
    slug?: string;
    title: string;
    meta_title?: string;
    description?: string;
    date?: Date;
    image?: string;
    authors: Array<string>;
    categories: Array<string>;
    tags: Array<string>;
    draft?: Boolean;
    showInDevMode?: Boolean;
    showFullPost: Boolean;
    embededCodeLanguage?: string;
  };
  featured?: boolean;
}

const readingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text?.split(/\s+/).length || 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Post: React.FC<PostProps> = ({ post, featured = false }) => {
  const [lang, setLang] = useState<keyof typeof translations>("en");
  const t = useTranslations(lang);
  const [theme, setTheme] = useState<string | null>("dark");
  const globalTheme = useStore(globalThemeConfig || "light");
  const [postUrl, setPostUrl] = useState("");
  const minutes = readingTime(post.body);

  useEffect(() => {
    const lang = getLangFromUrl(new URL(window.location.href));
    setLang(lang);
    setPostUrl(window.location.href);
  }, []);

  useEffect(() => {
    setTheme(globalTheme);
  }, [globalTheme]);

  useEffect(() => {
    if (
      post.showFullPost &&
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "page_view", {
        page_title: post.title,
        page_path: window.location.pathname,
      });
    }
  }, []);

  if (!post.showFullPost) {
    if (featured) {
      return (
        <a
          href={`/posts/${post.slug}`}
          className="block group py-12 border-b border-border-color dark:border-border-color-dark"
        >
          <span className="text-primary-color text-sm font-medium tracking-widest uppercase mb-4 block">
            Featured
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-heading dark:text-text-heading-dark mb-6 leading-tight group-hover:text-primary-color transition-colors">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-lg text-text-body dark:text-text-body-dark leading-relaxed mb-6 max-w-3xl">
              {post.description}
            </p>
          )}
          <div className="flex items-center text-sm text-text-meta dark:text-text-meta-dark font-mono">
            {post.date && <span>{formatDate(post.date)}</span>}
            <span className="mx-2">·</span>
            <span>{minutes} min read</span>
          </div>
        </a>
      );
    }

    return (
      <a
        href={`/posts/${post.slug}`}
        className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-10 border-b border-border-color dark:border-border-color-dark group"
      >
        <div className="md:w-48 shrink-0">
          {post.date && (
            <p className="text-sm text-text-meta dark:text-text-meta-dark font-mono mb-1">
              {formatDate(post.date)}
            </p>
          )}
          <p className="text-sm text-text-meta dark:text-text-meta-dark font-mono mb-2">
            {minutes} min
          </p>
          {post.categories && post.categories.length > 0 && (
            <p className="text-xs text-text-meta dark:text-text-meta-dark tracking-wider uppercase">
              {post.categories.join("  ")}
            </p>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl md:text-2xl font-bold text-text-heading dark:text-text-heading-dark mb-2 group-hover:text-primary-color transition-colors leading-snug">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-text-body dark:text-text-body-dark leading-relaxed line-clamp-2">
              {post.description}
            </p>
          )}
        </div>
      </a>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <article>
        {post.date && (
          <p className="text-sm text-text-meta dark:text-text-meta-dark font-mono mb-4">
            {formatDate(post.date)}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-text-heading dark:text-text-heading-dark mb-6 leading-tight">
          {post.title}
        </h1>
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((c) => (
              <a
                key={c}
                href={`/category/${c}`}
                className="text-xs text-primary-color tracking-wider uppercase hover:underline"
              >
                {c}
              </a>
            ))}
          </div>
        )}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-w-lg mx-auto mb-8 rounded-lg"
          />
        )}
      </article>
      <SocialShare postUrl={postUrl} />
    </div>
  );
};

export default Post;

const SocialShare = ({ postUrl }) =>
  postUrl && (
    <div className="flex flex-row w-full justify-end gap-2 mt-8 pt-6 border-t border-border-color dark:border-border-color-dark">
      <LinkedinShareButton url={postUrl}>
        <LinkedinIcon size={28} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton url={postUrl}>
        <TwitterIcon size={28} round={true} />
      </TwitterShareButton>
      <FacebookShareButton url={postUrl}>
        <FacebookIcon size={28} round={true} />
      </FacebookShareButton>
    </div>
  );
