// @ts-nocheck

import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { MdLabelOutline } from "react-icons/md";
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
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [lang, setLang] = useState<keyof typeof translations>("en");
  const t = useTranslations(lang);
  const [theme, setTheme] = useState<string | null>("dark");
  const globalTheme = useStore(globalThemeConfig || "light");
  const [postUrl, setPostUrl] = useState("");

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
    return (
      <a
        className="flex rounded-lg border-border text-base mx-auto h-full"
        href={`/posts/${post.slug}`}
      >
        <Header post={post} showFullPost={post.showFullPost} />
      </a>
    );
  }

  return (
    <div className="flex flex-col mb-8 border-border text-base my-10 mx-auto w-full sm:w-4/5 lg:w-2/3 xl:w-4/5 2xl:w-3/5">
      <Header post={post} />
      <SocialShare postUrl={postUrl} />
    </div>
  );
};

export default Post;

const Header = ({ post, showFullPost = true }) => (
  <div
    key={post.id}
    className="flex flex-col h-full w-full justify-center items-center"
  >
    {post && post?.image && !showFullPost && (
      <img
        src={post.image}
        className="pb-4 w-full h-56 object-cover rounded-lg"
      />
    )}
    <h2
      className={`dark:text-white text-center ${
        !post.showFullPost && "hover:text-primary-color px-5"
      } ${showFullPost ? "text-2xl" : "text-xl"} pb-5`}
    >
      {post.title}
    </h2>
    {post && post?.image && showFullPost && (
      <img src={post.image} className="pb-4 max-w-md " />
    )}

    <ul className="flex flex-col items-center align-end pb-5 mt-auto">
      {post.date && (
        <li
          key={post.date.toString()}
          className="dark:text-gray-300 text-zinc-400 mr-5"
        >
          {post.date?.toDateString() || ""}
        </li>
      )}
      <li className="dark:text-gray-300  mr-5 flex items-center ">
        {post &&
          post.categories &&
          post.categories.map((c, i) => (
            <div key={c} className={i > 0 ? "pl-2" : "pl-0"}>
              <span className="text-gray-500">{i > 0 ? "|" : ""}</span>

              {showFullPost ? (
                <a
                  className="pl-2 text-secondary-color"
                  href={`/category/${c}`}
                >
                  {c}
                </a>
              ) : (
                <span className="pl-2 text-secondary-color">{c}</span>
              )}
            </div>
          ))}
      </li>
    </ul>
  </div>
);

const SocialShare = ({ postUrl }) =>
  postUrl && (
    <div className="flex flex-row w-full justify-end">
      <LinkedinShareButton style={{ paddingRight: "5px" }} url={postUrl}>
        <LinkedinIcon size={30} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton style={{ paddingRight: "5px" }} url={postUrl}>
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
      <FacebookShareButton url={postUrl}>
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
    </div>
  );
