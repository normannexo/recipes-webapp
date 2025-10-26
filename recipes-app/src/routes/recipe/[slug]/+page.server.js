import { getRecipe } from '$lib/recipes.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const recipe = await getRecipe(params.slug);
	
	if (!recipe) {
		throw error(404, 'Rezept nicht gefunden');
	}
	
	return {
		recipe
	};
}