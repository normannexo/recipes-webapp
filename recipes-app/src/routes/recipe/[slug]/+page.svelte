<script>
	import { marked } from 'marked';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	
	export let data;
	
	$: htmlContent = marked(data.recipe.content);
	$: title = extractTitle(data.recipe.content);
	
	function extractTitle(content) {
		const match = content.match(/^#\s*\*?\*?([^*\n]+)\*?\*?/m);
		return match ? match[1].trim() : data.recipe.slug;
	}
	
	async function shareRecipe() {
		if (!browser) return;
		
		// Create the proper .html URL for static deployment
		const currentUrl = new URL(window.location.href);
		const htmlUrl = `${currentUrl.origin}${currentUrl.pathname.replace(/\/$/, '')}.html`;
		
		const shareData = {
			title: `${title} - Meine Rezepte`,
			text: `Schau dir dieses Rezept an: ${title}`,
			url: htmlUrl
		};
		
		if (navigator.share && navigator.canShare(shareData)) {
			try {
				await navigator.share(shareData);
			} catch (err) {
				if (err.name !== 'AbortError') {
					fallbackShare();
				}
			}
		} else {
			fallbackShare();
		}
	}
	
	function fallbackShare() {
		const currentUrl = new URL(window.location.href);
		const htmlUrl = `${currentUrl.origin}${currentUrl.pathname.replace(/\/$/, '')}.html`;
		
		if (navigator.clipboard) {
			navigator.clipboard.writeText(htmlUrl);
			alert('Rezept-Link wurde in die Zwischenablage kopiert!');
		} else {
			const textArea = document.createElement('textarea');
			textArea.value = htmlUrl;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			alert('Rezept-Link wurde in die Zwischenablage kopiert!');
		}
	}
</script>

<svelte:head>
	<title>{title} - Meine Rezepte</title>
</svelte:head>

<main>
	<nav>
		<a href="{base}/">&larr; Zurück zu allen Rezepten</a>
		<button class="share-button" on:click={shareRecipe}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor"/>
			</svg>
			Teilen
		</button>
	</nav>
	
	<article class="recipe">
		{@html htmlContent}
	</article>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	nav {
		margin-bottom: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	nav a {
		color: #3498db;
		text-decoration: none;
		font-weight: 500;
	}

	nav a:hover {
		text-decoration: underline;
	}

	.share-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: #3498db;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s ease, transform 0.1s ease;
	}

	.share-button:hover {
		background: #2980b9;
		transform: translateY(-1px);
	}

	.share-button:active {
		transform: translateY(0);
	}

	.share-button svg {
		flex-shrink: 0;
	}

	.recipe {
		background: white;
		border-radius: 8px;
		padding: 2rem;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		line-height: 1.6;
	}

	:global(.recipe h1) {
		color: #2c3e50;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
	}

	:global(.recipe h2) {
		color: #34495e;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.recipe h3) {
		color: #34495e;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.recipe ul) {
		padding-left: 1.5rem;
	}

	:global(.recipe li) {
		margin-bottom: 0.3rem;
	}

	:global(.recipe hr) {
		border: none;
		border-top: 1px solid #ecf0f1;
		margin: 2rem 0;
	}

	:global(.recipe em) {
		color: #7f8c8d;
		font-style: italic;
	}

	:global(.recipe strong) {
		color: #2c3e50;
		font-weight: bold;
	}

	:global(.recipe code) {
		background: #f8f9fa;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'Courier New', monospace;
	}
</style>