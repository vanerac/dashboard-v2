module.exports = {
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "react-app",
    // "next",
  ],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "prettier/prettier": "error",
    "prefer-destructuring": [
      "error",
      {
        array: true,
        object: true,
      },
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^\\$",
        argsIgnorePattern: "^\\$",
      },
    ],

    "no-use-before-define": "off",
  },
};
