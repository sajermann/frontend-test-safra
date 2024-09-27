/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/config/test/setup.ts',		
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov', 'html'],
			exclude:['**/App.tsx', '**/main.tsx', '**/types/**', '**/*.config.*', '**/assets/**', '**/vite-env.d.ts'],
		},
	},
});
