// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Chocopie',
			cssVariable: '--font-chocopie',
			weights: [100, 300, 400, 700, 900],
			styles: ['normal'],
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [
					{
						weight: 100,
						style: 'normal',
						src: ['./src/assets/fonts/Chocopie Thin.woff2'],
					},
					{
						weight: 300,
						style: 'normal',
						src: ['./src/assets/fonts/Chocopie Light.woff2'],
					},
					{
						weight: 400,
						style: 'normal',
						src: ['./src/assets/fonts/Chocopie Regular.woff2'],
					},
					{
						weight: 700,
						style: 'normal',
						src: ['./src/assets/fonts/Chocopie Bold.woff2'],
					},
					{
						weight: 900,
						style: 'normal',
						src: ['./src/assets/fonts/Chocopie Black.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Geist',
			cssVariable: '--font-geist',
			weights: [400, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Geist Mono',
			cssVariable: '--font-geist-mono',
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['SFMono-Regular', 'Consolas', 'monospace'],
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
