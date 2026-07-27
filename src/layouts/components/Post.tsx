// @ts-nocheck

import React, { useEffect, useState } from "react";
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
import { FiArrowUpRight } from "react-icons/fi";

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
  index?: number;
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

const Post: React.FC<PostProps> = ({ post, featured = false, index = 1 }) => {
  const [postUrl, setPostUrl] = useState("");
  const minutes = readingTime(post.body);

  useEffect(() => {
    setPostUrl(window.location.href);
  }, []);

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
          className="group grid gap-7 border-b border-border-color py-10 transition-colors dark:border-border-color-dark md:grid-cols-[120px_1fr] md:py-14"
        >
          <div className="flex items-start gap-4 md:block">
            <span className="font-mono text-5xl font-semibold leading-none text-primary-color md:text-7xl">
              {String(index).padStart(2, "0")}
            </span>
            <span className="mt-2 block font-mono text-xs font-semibold uppercase tracking-[0.22em] text-secondary-color md:mt-4">
              latest note
            </span>
          </div>

          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              {post.categories?.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-primary-color/20 bg-primary-color-light/40 px-3 py-1 font-mono text-xs text-primary-color dark:border-border-color-dark dark:bg-surface-muted-dark"
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <h2 className="max-w-4xl text-4xl font-black leading-[1.02] text-text-heading transition-colors group-hover:text-primary-color dark:text-text-heading-dark md:text-6xl">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-text-body dark:text-text-body-dark md:text-xl md:leading-9">
                    {post.description}
                  </p>
                )}
              </div>
              <FiArrowUpRight className="hidden text-primary-color transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:block" size={28} />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-secondary-color">
              {post.date && <span>{formatDate(post.date)}</span>}
              <span aria-hidden="true">/</span>
              <span>{minutes} min read</span>
            </div>
          </div>
        </a>
      );
    }

    return (
      <a
        href={`/posts/${post.slug}`}
        className="group grid gap-5 border-b border-border-color py-8 transition-colors hover:border-primary-color/50 dark:border-border-color-dark md:grid-cols-[120px_180px_1fr_auto] md:items-start md:gap-8"
      >
        <span className="font-mono text-4xl font-semibold leading-none text-border-color transition-colors group-hover:text-primary-color dark:text-border-color-dark">
          {String(index).padStart(2, "0")}
        </span>
        <div className="shrink-0">
          {post.date && (
            <p className="mb-1 font-mono text-sm text-secondary-color">
              {formatDate(post.date)}
            </p>
          )}
          <p className="mb-3 font-mono text-sm text-secondary-color">
            {minutes} min
          </p>
          {post.categories && post.categories.length > 0 && (
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-color">
              {post.categories.join(" / ")}
            </p>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="mb-3 text-2xl font-black leading-snug text-text-heading transition-colors group-hover:text-primary-color dark:text-text-heading-dark md:text-3xl">
            {post.title}
          </h2>
          {post.description && (
            <p className="max-w-2xl text-base leading-7 text-text-body line-clamp-2 dark:text-text-body-dark">
              {post.description}
            </p>
          )}
        </div>
        <FiArrowUpRight className="hidden text-text-meta transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-color dark:text-text-meta-dark md:block" size={22} />
      </a>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-8 md:py-12">
      <article>
        {post.date && (
          <p className="mb-5 font-mono text-sm text-secondary-color">
            {formatDate(post.date)}
          </p>
        )}
        <h1 className="mb-7 text-4xl font-black leading-[1.05] text-text-heading dark:text-text-heading-dark md:text-6xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mb-7 text-xl leading-9 text-text-body dark:text-text-body-dark">
            {post.description}
          </p>
        )}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <a
                key={c}
                href={`/category/${c}`}
                className="rounded-full border border-primary-color/20 bg-primary-color-light/40 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-primary-color transition-colors hover:border-primary-color dark:border-border-color-dark dark:bg-surface-muted-dark"
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
            className="mx-auto mb-8 w-full max-w-lg rounded-lg border border-border-color shadow-soft-line dark:border-border-color-dark"
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
    <div className="mt-8 flex w-full flex-row justify-end gap-2 border-t border-border-color pt-6 dark:border-border-color-dark">
      <LinkedinShareButton url={postUrl}>
        <LinkedinIcon size={28} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton url={postUrl}>
        <TwitterIcon size={28} round={true} />
      </TwitterShareButton>
      <FacebookShareButton url={postUrl}>
        <FacebookIcon size={28} round={true} />
      </FacebookShareButton>
      <EmailShareButton url={postUrl}>
        <EmailIcon size={28} round={true} />
      </EmailShareButton>
    </div>
  );
