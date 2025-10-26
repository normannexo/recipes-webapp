<script>
	import { base } from '$app/paths';
	export let data;
</script>

<svelte:head>
	<title>Meine Rezepte</title>
</svelte:head>

<main>
	<header>
		<h1>🍳 Meine Rezepte</h1>
		<p>Alle meine gesammelten Rezepte an einem Ort</p>
	</header>

	<div class="recipes-grid">
		{#each data.recipes as recipe}
			<article class="recipe-card">
				<h2>
					<a href="{base}/recipe/{recipe.slug}">{recipe.title}</a>
				</h2>
				{#if recipe.description}
					<p class="description">{recipe.description}</p>
				{/if}
			</article>
		{/each}
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	header {
		text-align: center;
		margin-bottom: 3rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		color: #2c3e50;
	}

	header p {
		font-size: 1.1rem;
		color: #7f8c8d;
	}

	.recipes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.recipe-card {
		background: white;
		border: 1px solid #e1e8ed;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.recipe-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0,0,0,0.15);
	}

	.recipe-card h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.3rem;
	}

	.recipe-card a {
		text-decoration: none;
		color: #2c3e50;
	}

	.recipe-card a:hover {
		color: #3498db;
	}

	.description {
		margin: 0;
		color: #7f8c8d;
		font-style: italic;
		line-height: 1.4;
	}
</style>