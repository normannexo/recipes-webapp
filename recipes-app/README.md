# Recipes App

A simple personal web app to view and manage recipes stored in markdown format.

## Features

- 📝 Read recipes from markdown files
- 🔍 Browse all recipes in a clean grid layout
- 📱 Responsive design
- ⚡ Fast static site generation with SvelteKit

## Getting Started

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your recipe markdown files to the `recipes/` folder

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

The static site will be generated in the `build/` folder.

## Recipe Format

Place your `.md` files in the `recipes/` folder. The app will automatically:

- Extract the title from the first `# heading`
- Extract the description from text in *italics* after the title
- Generate a URL slug from the filename
- Render the full markdown content on individual recipe pages

Example recipe structure:
```markdown
# **Recipe Title**

*Short description in italics*

## Ingredients
- ingredient 1
- ingredient 2

## Instructions
1. Step 1
2. Step 2
```

## Project Structure

```
recipes-app/
├── recipes/              # Your markdown recipe files
├── src/
│   ├── routes/
│   │   ├── +page.svelte         # Recipe list page
│   │   └── recipe/[slug]/       # Individual recipe pages
│   └── lib/
│       └── recipes.js           # Recipe utilities
└── package.json
```