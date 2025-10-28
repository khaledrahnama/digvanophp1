module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", ".eslintrc.js", "vite.config.js"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^[A-Z_]", // Allow unused variables that start with uppercase or underscore
      },
    ],
    "no-console": "warn",
    "react-refresh/only-export-components": "off", // Turn off this rule for context files
  },
  globals: {
    process: "readonly", // Define process as a global variable
  },
};
