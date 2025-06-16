import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
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
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
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
  adapter: vercel()
});