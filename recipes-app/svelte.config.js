import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	
	preprocess: [
		mdsvex({
			extensions: ['.md']
		})
	],

	kit: {
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/rezepte' : ''
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: [
				'*',
				'/recipe/dampfnudeln',
				'/recipe/kartoffelsuppe', 
				'/recipe/kuchen-schokostueckchen',
				'/recipe/gebratener-pak-choi-mit-tofu',
				'/recipe/kohlrabi-risotto-mit-pinienkernen',
				'/recipe/pasta_alfredo',
				'/recipe/moehrenkuchen'
			],
			handleHttpError: ({ path, referrer, message }) => {
				if (path === '/favicon.png') {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;