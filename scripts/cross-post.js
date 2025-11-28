#!/usr/bin/env node

/**
 * Cross-post articles to Dev.to
 * Usage: node cross-post-simple.js <article-path>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const DEV_TO_API_KEY = process.env.DEV_TO_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const WEBSITE_URL = 'https://www.coderystack.com';

function generateCanonicalUrl(filePath) {
  const fileName = path.basename(filePath, '.mdx');
  const slug = fileName.replace(/\./g, '');
  return `${WEBSITE_URL}/posts/${slug}`;
}

async function generateHashtags(title, content, categories) {
  if (!OPENAI_API_KEY) {
    console.log('⚠️  No OpenAI API key. Using categories as tags.');
    return categories || ['android', 'mobile', 'development'];
  }

  console.log('   Calling OpenAI API...');
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: `Generate 4 relevant hashtags for this Dev.to article. Use popular Dev.to tags.

Guidelines:
- Use established Dev.to tags (e.g., "android", "kotlin", "javascript", "webdev")
- Avoid generic tags like "programming"
- Maximum 4 tags
- Return only tags as comma-separated list, no hashtag symbols

Title: ${title}
Categories: ${categories?.join(', ')}
Content preview: ${content.substring(0, 500)}...

Examples: android, kotlin, mobile, java, react, nodejs, python, typescript`
        }],
        temperature: 0.5,
        max_tokens: 30
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('   OpenAI API error:', error);
      throw new Error(`OpenAI API failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('   ✅ OpenAI API call successful');
    console.log('   Usage:', data.usage);
    
    const tags = data.choices[0].message.content
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
    
    return tags;
  } catch (error) {
    console.error('   ❌ Error generating hashtags:', error.message);
    console.log('   Falling back to categories');
    return categories || ['android', 'mobile', 'development'];
  }
}

function convertImagesToAbsoluteUrls(content) {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  
  return content.replace(imageRegex, (match, altText, imagePath) => {
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return match;
    }
    
    const absoluteUrl = imagePath.startsWith('/') 
      ? `${WEBSITE_URL}${imagePath}` 
      : `${WEBSITE_URL}/${imagePath}`;
    
    console.log(`   📷 ${path.basename(imagePath)} → ${absoluteUrl}`);
    return `![${altText}](${absoluteUrl})`;
  });
}

function addFooter(content, canonicalUrl) {
  return content + `\n\n---\n\n*Originally published at [${canonicalUrl}](${canonicalUrl})*\n`;
}

async function postToDevTo(article, canonicalUrl, tags) {
  if (!DEV_TO_API_KEY) {
    console.log('⚠️  No Dev.to API key found.');
    console.log('📝 Set DEV_TO_API_KEY in .env file');
    return;
  }

  const contentWithImages = convertImagesToAbsoluteUrls(article.content);
  const contentWithFooter = addFooter(contentWithImages, canonicalUrl);

  let coverImageUrl = null;
  if (article.coverImage && article.coverImage.startsWith('/')) {
    coverImageUrl = `${WEBSITE_URL}${article.coverImage}`;
  }

  const articleData = {
    title: article.title,
    body_markdown: contentWithFooter,
    published: false,
    tags: tags.slice(0, 4),
    canonical_url: canonicalUrl,
    description: article.description
  };

  if (coverImageUrl) {
    articleData.main_image = coverImageUrl;
  }

  try {
    const response = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': DEV_TO_API_KEY
      },
      body: JSON.stringify({ article: articleData })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const data = await response.json();
    console.log('✅ Posted to Dev.to (draft):', data.url);
    console.log('   Tags:', tags.slice(0, 4).join(', '));
    return data;
  } catch (error) {
    console.error('❌ Error posting to Dev.to:', error.message);
    return null;
  }
}

async function main() {
  const articlePath = process.argv[2];
  
  if (!articlePath) {
    console.error('Usage: node cross-post-simple.js <article-path>');
    process.exit(1);
  }

  const canonicalUrl = generateCanonicalUrl(articlePath);

  if (!fs.existsSync(articlePath)) {
    console.error(`❌ Article not found: ${articlePath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(articlePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  console.log('📄 Article:', frontmatter.title);
  console.log('🔗 Canonical URL:', canonicalUrl);
  console.log('');

  console.log('🤖 Generating hashtags...');
  const tags = await generateHashtags(frontmatter.title, content, frontmatter.categories);
  console.log('🏷️  Tags:', tags.join(', '));
  console.log('');

  console.log('📤 Posting to Dev.to...');
  console.log('');

  await postToDevTo({
    title: frontmatter.title,
    content: content,
    description: frontmatter.description,
    coverImage: frontmatter.image
  }, canonicalUrl, tags);

  console.log('');
  console.log('✨ Done!');
  console.log('💡 Post created as draft. Review and publish on Dev.to');
  console.log('');
  console.log('📝 For Medium: Import story → Paste:', canonicalUrl);
}

main().catch(console.error);
