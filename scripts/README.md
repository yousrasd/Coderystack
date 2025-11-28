# Cross-Posting Script

Automatically cross-post your blog articles to Dev.to with AI-generated hashtags.

## Setup

1. Install dependencies:
```bash
cd scripts
npm install
```

2. Get your API keys:
   - **Dev.to**: Go to https://dev.to/settings/extensions → Generate API Key
   - **OpenAI** (optional): Get from https://platform.openai.com/api-keys

3. Set environment variables:
```bash
export DEV_TO_API_KEY="your-dev-to-key"
export OPENAI_API_KEY="your-openai-key"  # Optional, for AI hashtag generation
```

Or create a `.env` file in the scripts folder:
```
DEV_TO_API_KEY=your-dev-to-key
OPENAI_API_KEY=your-openai-key
```

## Usage

```bash
node cross-post.js <article-path>
```

The script automatically generates the canonical URL from your filename:
- `post.4-android-memory-storage-part-1.mdx` → `https://www.coderystack.com/posts/post4-android-memory-storage-part-1`
- `post.3.-redis-caching.mdx` → `https://www.coderystack.com/posts/post3-redis-caching`

### Example:

```bash
node cross-post.js ../src/content/posts/post.4-android-memory-storage-part-1.mdx
```

## What it does:

1. ✅ Reads your article (keeps content unchanged)
2. 🔗 Generates canonical URL from filename
3. 🤖 Generates relevant hashtags using AI (or uses your categories)
4. 🖼️ Includes cover image from your frontmatter
5. 📤 Posts to Dev.to with canonical URL
6. 📝 Creates as DRAFT (you review before publishing)
7. 🔗 Adds footer with link back to your article

## Images:

The script automatically handles both cover images and inline images:

**Cover Image:**
From your article's frontmatter:
```yaml
---
image: "/post/covers/Post4-AndroidStorage.png"
---
```

**Inline Images:**
All relative image paths in your markdown are converted to absolute URLs:
```markdown
# Before (in your article)
![Device Explorer](/post/post4-mem-storage/device-explorer.png)

# After (on Dev.to)
![Device Explorer](https://www.coderystack.com/post/post4-mem-storage/device-explorer.png)
```

**Conversions:**
- `/post/image.png` → `https://www.coderystack.com/post/image.png`
- `image.png` → `https://www.coderystack.com/image.png`
- `https://example.com/image.png` → unchanged (already absolute)

**Important:** Make sure all images are publicly accessible at your website URL.

## Footer Added:
 
Each cross-posted article includes:
```markdown
---

*Originally published at [https://www.coderystack.com/posts/your-article](https://www.coderystack.com/posts/your-article)*
```