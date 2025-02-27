import globals from "globals";
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescript from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    ignores: ["dist/*", "build/*"],
    files: ["**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      globals: {
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": typescript,
      "import": importPlugin
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "@typescript-eslint/no-explicit-any": "error",
      "import/no-unused-modules": "warn",
      "import/no-anonymous-default-export": "error",
      "import/no-default-export": "error",


      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "linebreak-style": 0,
      
      "prefer-const": ["error", {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
      }],

      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "space-before-blocks": "error",
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "space-infix-ops": "error",
      "comma-spacing": ["error", { "before": false, "after": true }],
      "semi-spacing": ["error", { "before": false, "after": true }],
      "block-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],

      "@typescript-eslint/naming-convention": [
        "error",
        { "selector": "variableLike", "format": ["camelCase", "UPPER_CASE"], "leadingUnderscore": "allow" },
        { "selector": "function", "format": ["camelCase"], "leadingUnderscore": "allow" },
        { "selector": "typeLike", "format": ["PascalCase"] }
      ],

    }
  }
];