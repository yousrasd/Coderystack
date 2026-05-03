import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";
import expressiveCode from "astro-expressive-code";
import partytown from '@astrojs/partytown';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false
      }
    }),
    react(),
    icon(),
    // partytown({
    //   config: {
    //     forward: ['dataLayer.push'],
    //   },
    // }),
    expressiveCode({
      frames: {
        showCopyToClipboardButton: true,
      },
    }),
    mdx()
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  output: "server",
  adapter: vercel(),
  redirects: {
    "/posts/post.1.-kotlin-series-a-beginner-guide-intro": "/posts/post1-kotlin-series-a-beginner-guide-intro",
    "/posts/post.2-kotlin-series-a-beginner-guide-kotlin-basics": "/posts/post2-kotlin-series-a-beginner-guide-kotlin-basics",
    "/posts/post.3.-redis-caching": "/posts/post3-redis-caching",
    "/posts/post.6-forced-to-code-without-ai-for-2-hours-what-i-learnt": "/posts/post6-forced-to-code-without-ai-for-2-hours-what-i-learnt",
  },
});