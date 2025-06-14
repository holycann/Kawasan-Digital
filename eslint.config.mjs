import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// 👇 Gabungkan semua extends ke dalam satu config agar tidak tertindih
const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/core-web-vitals'], // ✅ Satukan core-web-vitals ke sini
    rules: {
      '@next/next/no-page-custom-font': 'off',
      'react/no-unescaped-entities': 'off', // ✅ Ini akan dihormati
    },
  }),
];

export default eslintConfig;
