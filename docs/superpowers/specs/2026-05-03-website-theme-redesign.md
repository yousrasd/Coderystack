# Website Theme Redesign — Design Spec

## Goal
Revamp the Coderystack blog to a clean, minimal, typography-focused theme (as shown in the reference screenshots), while keeping the existing logo. Apply the new theme to all pages. Dark mode is an inverted version of the light theme.

## Approach
Tailwind-first restyle (Approach A). Update Tailwind config tokens and restyle components. Keep existing Astro + React component structure intact.

## Color Palette

### Light Mode
| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#faf9f6` | Page background |
| `text-heading` | `#111111` | Headings, titles |
| `text-body` | `#6b6b6b` | Descriptions, body copy |
| `text-meta` | `#9ca3af` | Dates, read time, tags |
| `accent` | `#df678c` | Links, active nav, "FEATURED" label |
| `border` | `#e5e5e5` | Dividers, header border |

### Dark Mode
| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#0f0f0f` | Page background |
| `text-heading` | `#f3f6f4` | Headings, titles |
| `text-body` | `#a0a0a0` | Descriptions, body copy |
| `text-meta` | `#6b7280` | Dates, read time, tags |
| `accent` | `#df678c` | Links, active nav, "FEATURED" label |
| `border` | `#262626` | Dividers, header border |

## Typography
- Headings: Lato (keep existing), very bold, large sizes
- Body: Lato, 1.125rem, line-height 1.6
- Meta text (dates, read time, tags): smaller, gray, uppercase for tags

## Component Changes

### Header (`Header.tsx`)
- Simplified layout: logo left, nav links right
- Remove hamburger on desktop
- Subtle bottom border (`border-b`)
- Nav links: gray default, pink on hover, pink when active
- Theme toggle: minimal bordered icon button

### Homepage (`index.astro`)
- Replace 3-column card grid with single vertical list
- Remove card containers, shadows, hover scale effects
- **Featured post** (first item): "FEATURED" label in pink uppercase, very large bold title, description paragraph, date + read time on same line
- **List items** (remaining posts): horizontal layout — left column with date, read time, uppercase tags; right column with title + description
- Items separated by thin horizontal rules (`border-b`)

### Post Component (`Post.tsx`)
- Simplify list view: no card styling, no image thumbnail on list view
- Simplify full post view: clean centered content, no card container

### Post Detail Page (`posts/[single].astro`)
- Clean centered layout with generous whitespace
- No card containers
- Social share buttons kept but restyled minimally

### Pagination (`Pagination.tsx`)
- Simplified styling, minimal page numbers

### Footer (`Footer.astro`)
- Keep minimal centered copyright

### Theme Switcher (`ThemeSwitcher.tsx`)
- Restyle as minimal bordered icon button

## Files to Modify
- `tailwind.config.js` — new color tokens
- `src/layouts/Base.astro` — body background, padding adjustments
- `src/layouts/components/Header.tsx` — simplified nav layout
- `src/layouts/components/ThemeSwitcher.tsx` — minimal button style
- `src/layouts/components/Post.tsx` — list and full view restyle
- `src/pages/index.astro` — list layout instead of card grid
- `src/layouts/components/Pagination.tsx` — simplified styling
- `src/layouts/components/Footer.astro` — minimal styling
- `src/pages/posts/[single].astro` — clean centered layout
- `src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/category/[single].astro` — ensure consistent styling

## Out of Scope
- No changes to content/Markdown rendering
- No changes to i18n system
- No changes to SEO/meta tags
- No changes to Google Analytics or Speed Insights
