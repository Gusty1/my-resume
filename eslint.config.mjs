import mantine from 'eslint-config-mantine';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

// @ts-check
export default defineConfig(
  tseslint.configs.recommended,
  ...mantine,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json'],
      },
    },
  }
);