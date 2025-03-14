// eslint.config.js
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
	{
		// Specify files to lint
		files: ["**/*.{js,ts}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				// Adjust the path to your tsconfig.json if necessary
				project: "./tsconfig.json",
			},
			// Add any global variables you expect (e.g., Bun globals or Express globals)
			globals: {
				// Example: If you use Bun’s global variables, you can add them here.
				// process: 'readonly',
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			// TypeScript-specific rules
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			// Enable Prettier errors as ESLint errors
			"prettier/prettier": "error",
		},
	},
	// You can also include additional config objects here if needed.
];
