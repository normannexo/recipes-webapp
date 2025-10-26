import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function getRecipes() {
	const recipesDir = path.join(process.cwd(), '..', 'recipes');
	
	try {
		const files = fs.readdirSync(recipesDir);
		const recipes = [];
		
		for (const file of files) {
			if (file.endsWith('.md')) {
				const slug = file.replace('.md', '');
				const filePath = path.join(recipesDir, file);
				const content = fs.readFileSync(filePath, 'utf-8');
				
				// Extract title from first h1
				const titleMatch = content.match(/^#\s*\*?\*?([^*\n]+)\*?\*?/m);
				const title = titleMatch ? titleMatch[1].trim() : slug;
				
				// Extract description from italics after title
				const descMatch = content.match(/\*([^*]+)\*/);
				const description = descMatch ? descMatch[1] : '';
				
				recipes.push({
					slug,
					title,
					description,
					filename: file
				});
			}
		}
		
		return recipes.sort((a, b) => a.title.localeCompare(b.title));
	} catch (error) {
		console.error('Error reading recipes:', error);
		return [];
	}
}

export async function getRecipe(slug) {
	const recipesDir = path.join(process.cwd(), '..', 'recipes');
	const filePath = path.join(recipesDir, `${slug}.md`);
	
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		return { content, slug };
	} catch (error) {
		console.error('Error reading recipe:', error);
		return null;
	}
}