# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog being built with Eleventy (11ty) v3, migrating from a previous Gatsby-based blog. The site generates static HTML from Markdown blog posts and Nunjucks templates.

The previous blog's readme is with the rest of the old blog in the old_blog directory. The current readme at the root of the repo has a TODO list of remaining features to implement in the new site.

## Development Commands

- `yarn start` - Start the development server with live reload
- `yarn build` - Build the site for production (outputs to `_site/`)
- `yarn format` - Format code with Prettier
- `yarn prepare` - Install Husky pre-commit hooks

## Architecture

### Core Structure

- `src/` - Source files for the site
  - `blog/` - Individual blog posts organized by date folders (e.g., `2021-08-22-post-title/`)
  - `_includes/layouts/` - Nunjucks layout templates (`base.njk`, `page.njk`, `post.njk`)
  - `_config/` - Eleventy configuration modules (filters, shortcodes)
  - `_data/` - Global data files (metadata.js)
  - `assets/` - Static assets (images, fonts, etc.)
- `eleventy.config.js` - Main Eleventy configuration
- `_site/` - Generated output directory (not committed)
- `old_blog` - Previous blog (we are moving content from it as we port it over)

### Key Features

- **Image Optimization**: Uses @11ty/eleventy-img for automatic image processing with lazy loading
- **Custom Filters**: Date formatting, JSON parsing, array manipulation, tag filtering
- **Custom Shortcodes**:
  - `groupedPosts` - Groups blog posts by year and month for archive page
  - `bannerImage` - Processes banner images from blog post folders
- **Blog Post Structure**: Each post in its own folder with index.md and associated images

### Template System

- **Base Layout** (`base.njk`): Core HTML structure with head, navigation, footer
- **Page Layout** (`page.njk`): For static pages, extends base
- **Post Layout** (`post.njk`): For blog posts, extends base, includes banner image processing

### Content Organization

- Blog posts use frontmatter with title, date, banner (optional)
- Posts are automatically collected into the `posts` collection
- Archive page groups posts by month/year using the `groupedPosts` shortcode

### Code Quality

- Prettier formatting enforced via pre-commit hooks
- Husky manages Git hooks with lint-staged
- ESLint configuration present (legacy from Gatsby migration)

## Important Notes

- The site is in migration from Gatsby to Eleventy - some legacy files may remain in `old_blog/`
- Banner images for posts are processed automatically and should be placed in the same directory as the blog post
- The site uses modern JavaScript (ES modules) throughout the configuration
- Image processing handles multiple formats (webp, png, jpeg) automatically
