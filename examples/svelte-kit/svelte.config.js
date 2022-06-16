import adapter from '@sveltejs/adapter-auto';
import resolve from '@rollup/plugin-node-resolve'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
    vite: {
      optimizeDeps: { include: [ 'ethers' ] },
      plugins: [
        resolve({
          browser: true,
          dedupe: ['svelte'],
          preferBuiltins: false
        })
      ]
    }
	},

};

export default config;
