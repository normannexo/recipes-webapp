import { getRecipes } from '$lib/recipes.js';

export async function load() {
	const recipes = await getRecipes();
	return {
		recipes
	};
}