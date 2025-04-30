import typescriptEslint from "@typescript-eslint/eslint-plugin"
import stylistic from "@stylistic/eslint-plugin"
import stylisticMigrate from "@stylistic/eslint-plugin-migrate"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "@stylistic": stylistic,
      "@stylistic/migrate": stylisticMigrate,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@stylistic/migrate/migrate-ts": "error",
      "@stylistic/semi": ["error", "never"],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/indent": ["error", 2],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/space-before-function-paren": ["error", "always"],
      "@stylistic/space-before-blocks": "error",

      "@stylistic/padding-line-between-statements": ["error", {
        blankLine: "always",
        prev: "*",
        next: "interface",
      }, {
        blankLine: "always",
        prev: "*",
        next: "type",
      }, {
        blankLine: "always",
        prev: "*",
        next: "function",
      }, {
        blankLine: "always",
        prev: "*",
        next: "export",
      }, {
        blankLine: "always",
        prev: "var",
        next: "return",
      }],

      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": "error",
      "@stylistic/lines-between-class-members": ["error", "always"],

      "@stylistic/no-multiple-empty-lines": ["error", {
        max: 1,
        maxEOF: 0,
      }],
    },
  },
]